import Image from "next/image";
import { projects, reviews, type Review } from "./proof";

/**
 * Real project gallery. On a service page it shows only that service's photos; on the homepage
 * it shows the featured photos. Renders nothing when there is nothing to show.
 */
export function ProjectGallerySection({ service, heading }: { service?: string; heading: string }) {
  const items = projects
    .map((project) => ({ project, photos: project.photos.filter((photo) => (service ? photo.service === service : photo.featured)) }))
    .filter((item) => item.photos.length > 0);
  if (!items.length) return null;
  return (
    <section className="proof-section" id="projects-gallery" aria-labelledby="projects-gallery-title">
      <p className="eyebrow">Completed by FORMA</p>
      <h2 id="projects-gallery-title">{heading}</h2>
      {items.map(({ project, photos }) => (
        <article key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.scope}</p>
          <div className="proof-photos">
            {photos.map((photo) => (
              <figure key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" loading="lazy" />
                <figcaption>{photo.caption} · {project.city}, CA</figcaption>
              </figure>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function reviewsFor(service?: string): Review[] {
  return reviews.filter((review) => (service ? review.services?.includes(service) : review.featured));
}

/** Real customer reviews. Renders nothing when there is nothing to show on this page. */
export function ReviewsSection({ service, heading }: { service?: string; heading: string }) {
  const items = reviewsFor(service);
  if (!items.length) return null;
  return (
    <section className="proof-section" id="reviews" aria-labelledby="reviews-title">
      <p className="eyebrow">In our clients&apos; words</p>
      <h2 id="reviews-title">{heading}</h2>
      <div className="proof-grid">
        {items.map((review) => (
          <figure key={review.text}>
            {review.rating && <p aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}</p>}
            <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
            <figcaption><strong>{review.author}</strong> · {review.city}, CA · {review.source}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/**
 * Review schema for the star-rated reviews visible on a page. Testimonials without a real
 * star rating are shown on the page but never marked up as rated reviews.
 */
export function reviewSchema(service?: string) {
  return reviewsFor(service)
    .filter((review) => typeof review.rating === "number")
    .map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      ...(review.date ? { datePublished: review.date } : {}),
      reviewBody: review.text,
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
    }));
}
