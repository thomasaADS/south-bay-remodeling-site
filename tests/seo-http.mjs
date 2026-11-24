// Run against a local production build; never submits a consultation.
// npm run build && npx next start -p 3100 &
// node tests/seo-http.mjs http://127.0.0.1:3100
import assert from 'node:assert/strict';
import { get } from 'node:http';

const base = process.argv[2] || 'http://127.0.0.1:3000';
if (!['localhost', '127.0.0.1', '[::1]'].includes(new URL(base).hostname)) throw new Error('Use a local build for host-header tests.');
const origin = 'https://formadpb.com';

const services = ['kitchen-remodeling', 'bathroom-remodeling', 'home-additions', 'landscaping', 'interior-exterior-painting'];
const cities = ['san-jose', 'fremont', 'santa-clara', 'palo-alto', 'milpitas', 'sunnyvale', 'saratoga', 'los-gatos'];
const guides = ['bathroom-remodel-cost-san-jose', 'kitchen-remodel-cost-san-jose', 'home-addition-cost-permits-san-jose', 'adu-rules-san-jose', 'how-long-does-a-remodel-take-bay-area'];
const noindexPaths = ['/privacy-policy', '/terms-of-use'];
const indexable = ['/', '/projects', '/services', ...services.map((slug) => `/services/${slug}`), '/service-areas', ...cities.map((slug) => `/service-areas/${slug}`), '/remodeling-planning-guide', '/guides', ...guides.map((slug) => `/guides/${slug}`)];
const paths = [...indexable, ...noindexPaths];

const decode = (value) => value.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = (html) => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const withHost = (path, host) => new Promise((resolve, reject) => {
  get(base + path, { headers: { host } }, (response) => { response.resume(); resolve(response); }).on('error', reject);
});

// Sitemap: exactly the indexable pages, on the non-www https origin.
const sitemapXml = await (await fetch(base + '/sitemap.xml')).text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual([...sitemapUrls].sort(), indexable.map((path) => origin + path).sort(), 'sitemap lists exactly the indexable pages');
const robotsTxt = await (await fetch(base + '/robots.txt')).text();
assert.match(robotsTxt, /Sitemap: https:\/\/formadpb\.com\/sitemap\.xml/);
assert.ok(!sitemapXml.includes('www.formadpb.com') && !robotsTxt.includes('www.formadpb.com'));

const titles = new Map();
const descriptions = new Map();
const report = [];
for (const path of paths) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const head = html.slice(0, html.indexOf('</head>'));
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const canonical = origin + (path === '/' ? '' : path);

  // Self-referencing canonical on the non-www https URL.
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(canonicals, [canonical], `canonical: ${path}`);
  assert.equal(new URL(html.match(/<meta property="og:url" content="([^"]+)"/)[1]).href, new URL(canonical).href, `OG URL: ${path}`);

  const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
  assert.equal(decode(html.match(/<meta name="twitter:description" content="([^"]+)"/)[1]), description, `Twitter description: ${path}`);
  assert.ok(!titles.has(title), `duplicate title: ${path} and ${titles.get(title)}`);
  assert.ok(!descriptions.has(description), `duplicate description: ${path} and ${descriptions.get(description)}`);
  titles.set(title, path); descriptions.set(description, path);
  report.push({ path, title, description });

  // Indexing directives.
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || '';
  if (noindexPaths.includes(path)) assert.match(robots, /^noindex, follow$/, `noindex,follow: ${path}`);
  else assert.match(robots, /^index, follow/, `indexable: ${path}`);

  // Headings: one H1, and no skipped levels.
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]));
  assert.equal(levels.filter((level) => level === 1).length, 1, `single H1: ${path}`);
  assert.equal(levels[0], 1, `H1 comes first: ${path}`);
  levels.reduce((previous, level) => { assert.ok(level <= previous + 1, `heading jumps h${previous} to h${level}: ${path}`); return level; });

  // Brand name, phone and accessibility basics.
  assert.doesNotMatch(html, /Design Plus Build/i, `brand name: ${path}`);
  assert.doesNotMatch(html, /Blossom Hill/i, `client street address is never published: ${path}`);
  assert.equal((html.match(/class="skip-link"/g) || []).length, 1, `one skip link: ${path}`);
  assert.ok(html.includes('id="main-content"'), `skip link target: ${path}`);
  const contactLinks = [...html.matchAll(/href="(tel|sms):([^"]+)"/g)];
  assert.ok(contactLinks.length, `contact links missing: ${path}`);
  for (const [, channel, number] of contactLinks) assert.equal(number, '+13239755574', `unexpected ${channel} destination: ${path}`);

  // Images: descriptive alt (or explicitly decorative), explicit size, modern format, lazy below the fold.
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(tag, /\salt="/, `img alt: ${path}`);
    assert.match(tag, /\swidth="\d+"/, `img width: ${path} ${tag.slice(0, 120)}`);
    assert.match(tag, /\sheight="\d+"/, `img height: ${path}`);
    assert.doesNotMatch(tag, /\.png|\.jpe?g(?!\w)/, `img not WebP/AVIF source: ${path}`);
    if (!/fetchPriority="high"|fetchpriority="high"/.test(tag) && !/forma-logo/.test(tag)) assert.match(tag, /loading="lazy"/, `lazy image: ${path} ${tag.slice(0, 120)}`);
  }
  if (path === '/' || path.startsWith('/services') || path.startsWith('/service-areas')) {
    assert.match(head, /<link rel="preload" as="image"[^>]*(hero-indoor-outdoor|kitchen-remodel|bathroom-remodel)/, `hero image preload: ${path}`);
  }

  // Structured data.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  assert.ok(head.includes('application/ld+json'), `sitewide JSON-LD in <head>: ${path}`);
  const entities = blocks.flatMap((block) => { assert.equal(block['@context'], 'https://schema.org'); return block['@graph'] || [block]; });
  const ofType = (type) => entities.filter((entity) => entity['@type'] === type);
  const [contractor] = ofType('GeneralContractor');
  assert.equal(ofType('GeneralContractor').length, 1, `one GeneralContractor: ${path}`);
  assert.equal(contractor['@id'], `${origin}/#business`);
  assert.equal(contractor.name, 'FORMA Design + Build');
  assert.equal(contractor.address.streetAddress, '360 S Market St, Unit 1707');
  assert.equal(contractor.address.postalCode, '95113');
  assert.equal(contractor.areaServed.length, 8);
  assert.ok(contractor.geo && contractor.hasCredential && contractor.logo && contractor.image && contractor.telephone && contractor.email);
  assert.equal(ofType('AggregateRating').length + entities.filter((entity) => entity.aggregateRating).length, 0, `no rating without visible reviews: ${path}`);
  assert.equal(ofType('Review').length, 0);
  if (path !== '/') {
    const [crumbs] = ofType('BreadcrumbList');
    if (!noindexPaths.includes(path)) {
      assert.ok(crumbs, `BreadcrumbList: ${path}`);
      assert.equal(crumbs.itemListElement.at(-1).item, canonical, `breadcrumb ends on this page: ${path}`);
      assert.deepEqual(crumbs.itemListElement.map((item) => item.position), crumbs.itemListElement.map((_, index) => index + 1));
    }
  }
  if (!noindexPaths.includes(path)) {
    assert.ok(entities.some((entity) => ['WebPage', 'CollectionPage'].includes(entity['@type']) && new URL(entity.url).href === new URL(canonical).href), `page entity: ${path}`);
  }

  const wordCount = textOf(main).split(' ').length;
  if (path.startsWith('/services/')) {
    const slug = path.split('/').pop();
    assert.ok(title.length <= 60, `title over 60: ${path}`);
    assert.ok(description.length >= 140 && description.length <= 155, `description length ${description.length}: ${path}`);
    assert.match(html, /<h1>[^<]+ in San Jose, CA<\/h1>/, `service H1: ${path}`);
    const [service] = ofType('Service');
    assert.equal(service.provider['@id'], contractor['@id'], `Service provider references the business: ${path}`);
    assert.ok(service.serviceType && service.areaServed.length === 8);
    assert.equal(service.mainEntityOfPage['@id'], `${canonical}#webpage`);
    // FAQPage is built from the FAQs visible on the page, and only those.
    const [faq] = ofType('FAQPage');
    const visibleQuestions = [...main.matchAll(/<summary>(.*?)<b /g)].map((match) => decode(match[1].replace(/<!-- -->/g, '')));
    assert.ok(visibleQuestions.length >= 6 && visibleQuestions.length <= 8, `6-8 FAQs: ${path} (${visibleQuestions.length})`);
    assert.deepEqual(faq.mainEntity.map((item) => item.name), visibleQuestions, `FAQ schema matches visible FAQs: ${path}`);
    for (const item of faq.mainEntity) assert.ok(textOf(main).includes(item.acceptedAnswer.text), `FAQ answer visible: ${path}`);
    assert.ok(wordCount >= 1200, `service page words ${wordCount}: ${path}`);
    // Consultation CTA above the fold and again at the end.
    const ctas = [...main.matchAll(/href="\/#consultation">Book a free consultation</g)].map((match) => match.index);
    assert.ok(ctas.length >= 2 && ctas[0] < main.indexOf('</h1>') + 1500 && ctas.at(-1) > main.length * 0.9, `CTA top and bottom: ${path}`);
    // Internal links: 2-3 related services, service areas, planning guide.
    const related = main.slice(main.indexOf('class="related-services"'));
    const relatedServices = [...related.matchAll(/href="\/services\/([a-z-]+)"/g)].map((match) => match[1]).filter((item) => item !== slug);
    assert.ok(relatedServices.length >= 2 && relatedServices.length <= 3, `related services: ${path}`);
    for (const target of ['/service-areas', '/remodeling-planning-guide']) assert.ok(main.includes(`href="${target}"`), `${target} link: ${path}`);
    assert.match(main, /href="\/guides\/[a-z-]+"/, `guide link: ${path}`);
    for (const id of ['scope', 'process', 'timeline', 'permits', 'cost', 'materials', 'why-forma', 'service-questions']) assert.ok(main.includes(`id="${id}"`), `#${id}: ${path}`);
    // Real projects and testimonials show only where they exist; never an empty section.
    const hasProof = ['kitchen-remodeling', 'bathroom-remodeling'].includes(slug);
    assert.equal(main.includes('id="projects-gallery"'), hasProof, `project gallery: ${path}`);
    assert.equal(main.includes('id="reviews"'), hasProof, `reviews: ${path}`);
  }
  if (/^\/service-areas\/./.test(path)) {
    assert.match(title, /^Home Remodeling Contractor in [A-Za-z ]+, CA \| FORMA$/, `city title: ${path}`);
    assert.ok(wordCount >= 600, `city page words ${wordCount}: ${path}`);
    for (const slug of services) assert.ok(main.includes(`href="/services/${slug}"`), `city links to ${slug}: ${path}`);
  }
  if (path === '/service-areas' || path === '/') {
    for (const slug of cities) assert.ok(html.includes(`href="/service-areas/${slug}"`), `city card link ${slug}: ${path}`);
  }
  if (path === '/service-areas') assert.doesNotMatch(main.slice(main.indexOf('class="area-list"'), main.indexOf('class="area-services"')), /#consultation/, 'city cards link to city pages');
  if (path === '/') {
    assert.ok(main.includes('id="projects-gallery"') && main.includes('id="reviews"'), 'home shows real projects and testimonials');
    assert.ok(main.includes('href="/projects"'), 'home links to the projects page');
    assert.doesNotMatch(html, /Blossom Hill/i, 'client street address is never published');
    assert.equal(title, 'Home Remodeling Contractor in San Jose | FORMA');
    assert.ok(description.length <= 150, `home description ${description.length}`);
    for (const slug of services) assert.ok(main.slice(main.indexOf('id="services"')).includes(`href="/services/${slug}"`), `home services section links ${slug}`);
  }
  if (path === '/' || path === '/projects') {
    // The testimonial video is visible, lazy (no preload) and described in schema.
    assert.match(main, /<video[^>]*preload="none"[^>]*poster="[^"]+\.webp"/, `lazy video with poster: ${path}`);
    const [video] = ofType('VideoObject');
    assert.ok(video && video.contentUrl.endsWith('.mp4') && video.thumbnailUrl && video.uploadDate && video.duration, `VideoObject: ${path}`);
    assert.equal((await fetch(base + new URL(video.contentUrl).pathname, { method: 'HEAD' })).status, 200, 'video file is served');
  }
  if (path === '/projects') assert.ok((main.match(/<blockquote/g) || []).length >= 6, 'projects page shows all testimonials');
  if (path === '/services') for (const slug of services) assert.ok(main.includes(`href="/services/${slug}"`), `/services links ${slug}`);
  if (path === '/remodeling-planning-guide') {
    assert.ok(wordCount >= 1500, `planning guide words ${wordCount}`);
    for (const slug of services) assert.ok(main.includes(`href="/services/${slug}"`), `planning guide links ${slug}`);
  }
  if (/^\/guides\/./.test(path)) {
    assert.equal(ofType('Article').length, 1, `Article: ${path}`);
    assert.match(main, /href="\/services\/[a-z-]+"/, `guide links to a service: ${path}`);
  }
  // Footer on every page links every service and every city.
  const footer = html.slice(html.indexOf('<footer'));
  for (const slug of services) assert.ok(footer.includes(`href="/services/${slug}"`), `footer service ${slug}: ${path}`);
  for (const slug of cities) assert.ok(footer.includes(`href="/service-areas/${slug}"`), `footer city ${slug}: ${path}`);
  // Navigation links the home additions page with a real URL.
  assert.ok(html.slice(0, html.indexOf('<main')).includes('href="/services/home-additions"'), `nav home additions: ${path}`);

  // www -> non-www: one 301 hop straight to the matching https URL, query preserved.
  const redirect = await withHost(path + '?utm_source=seo-check', 'www.formadpb.com');
  assert.equal(redirect.statusCode, 301, `301 from www: ${path}`);
  assert.equal(new URL(redirect.headers.location).href, new URL(`${origin}${path}?utm_source=seo-check`).href, `www target: ${path}`);
}

// Retired service pages 301 to /services in one hop, on either host. They never 404.
for (const host of ['formadpb.com', 'www.formadpb.com']) {
  const response = await withHost('/services/roofing', host);
  assert.equal(response.statusCode, 301, `roofing 301 on ${host}`);
  assert.equal(response.headers.location, `${origin}/services`, `roofing target on ${host}`);
}

// Unknown URLs return a real 404 with the custom page: noindex, no canonical, links to services.
for (const path of ['/services/not-a-real-service', '/service-areas/not-a-city', '/guides/not-a-guide', '/not-a-real-page']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, path);
  const html = await response.text();
  assert.doesNotMatch(html, /rel="canonical"|<meta property="og:url"/, `404 must not inherit page metadata: ${path}`);
  assert.match(html, /<meta name="robots" content="noindex/, `404 noindex: ${path}`);
  // Unknown slugs under a dynamic route stream the 404 UI in the page payload, so match either form.
  for (const slug of services) assert.ok(html.includes(`/services/${slug}`), `404 links ${slug}: ${path}`);
  assert.ok(html.includes('We could not find that page.'), `custom 404 content: ${path}`);
}

if (process.argv.includes('--report')) for (const row of report) console.log(`${row.path}\n  title (${row.title.length}): ${row.title}\n  description (${row.description.length}): ${row.description}`);
console.log(`SEO checks passed: ${paths.length} pages (${indexable.length} indexable, ${noindexPaths.length} noindex), canonicals, sitemap/robots, headings, images, JSON-LD, internal links, 301 www redirects, retired-service redirect and custom 404.`);
