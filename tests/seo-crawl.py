"""Read-only HTTP crawl: python tests/seo-crawl.py [base URL]. No forms submitted."""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen
import sys
import xml.etree.ElementTree as ET

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3100').rstrip('/')

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
assert len(paths) == 10, paths
pages = {}
for path in paths:
    response = urlopen(base + path, timeout=30)
    assert response.status == 200, path
    pages[path] = Page(response.read().decode())
count = 0
for path, page in pages.items():
    for href in page.links:
        parsed = urlparse(urljoin(base + path, href))
        if parsed.netloc not in (urlparse(base).netloc, 'formadpb.com'):
            continue
        target = parsed.path or '/'
        assert target in pages, (path, href, 'Not in sitemap')
        if parsed.fragment:
            assert parsed.fragment in pages[target].ids, (path, href, 'Missing anchor')
        count += 1
assert any('/remodeling-planning-guide' in href for href in pages['/'].links)
assert all(f'{city}' in pages['/service-areas'].ids for city in ['san-jose','fremont','santa-clara','palo-alto','milpitas','sunnyvale','saratoga','los-gatos'])
print(f'PASS: {len(pages)} sitemap pages; {count} internal links and fragments; guide discoverable; all eight city anchors.')
