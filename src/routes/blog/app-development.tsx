import { createFileRoute } from "@tanstack/react-router";
import AppDevelopmentBlogPost from "@/pages/blog/AppDevelopmentBlogPost";

export const Route = createFileRoute("/blog/app-development")({
  head: () => ({
    meta: [
      { title: "App Development for Business: Building Scalable Mobile Solutions" },
      { name: "description", content: "A practical guide to business app development, covering native vs cross-platform, development workflows, and system integrations." },
      { property: "og:title", content: "App Development for Business: Building Scalable Mobile Solutions" },
      { property: "og:description", content: "A practical guide to business app development, covering native vs cross-platform, development workflows, and system integrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppDevelopmentBlogPost,
});
