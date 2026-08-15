import { createFileRoute } from "@tanstack/react-router";
import AIChatbotsBlogPost from "@/pages/blog/AIChatbotsBlogPost";

export const Route = createFileRoute("/blog/ai-chatbots")({
  head: () => ({
    meta: [
      { title: "AI Chatbots for Business: A Practical Guide" },
      { name: "description", content: "Explain clearly what AI chatbots are, how businesses use them, and what to consider before implementing one." },
      { property: "og:title", content: "AI Chatbots for Business: A Practical Guide" },
      { property: "og:description", content: "Explain clearly what AI chatbots are, how businesses use them, and what to consider before implementing one." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIChatbotsBlogPost,
});
