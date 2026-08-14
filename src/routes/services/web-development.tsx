import { createFileRoute } from "@tanstack/react-router";
import WebDevelopmentPage from "@/pages/WebDevelopmentPage";

export const Route = createFileRoute("/services/web-development")({
  head: () => ({
    meta: [
      { title: "Web Development | SamysAI" },
      { name: "description", content: "High-converting, fast websites built and automated by SamysAI." },
      { property: "og:title", content: "Web Development | SamysAI" },
      { property: "og:description", content: "High-converting, fast websites built and automated by SamysAI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebDevelopmentPage,
});
