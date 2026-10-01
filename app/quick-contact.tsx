export function QuickContact() {
  return (
    <div className="contact-dock" role="group" aria-label="Quick contact options">
      <a
        className="contact-dock-call"
        href="tel:+14082347914"
        aria-label="Call FORMA Design + Build at (408) 234-7914"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.2 3.5 9.6 8l-2 1.8a15.2 15.2 0 0 0 6.6 6.6l1.8-2 4.5 2.4v2.7c0 .8-.7 1.5-1.5 1.5C10.2 21 3 13.8 3 5c0-.8.7-1.5 1.5-1.5h2.7Z" />
        </svg>
        <span>Call now</span>
      </a>
      <a
        className="contact-dock-text"
        href="sms:+14082347914"
        aria-label="Text FORMA Design + Build at (408) 234-7914"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4.5A2 2 0 0 1 3 15V6a2 2 0 0 1 2-2Z" />
        </svg>
        <span>Text us</span>
      </a>
    </div>
  );
}
