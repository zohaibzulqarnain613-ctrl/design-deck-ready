import { createFileRoute } from "@tanstack/react-router";
import ContentCreationBlogPost from "@/pages/blog/ContentCreationBlogPost";

export const Route = createFileRoute("/blog/content-creation")({
  head: () => ({
    meta: [
      { title: "AI Content Creation for Business: A Practical Guide | SamysAI" },
      { name: "description", content: "Learn how businesses can use AI content creation to plan, produce, optimize, and repurpose content while maintaining brand voice and human oversight." },
      { property: "og:title", content: "AI Content Creation for Business: A Practical Guide | SamysAI" },
      { property: "og:description", content: "Learn how businesses can use AI content creation to plan, produce, optimize, and repurpose content while maintaining brand voice and human oversight." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentCreationBlogPost,
});
