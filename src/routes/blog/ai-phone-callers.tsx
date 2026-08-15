import { createFileRoute } from "@tanstack/react-router";
import AIPhoneCallersBlogPost from "@/pages/blog/AIPhoneCallersBlogPost";

export const Route = createFileRoute("/blog/ai-phone-callers")({
  head: () => ({
    meta: [
      { title: "AI Phone Callers for Business: A Practical Guide to AI Voice Automation" },
      { name: "description", content: "Learn how AI phone callers work, where businesses can use AI voice automation, and what to consider when building reliable AI powered calling systems." },
      { property: "og:title", content: "AI Phone Callers for Business: A Practical Guide to AI Voice Automation" },
      { property: "og:description", content: "Learn how AI phone callers work, where businesses can use AI voice automation, and what to consider when building reliable AI powered calling systems." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIPhoneCallersBlogPost,
});
