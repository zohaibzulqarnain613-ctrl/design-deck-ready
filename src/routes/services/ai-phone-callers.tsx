import { createFileRoute } from "@tanstack/react-router";
import AIPhoneCallersPage from "@/pages/AIPhoneCallersPage";

export const Route = createFileRoute("/services/ai-phone-callers")({
  head: () => ({
    meta: [
      { title: "AI Phone Callers | SamysAI" },
      { name: "description", content: "AI voice agents that call, qualify and book leads around the clock." },
      { property: "og:title", content: "AI Phone Callers | SamysAI" },
      { property: "og:description", content: "AI voice agents that call, qualify and book leads around the clock." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIPhoneCallersPage,
});
