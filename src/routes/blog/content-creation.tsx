import { createFileRoute } from "@tanstack/react-router";
import ContentCreationBlogPost from "@/pages/blog/ContentCreationBlogPost";

export const Route = createFileRoute("/blog/content-creation")({
  head: () => ({
    meta: [
      { title: "Content Creation Guide | SamysAI" },
      { name: "description", content: "Scaling content production with AI workflows." },
      { property: "og:title", content: "Content Creation Guide | SamysAI" },
      { property: "og:description", content: "Scaling content production with AI workflows." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentCreationBlogPost,
});
