import Image from "next/image";
import Link from "next/link";
import { siteUrl } from "./business";
import { projects, reviews, type Project, type ProjectVideo, type Review } from "./proof";

/** Which items a page shows: one service's, the homepage highlights, or everything. */
type Scope = { service?: string; all?: boolean };

function photosFor(project: Project, { service, all }: Scope) {
  if (all) return project.photos;
  return project.photos.filter((photo) => (service ? photo.service === service : photo.featured));
}

function reviewsFor({ service, all }: Scope): Review[] {
  if (all) return reviews;
  return reviews.filter((review) => (service ? review.services?.includes(service) : review.featured));
}

/**
 * Client video testimonial. The file is not requested until the visitor presses play
 * (preload="none"), so it does not slow the page down. Captions are part of the video.
 */
export function TestimonialVideo({ video }: { video: ProjectVideo }) {
  return (
    <figure className="proof-video">
      <video controls playsInline preload="none" poster={video.poster} width={video.width} height={video.height} aria-label={video.title}>
        <source src={video.src} type="video/mp4" />
        <a href={video.src}>Watch the video: {video.title}</a>
      </video>
      <figcaption>{video.title} · 2 min</figcaption>
    </figure>
  );
}

/**
 * Real project gallery. A service page shows that service's photos, the homepage shows the
 * featured photos, and the projects page shows everything. Renders nothing when empty.
 */
export function ProjectGallerySection({ service, all, heading, moreLink = false }: Scope & { heading: string; moreLink?: boolean }) {
  const items = projects
    .map((project) => ({ project, photos: photosFor(project, { service, all }) }))
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
      {moreLink && <p className="proof-more"><Link href="/projects">See the full project and client video</Link></p>}
    </section>
  );
}

/** Real client testimonials, with the video where one exists. Renders nothing when empty. */
export function ReviewsSection({ service, all, heading, withVideo = false, moreLink = false }: Scope & { heading: string; withVideo?: boolean; moreLink?: boolean }) {
  const items = reviewsFor({ service, all });
  if (!items.length) return null;
  const video = withVideo ? projects.find((project) => project.video)?.video : undefined;
  return (
    <section className="proof-section" id="reviews" aria-labelledby="reviews-title">
      <p className="eyebrow">In our clients&apos; words</p>
      <h2 id="reviews-title">{heading}</h2>
      {video && <TestimonialVideo video={video} />}
      <div className="proof-grid">
        {items.map((review) => (
          <figure key={review.text}>
            {review.rating && <p aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}</p>}
            <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
            <figcaption><strong>{review.author}</strong> · {review.city}, CA · {review.source}</figcaption>
          </figure>
        ))}
      </div>
      {moreLink && <p className="proof-more"><Link href="/projects">See our work and client reviews</Link></p>}
    </section>
  );
}

/** VideoObject schema for pages where the testimonial video is visible. */
export function videoSchema(pageUrl: string) {
  return projects
    .filter((project) => project.video)
    .map((project) => ({
      "@type": "VideoObject",
      "@id": `${pageUrl}#testimonial-video`,
      name: project.video!.title,
      description: project.video!.description,
      thumbnailUrl: `${siteUrl}${project.video!.poster}`,
      contentUrl: `${siteUrl}${project.video!.src}`,
      uploadDate: project.video!.uploadDate,
      duration: project.video!.duration,
    }));
}

/**
 * Review schema for the star-rated reviews visible on a page. Testimonials without a real
 * star rating are shown on the page but never marked up as rated reviews.
 */
export function reviewSchema(service?: string) {
  return reviewsFor({ service })
    .filter((review) => typeof review.rating === "number")
    .map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      ...(review.date ? { datePublished: review.date } : {}),
      reviewBody: review.text,
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
    }));
}
