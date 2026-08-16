import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "@tanstack/react-router";
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | SamysAI" },
      { name: "description", content: "The terms that govern your use of SamysAI services." },
      { property: "og:title", content: "Terms of Service | SamysAI" },
      { property: "og:description", content: "The terms that govern your use of SamysAI services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsOfServicePage,
});
