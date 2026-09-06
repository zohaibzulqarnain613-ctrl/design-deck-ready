import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode, Suspense, lazy, useState } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import Navbar from "@/components/Navbar";

const ChatBot = lazy(() => import("@/components/ChatBot"));

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
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
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
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
      { title: "SamysAI | AI Automation Agency" },
      {
        name: "description",
        content:
          "SamysAI builds AI phone callers, chatbots, outreach systems and custom software that automate business growth.",
      },
      { name: "author", content: "SamysAI" },
      { property: "og:title", content: "SamysAI | AI Automation Agency" },
      {
        property: "og:description",
        content: "AI automation that scales your business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://images.unsplash.com",
      },
      {
        rel: "dns-prefetch",
        href: "https://images.unsplash.com",
      },
      {
        rel: "preconnect",
        href: "https://images.pexels.com",
      },
      {
        rel: "dns-prefetch",
        href: "https://images.pexels.com",
      },
      {
        rel: "preload",
        href: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&format=webp",
        as: "image",
        fetchpriority: "high" as any,
      },

      {
        rel: "preload",
        href: appCss,
        as: "style",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
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

// ScrollToTop removed to allow TanStack Router's native scrollRestoration: true to manage position memory correctly.

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>

      <div className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-x-hidden">
        <Navbar />
        <main className="w-full">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Suspense fallback={<div className="min-h-screen w-full bg-gray-950" />}>
            <Outlet />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <DeferredChatBot />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

function DeferredChatBot() {
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShouldRender(true));
      } else {
        setShouldRender(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;
  return <ChatBot />;
}

