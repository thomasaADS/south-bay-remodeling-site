"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function track(event: string, details: Record<string, string> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}

export function MarketingEvents() {
  useEffect(() => {
    let formStarted = false;

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        track("phone_click", { contact_method: "phone" });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { contact_method: "email" });
      } else if (href.includes("instagram.com/formadpb")) {
        track("instagram_click", { social_network: "instagram" });
      } else if (href === "#consultation") {
        track("cta_click", { cta_name: "start_a_project" });
      }
    }

    function handleFormStart(event: FocusEvent) {
      if (formStarted || !(event.target instanceof Element)) return;
      if (!event.target.closest("#consultation form")) return;

      formStarted = true;
      track("form_start", { form_name: "project_consultation" });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("focusin", handleFormStart);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("focusin", handleFormStart);
    };
  }, []);

  return null;
}
