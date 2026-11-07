// Run against a local production build; never submits a consultation.
// node tests/seo-http.mjs http://127.0.0.1:3000
import assert from 'node:assert/strict';
import { get } from 'node:http';
const base = process.argv[2] || 'http://127.0.0.1:3000';
const paths = ['/', '/services', '/services/kitchen-remodeling', '/services/bathroom-remodeling', '/services/landscaping', '/services/interior-exterior-painting', '/service-areas', '/privacy-policy', '/terms-of-use'];
for (const path of paths) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes(`rel="canonical" href="https://formadpb.com${path === "/" ? "" : path}"`), `canonical: ${path}`);
  assert.ok(/<title>[^<]+<\/title>/.test(html), `title: ${path}`);
  assert.ok(/<meta name="description" content="[^"]+"/.test(html), `description: ${path}`);
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
assert.equal((await fetch(base + '/services/not-a-real-service')).status, 404);
console.log('SEO checks passed: all nine pages, canonical tags, titles, descriptions, JSON-LD, permanent www redirects preserving paths/queries, robots/sitemap and unknown-page 404.');
