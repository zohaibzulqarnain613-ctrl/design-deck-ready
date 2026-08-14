import { createFileRoute } from "@tanstack/react-router";
import AIChatbotsBlogPost from "@/pages/blog/AIChatbotsBlogPost";

export const Route = createFileRoute("/blog/ai-chatbots")({
  head: () => ({
    meta: [
      { title: "AI Chatbots Guide | SamysAI" },
      { name: "description", content: "Why AI chatbots convert more visitors and how to deploy one." },
      { property: "og:title", content: "AI Chatbots Guide | SamysAI" },
      { property: "og:description", content: "Why AI chatbots convert more visitors and how to deploy one." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIChatbotsBlogPost,
});
