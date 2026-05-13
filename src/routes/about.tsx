import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../precedent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Precedent AI" },
      { name: "description", content: "Founded by a 25-year Ontario litigator and a former Ontario lawyer turned AI implementation specialist." },
      { property: "og:title", content: "About · Precedent AI" },
      { property: "og:description", content: "Built by people who understand both law and AI implementation." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});
