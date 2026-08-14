import { createFileRoute } from "@tanstack/react-router";
import AIPhoneCallersBlogPost from "@/pages/blog/AIPhoneCallersBlogPost";

export const Route = createFileRoute("/blog/ai-phone-callers")({
  head: () => ({
    meta: [
      { title: "AI Phone Callers Guide | SamysAI" },
      { name: "description", content: "How AI phone callers handle sales calls and book meetings for you." },
      { property: "og:title", content: "AI Phone Callers Guide | SamysAI" },
      { property: "og:description", content: "How AI phone callers handle sales calls and book meetings for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIPhoneCallersBlogPost,
});
