import Image from "next/image";

// Intrinsic pixel sizes of the files in /public/images. Explicit width and height let the
// browser reserve space before the image loads (no layout shift).
const dimensions: Record<string, { width: number; height: number }> = {
  "/images/hero-indoor-outdoor.webp": { width: 1536, height: 1024 },
  "/images/kitchen-remodel.webp": { width: 1122, height: 1402 },
  "/images/bathroom-remodel.webp": { width: 1122, height: 1402 },
  "/images/projects/san-jose-kitchen-remodel-island.webp": { width: 1600, height: 1067 },
};

type Props = { src: string; alt: string; sizes: string; priority?: boolean; decorative?: boolean };

/**
 * An image that covers its positioned parent, like next/image `fill`, but with explicit
 * width and height attributes. Images are lazy-loaded unless `priority` is set, in which case
 * Next.js preloads them (used for the above-the-fold hero only).
 */
export function CoverImage({ src, alt, sizes, priority = false, decorative = false }: Props) {
  const size = dimensions[src];
  if (!size) throw new Error(`Add the pixel dimensions of ${src} to app/cover-image.tsx`);
  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      width={size.width}
      height={size.height}
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? undefined : "lazy"}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
