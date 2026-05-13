import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../precedent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Precedent AI · Legal AI Implementation for Ontario Law Firms" },
      { name: "description", content: "Ontario's dedicated legal AI implementation partner. Vendor-neutral. Workflow-specific. Built around privilege, supervision, and proof." },
      { property: "og:title", content: "Precedent AI · Legal AI Implementation for Ontario Law Firms" },
      { property: "og:description", content: "Ontario's dedicated legal AI implementation partner. Vendor-neutral. Workflow-specific." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});
