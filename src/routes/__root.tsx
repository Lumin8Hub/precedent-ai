import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header, Footer, palette } from "../precedent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold" style={{ color: palette.navy, fontFamily: "'Cormorant Garamond', serif" }}>404</h1>
        <h2 className="mt-4 text-xl font-semibold" style={{ color: palette.navy }}>Page not found</h2>
        <p className="mt-2 text-sm" style={{ color: palette.muted }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium" style={{ backgroundColor: palette.navy, color: palette.parchment }}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold" style={{ color: palette.navy }}>This page didn't load</h1>
        <p className="mt-2 text-sm" style={{ color: palette.muted }}>Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-4 py-2 text-sm font-medium" style={{ backgroundColor: palette.navy, color: palette.parchment }}>Try again</button>
          <a href="/" className="px-4 py-2 text-sm font-medium border" style={{ borderColor: palette.navy, color: palette.navy }}>Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Precedent AI · Legal AI Implementation for Ontario Law Firms" },
      { name: "description", content: "Precedent AI helps Ontario law firms identify the right AI use cases, select the right tools, build governance, train teams, and launch measurable AI workflows — without compromising confidentiality, privilege, or professional responsibility." },
      { property: "og:title", content: "Precedent AI · Legal AI Implementation for Ontario Law Firms" },
      { property: "og:description", content: "Vendor-neutral, Ontario-focused legal AI implementation and governance." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Precedent AI" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ backgroundColor: palette.parchment, color: palette.charcoal, fontFamily: "'DM Sans', sans-serif" }}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
