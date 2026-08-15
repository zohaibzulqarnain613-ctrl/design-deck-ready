import { createFileRoute } from "@tanstack/react-router";
import AppDevelopmentBlogPost from "@/pages/blog/AppDevelopmentBlogPost";

export const Route = createFileRoute("/blog/app-development")({
  head: () => ({
    meta: [
      { title: "App Development for Business: A Practical Guide | SamysAI" },
      { name: "description", content: "Learn how businesses can plan, design, build, secure, and scale mobile applications with the right technology, architecture, integrations, and UX." },
      { property: "og:title", content: "App Development for Business: A Practical Guide | SamysAI" },
      { property: "og:description", content: "Learn how businesses can plan, design, build, secure, and scale mobile applications with the right technology, architecture, integrations, and UX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppDevelopmentBlogPost,
});
