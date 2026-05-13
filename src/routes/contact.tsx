import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../precedent";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Precedent AI" },
      { name: "description", content: "Book an AI Readiness Call or send us a message." },
      { property: "og:title", content: "Contact · Precedent AI" },
      { property: "og:description", content: "Book a 30-minute consultation with Precedent AI." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});
