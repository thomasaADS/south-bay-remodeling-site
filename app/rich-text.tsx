import Link from "next/link";
import type { ReactNode } from "react";

/** Renders copy that uses [label](/path) or [label](https://...) for inline links. */
export function RichText({ text }: { text: string }): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const [whole, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link href={href} key={match.index}>{label}</Link>
      ) : (
        <a href={href} key={match.index} target="_blank" rel="noopener noreferrer">{label}</a>
      ),
    );
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Plain-text version for structured data and word counts. */
export function stripLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
