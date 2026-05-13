import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage } from "../precedent";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources · Precedent AI" },
      { name: "description", content: "Practical guides, frameworks, and articles for Ontario law firms adopting AI." },
      { property: "og:title", content: "Resources · Precedent AI" },
      { property: "og:description", content: "Free guides and field notes from legal AI implementation." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});
