import { createFileRoute } from "@tanstack/react-router";
import WebDevelopmentBlogPost from "@/pages/blog/WebDevelopmentBlogPost";

export const Route = createFileRoute("/blog/web-development")({
  head: () => ({
    meta: [
      { title: "Web Development Guide | SamysAI" },
      { name: "description", content: "Building modern, AI-ready websites that convert." },
      { property: "og:title", content: "Web Development Guide | SamysAI" },
      { property: "og:description", content: "Building modern, AI-ready websites that convert." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebDevelopmentBlogPost,
});
