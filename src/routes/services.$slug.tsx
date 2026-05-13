import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage, services } from "../precedent";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    const title = service ? `${service.name} · Precedent AI` : "Service · Precedent AI";
    const desc = service?.oneLiner ?? "Legal AI implementation services for Ontario law firms.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/services/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return <ServiceDetailPage slug={slug} />;
}
