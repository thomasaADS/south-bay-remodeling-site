// Content rules for the SEO pages: lengths, word counts, uniqueness and internal links.
// Run: node --test tests/seo-content.test.ts
import assert from "node:assert/strict";
import test from "node:test";
import { business, businessGraph, businessRatingNode, serviceAreaNames } from "../app/business";
import { cityContent } from "../app/city-content";
import { guides } from "../app/guide-content";
import { projects, reviews } from "../app/proof";
import { serviceContent } from "../app/service-content";
import { cities, faqs, services } from "../app/site-data";

const words = (value: unknown): number => {
  const text = JSON.stringify(value).replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").replace(/[{}\[\]":,]/g, " ");
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
};
const collectStrings = (value: unknown, out: string[] = []): string[] => {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectStrings(item, out));
  return out;
};

test("business name is always FORMA Design + Build", () => {
  const everything = JSON.stringify({ services, serviceContent, cityContent, guides, faqs, business });
  assert.equal(/Design Plus Build/i.test(everything), false);
  assert.equal(business.name, "FORMA Design + Build");
});

test("sitewide business schema carries the full NAP, geo, license and eight cities", () => {
  const node = businessGraph()["@graph"][0] as Record<string, any>;
  assert.equal(node["@type"], "GeneralContractor");
  assert.equal(node.name, "FORMA Design + Build");
  assert.equal(node.email, "Office@formadpb.com");
  assert.deepEqual(node.address, { "@type": "PostalAddress", streetAddress: "360 S Market St, Unit 1707", addressLocality: "San Jose", addressRegion: "CA", postalCode: "95113", addressCountry: "US" });
  assert.equal(node.geo["@type"], "GeoCoordinates");
  assert.equal(node.hasCredential.identifier, "1162108");
  assert.deepEqual(node.areaServed.map((area: { name: string }) => area.name), [...serviceAreaNames]);
  assert.ok(node.sameAs.includes("https://www.instagram.com/formadpb/"));
  assert.ok(node.logo && node.image && node.telephone && node.url);
  // Never published sitewide; only alongside visible reviews.
  assert.equal("aggregateRating" in node, false);
});

test("no rating or review markup is published without real reviews", () => {
  if (reviews.length === 0) assert.equal(businessRatingNode([]), null);
  if (!business.aggregateRating) assert.equal(businessRatingNode([{ "@type": "Review" }]), null);
  for (const project of projects) assert.ok(project.photos.length > 0 && project.city && project.scope);
});

test("service pages: title, description, H1, FAQs and 1,200+ words of unique copy", () => {
  const seen = new Set<string>();
  for (const service of services) {
    const content = serviceContent[service.slug];
    assert.ok(content, `missing long-form content: ${service.slug}`);
    assert.ok(service.seoTitle.length <= 60, `title over 60: ${service.slug} (${service.seoTitle.length})`);
    assert.match(service.seoTitle, /San Jose \| Licensed Design-Build \| FORMA$/);
    const length = service.metaDescription.length;
    assert.ok(length >= 140 && length <= 155, `description length ${length}: ${service.slug}`);
    assert.match(service.metaDescription, /San Jose/);
    assert.match(service.metaDescription, /licensed/i);
    assert.match(service.metaDescription, /1162108/);
    assert.match(service.metaDescription, /free consultation/i);
    assert.match(service.h1, / in San Jose, CA$/);
    assert.ok(service.questions.length >= 6 && service.questions.length <= 8, `FAQ count ${service.questions.length}: ${service.slug}`);
    const count = words([service.intro, service.includes, service.planning, service.planningNote, service.questions, content]);
    assert.ok(count >= 1200, `only ${count} words: ${service.slug}`);
    assert.ok(content.related.length >= 2 && content.related.length <= 3);
    for (const slug of content.related) assert.ok(services.some((item) => item.slug === slug && slug !== service.slug));
    assert.ok(guides.some((guide) => guide.slug === content.guide), `unknown guide: ${content.guide}`);
    assert.ok(content.process.length >= 5 && content.timeline.phases.length >= 3 && content.permits.length >= 2);
    assert.ok(content.costFactors.length >= 5 && content.materials.length >= 4 && content.included.length >= 5);
    // No price is published unless the owner supplied one.
    assert.equal(content.priceRange, null);
    for (const text of collectStrings(content)) {
      if (text.length < 80) continue;
      assert.ok(!seen.has(text), `duplicated paragraph across services: ${text.slice(0, 60)}`);
      seen.add(text);
    }
  }
});

test("home additions targets room additions, second stories, ADUs and home expansion", () => {
  const service = services.find((item) => item.slug === "home-additions")!;
  const text = JSON.stringify([service, serviceContent["home-additions"]]).toLowerCase();
  for (const phrase of ["room addition", "second-story addition", "adu", "home expansion"]) assert.ok(text.includes(phrase), phrase);
});

test("city pages: eight cities, 600+ unique words each, every service linked", () => {
  assert.deepEqual(cities.map((city) => city.name), [...serviceAreaNames]);
  const seen = new Map<string, string>();
  for (const city of cities) {
    const content = cityContent[city.slug];
    assert.ok(content, `missing city content: ${city.slug}`);
    const count = words(content) - words(content.metaDescription);
    assert.ok(count >= 600, `only ${count} words: ${city.slug}`);
    const title = `Home Remodeling Contractor in ${city.name}, CA | FORMA`;
    assert.ok(title.length <= 60, title);
    assert.ok(content.metaDescription.length <= 155 && content.metaDescription.length >= 120, `${city.slug} description ${content.metaDescription.length}`);
    assert.ok(content.metaDescription.includes(city.name));
    assert.deepEqual(Object.keys(content.projects.items).sort(), services.map((service) => service.slug).sort());
    assert.match(content.permits.url, /^https:\/\//);
    assert.ok(content.neighborhoods.names.length >= 5);
    // No sentence may be reused on another city page, with or without the city name swapped.
    for (const text of collectStrings(content)) {
      for (const sentence of text.split(/(?<=[.?!])\s+/)) {
        if (sentence.length < 60) continue;
        const key = cities.reduce((value, item) => value.replaceAll(item.name, "CITY"), sentence);
        assert.ok(!seen.has(key) || seen.get(key) === city.slug, `sentence reused in ${city.slug} and ${seen.get(key)}: ${sentence.slice(0, 70)}`);
        seen.set(key, city.slug);
      }
    }
  }
});

test("guides: five articles, each linking to its service page", () => {
  assert.deepEqual(guides.map((guide) => guide.title), [
    "Bathroom Remodel Cost in San Jose (2026)",
    "Kitchen Remodel Cost in San Jose (2026)",
    "Home Addition Cost and Permits in San Jose",
    "ADU Rules in San Jose: What Homeowners Need to Know",
    "How Long Does a Remodel Take in the Bay Area",
  ]);
  const slugs = new Set<string>();
  for (const guide of guides) {
    assert.ok(!slugs.has(guide.slug));
    slugs.add(guide.slug);
    assert.ok(services.some((service) => service.slug === guide.service));
    assert.ok(JSON.stringify(guide.sections).includes(`(/services/${guide.service})`), `no in-body link to service: ${guide.slug}`);
    assert.ok(guide.seoTitle.length <= 60, `${guide.slug} title ${guide.seoTitle.length}`);
    assert.ok(guide.metaDescription.length >= 120 && guide.metaDescription.length <= 160, `${guide.slug} description ${guide.metaDescription.length}`);
    assert.ok(words([guide.intro, guide.sections]) >= 500, `${guide.slug}: ${words([guide.intro, guide.sections])} words`);
    assert.equal(guide.priceRange, null);
    const ids = guide.sections.map((section) => section.id);
    assert.equal(new Set(ids).size, ids.length);
  }
});

test("internal links in copy point at pages that exist", () => {
  const valid = new Set<string>(["/", "/services", "/service-areas", "/remodeling-planning-guide", "/guides",
    ...services.map((service) => `/services/${service.slug}`),
    ...cities.map((city) => `/service-areas/${city.slug}`),
    ...guides.map((guide) => `/guides/${guide.slug}`)]);
  for (const text of collectStrings([serviceContent, guides, cityContent])) {
    for (const match of text.matchAll(/\]\((\/[^)#]*)(#[^)]*)?\)/g)) assert.ok(valid.has(match[1]), `broken internal link: ${match[1]}`);
  }
});
