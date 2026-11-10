import assert from "node:assert/strict";
import test from "node:test";
import { serializeJsonLd, breadcrumbSchema, webPageSchema, pageMetadata } from "../app/seo";
import { services } from "../app/site-data";
import { servicePlanning } from "../app/service-planning";

test("JSON-LD escapes closing script tags while preserving content", () => {
  const original = { text: '</script><img src=x onerror="alert(1)"> & helpful text' };
  const serialized = serializeJsonLd(original);
  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), original);
});
test("breadcrumbs use contiguous positions and canonical absolute URLs", () => {
  const schema = breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]);
  assert.deepEqual(schema.itemListElement.map((item) => item.position), [1, 2]);
  assert.equal(schema.itemListElement[1].item, "https://formadpb.com/services");
});
test("service metadata, content and entity URLs stay aligned", () => {
  for (const service of services) {
    const path = `/services/${service.slug}`;
    const page = webPageSchema(service.seoTitle, service.metaDescription, path);
    assert.equal(page["@id"], `https://formadpb.com${path}#webpage`);
    assert.equal(page.publisher["@id"], "https://formadpb.com/#business");
    const meta = pageMetadata(service.seoTitle, service.metaDescription, path, service.image);
    assert.equal(meta.alternates?.canonical, path);
  }
  for (const slug of Object.keys(servicePlanning)) assert.ok(services.some((service) => service.slug === slug));
});
