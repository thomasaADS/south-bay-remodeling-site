// Run against a local production build; never submits a consultation.
// node tests/seo-http.mjs http://127.0.0.1:3000
import assert from 'node:assert/strict';
import { get } from 'node:http';
const base = process.argv[2] || 'http://127.0.0.1:3000';
if (!['localhost', '127.0.0.1', '[::1]'].includes(new URL(base).hostname)) throw new Error('Use a local build for host-header tests.');
const paths = ['/', '/services', '/services/kitchen-remodeling', '/services/bathroom-remodeling', '/services/landscaping', '/services/interior-exterior-painting', '/service-areas', '/remodeling-planning-guide', '/privacy-policy', '/terms-of-use'];
const titles = new Set();
const descriptions = new Set();
for (const path of paths) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes(`rel="canonical" href="https://formadpb.com${path === "/" ? "" : path}"`), `canonical: ${path}`);
  assert.ok(/<title>[^<]+<\/title>/.test(html), `title: ${path}`);
  assert.ok(/<meta name="description" content="[^"]+"/.test(html), `description: ${path}`);
  const canonical = new URL(`https://formadpb.com${path}`).href;
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)[1];
  assert.equal(new URL(ogUrl).href, canonical, `OG URL: ${path}`);
  const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
  const twitterDescription = html.match(/<meta name="twitter:description" content="([^"]+)"/)[1];
  assert.equal(twitterDescription, description, `Twitter description: ${path}`);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, `single H1: ${path}`);
  const title = html.match(/<title>([^<]+)<\/title>/)[1];
  assert.ok(!titles.has(title), `unique title: ${path}`);
  assert.ok(!descriptions.has(description), `unique description: ${path}`);
  titles.add(title); descriptions.add(description);
  assert.ok(!/<meta name="robots"[^>]*noindex/.test(html), `indexable: ${path}`);
  assert.equal((html.match(/class="skip-link"/g) || []).length, 1, `one skip link: ${path}`);
  assert.ok(html.includes('id="main-content"'), `skip link target: ${path}`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  const entities = graphs.flatMap((graph) => graph["@graph"] || [graph]);
  if (!['/privacy-policy', '/terms-of-use'].includes(path)) {
    assert.ok(entities.some((entity) => ['WebPage', 'CollectionPage'].includes(entity['@type']) && new URL(entity.url).href === canonical), `canonical page entity: ${path}`);
  }
  if (path.startsWith('/services/')) {
    const service = entities.find((entity) => entity['@type'] === 'Service');
    assert.equal(service.mainEntityOfPage['@id'], `${canonical}#webpage`);
    const faq = entities.find((entity) => entity['@type'] === 'FAQPage');
    assert.ok(faq.mainEntity.length >= 4, `service FAQ: ${path}`);
  }
  if (['/services/kitchen-remodeling', '/services/bathroom-remodeling'].includes(path)) {
    assert.ok(html.includes('id="planning-options"'), `detailed planning content: ${path}`);
    assert.ok(html.includes('City of San Jose Building Division'), `official permit reference: ${path}`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(match[1]);
  const redirect = await new Promise((resolve, reject) => {
    get(base + path + '?utm_source=seo-check', { headers: { host: 'www.formadpb.com' } }, (response) => { response.resume(); resolve(response); }).on('error', reject);
  });
  assert.equal(redirect.statusCode, 308, `permanent redirect: ${path}`);
  assert.equal(new URL(redirect.headers.location).href, `https://formadpb.com${path}?utm_source=seo-check`, `preserved path/query: ${path}`);
}
for (const path of ['/sitemap.xml', '/robots.txt']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  assert.ok(!(await response.text()).includes('www.formadpb.com'));
}
for (const path of ['/services/not-a-real-service', '/not-a-real-page']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, path);
  assert.match(await response.text(), /<meta name="robots" content="noindex"/, `404 noindex: ${path}`);
}
console.log('SEO checks passed: all ten pages, canonical tags, titles, descriptions, JSON-LD, permanent www redirects preserving paths/queries, robots/sitemap and unknown-page 404.');
