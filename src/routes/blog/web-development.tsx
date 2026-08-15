import { createFileRoute } from "@tanstack/react-router";
import WebDevelopmentBlogPost from "@/pages/blog/WebDevelopmentBlogPost";

export const Route = createFileRoute("/blog/web-development")({
  head: () => ({
    meta: [
      { title: "Modern Web Development: Building Scalable Digital Experiences" },
      { name: "description", content: "Learn what modern web development involves, from performance and security to business system integrations and scalable architecture." },
      { property: "og:title", content: "Modern Web Development: Building Scalable Digital Experiences" },
      { property: "og:description", content: "Learn what modern web development involves, from performance and security to business system integrations and scalable architecture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebDevelopmentBlogPost,
});
