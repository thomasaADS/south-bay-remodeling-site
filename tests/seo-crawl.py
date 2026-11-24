"""Read-only HTTP crawl: python tests/seo-crawl.py [base URL]. No forms submitted.

Follows every internal link and fragment found on the sitemap pages and checks that each one
resolves to a 200 page and an existing anchor. Legal pages are noindex and are not in the
sitemap, so they are crawled as extra known pages.
"""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen
import sys
import xml.etree.ElementTree as ET

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3100').rstrip('/')
NOINDEX = ['/privacy-policy', '/terms-of-use']
CITIES = ['san-jose', 'fremont', 'santa-clara', 'palo-alto', 'milpitas', 'sunnyvale', 'saratoga', 'los-gatos']


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids = [], set()
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])


sitemap = ET.fromstring(urlopen(base + '/sitemap.xml', timeout=30).read())
paths = [urlparse(node.text).path or '/' for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(paths) == 23, (len(paths), paths)
assert not any(path in NOINDEX for path in paths), 'noindex pages must not be in the sitemap'
pages = {}
for path in paths + NOINDEX:
    response = urlopen(base + path, timeout=30)
    assert response.status == 200, path
    pages[path] = Page(response.read().decode())
count = 0
inbound = {path: 0 for path in pages}
for path, page in pages.items():
    for href in page.links:
        parsed = urlparse(urljoin(base + path, href))
        if parsed.netloc not in (urlparse(base).netloc, 'formadpb.com'):
            continue
        target = parsed.path or '/'
        assert target in pages, (path, href, 'Broken internal link')
        if parsed.fragment:
            assert parsed.fragment in pages[target].ids, (path, href, 'Missing anchor')
        if target != path:
            inbound[target] += 1
        count += 1
orphans = [path for path, total in inbound.items() if total == 0]
assert not orphans, ('Pages with no inbound internal links', orphans)
assert any('/remodeling-planning-guide' in href for href in pages['/'].links)
assert all(f'/service-areas/{city}' in pages for city in CITIES)
print(f'PASS: {len(paths)} sitemap pages + {len(NOINDEX)} noindex pages; {count} internal links and fragments resolve; no orphan pages.')
