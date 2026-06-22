import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BookingProvider } from "@/components/site/BookingProvider";
import { useLenis } from "@/hooks/use-lenis";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
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
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">Try again</button>
          <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface">Go home</Link>
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
      { title: "CollabConnect AB — Operations & Cross-Functional Delivery" },
      { name: "description", content: "Operations leadership and cross-functional delivery for growing businesses. Based in Malmö, Sweden." },
      { name: "author", content: "CollabConnect AB" },
      { name: "robots", content: "index, follow" },
      { name: "keywords", content: "operations, cross-functional delivery, operational scaling, project execution, Malmö, Scandinavia, Bianca Anghelescu" },
      { property: "og:title", content: "CollabConnect AB — Scaling Operations. Strengthening Teams. Driving Execution." },
      { property: "og:description", content: "Operations leadership and cross-functional delivery for growing businesses." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://collabconnect.se" },
      { property: "og:image", content: "https://collabconnect.se/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CollabConnect AB — Operations & Cross-Functional Delivery" },
      { name: "twitter:description", content: "Operations leadership and cross-functional delivery for growing businesses." },
      { name: "twitter:image", content: "https://collabconnect.se/og-image.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useLenis();
  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <Header />
        <main className="pt-16 md:pt-18">
          <Outlet />
        </main>
        <Footer />
      </BookingProvider>
    </QueryClientProvider>
  );
}
