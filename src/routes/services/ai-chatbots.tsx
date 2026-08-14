import { createFileRoute } from "@tanstack/react-router";
import AIChatbotsPage from "@/pages/AIChatbotsPage";

export const Route = createFileRoute("/services/ai-chatbots")({
  head: () => ({
    meta: [
      { title: "AI Chatbots | SamysAI" },
      { name: "description", content: "Custom AI chatbots that answer, qualify and convert visitors 24/7." },
      { property: "og:title", content: "AI Chatbots | SamysAI" },
      { property: "og:description", content: "Custom AI chatbots that answer, qualify and convert visitors 24/7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIChatbotsPage,
});
