"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

const instagram = "https://www.instagram.com/formadpb/";
const menu = [
  ["The vision", "#projects"],
  ["Our expertise", "#services"],
  ["Our approach", "#approach"],
];

export function Navigation() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#top"
        aria-label="FORMA Design + Build home"
        onClick={closeMenu}
      >
        <Image
          src="/images/forma-logo-transparent.png"
          alt="FORMA Design + Build"
          width={200}
          height={50}
          priority
        />
      </a>
      <nav className="desktop-nav" aria-label="Main menu">
        {menu.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#consultation" onClick={closeMenu}>
        Let’s talk
      </a>
      <details
        className="mobile-menu"
        ref={menuRef}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeMenu();
            summaryRef.current?.focus();
          }
        }}
      >
        <summary ref={summaryRef}>
          Menu <span className="menu-symbol" aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile menu">
          {menu.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a href="#about" onClick={closeMenu}>
            About FORMA
          </a>
          <a href="#areas" onClick={closeMenu}>
            Service areas
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FORMA on Instagram (opens in a new tab)"
            onClick={closeMenu}
          >
            Instagram
          </a>
          <a href="#consultation" onClick={closeMenu}>
            Start a project
          </a>
        </nav>
      </details>
    </header>
  );
}

const stages = [
  {
    name: "Plan",
    number: "01",
    label: "Discover · Design · Prepare",
    title: "A clear idea. A considered plan.",
    text: "We begin with the way you live, your priorities and the potential of your property. Layouts, material choices and budget direction take shape together before the build.",
    points: [
      "Understand your goals and property",
      "Connect scope, design and budget direction",
      "Review engineering and permit needs",
    ],
  },
  {
    name: "Build",
    number: "02",
    label: "Coordinate · Construct · Refine",
    title: "The details become the space.",
    text: "The plan moves into construction with coordinated trades, attentive oversight and communication along the way. Design intent stays part of the conversation as the home takes shape.",
    points: [
      "Coordinate trades and project milestones",
      "Keep design decisions connected to the build",
      "Review progress and finish details",
    ],
  },
  {
    name: "Live",
    number: "03",
    label: "Review · Complete · Settle in",
    title: "A place that feels like you.",
    text: "The final details bring the whole idea together. We review the finish work and walk through the space, with attention to how each part will feel in everyday use.",
    points: [
      "Walk through the finished space together",
      "Review the final details",
      "Make room for your next chapter",
    ],
  },
];

export function ProjectJourney() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft")
      next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="journey-interactive">
      <div className="journey-tabs" role="tablist" aria-label="Project journey">
        {stages.map((stage, index) => (
          <button
            key={stage.name}
            type="button"
            role="tab"
            id={`journey-tab-${index}`}
            aria-controls={`journey-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeys(event, index)}
          >
            <span>{stage.number}</span>
            {stage.name}
          </button>
        ))}
      </div>
      {stages.map((stage, index) => (
        <div
          className="journey-panel"
          role="tabpanel"
          id={`journey-panel-${index}`}
          aria-labelledby={`journey-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
          key={stage.name}
        >
          <div className="journey-number" aria-hidden="true">
            {stage.number}
            <span>{stage.name}.</span>
          </div>
          <div className="journey-copy">
            <p className="eyebrow">{stage.label}</p>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
            <ul>
              {stage.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
