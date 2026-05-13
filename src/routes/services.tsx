import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "../precedent";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · Precedent AI" },
      { name: "description", content: "From AI readiness to governed adoption — five productized engagements for Ontario law firms." },
      { property: "og:title", content: "Services · Precedent AI" },
      { property: "og:description", content: "Five productized legal AI engagements." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});
