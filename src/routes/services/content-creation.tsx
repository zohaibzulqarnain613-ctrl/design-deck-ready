import { createFileRoute } from "@tanstack/react-router";
import ContentCreationPage from "@/pages/ContentCreationPage";

export const Route = createFileRoute("/services/content-creation")({
  head: () => ({
    meta: [
      { title: "Content Creation | SamysAI" },
      { name: "description", content: "AI-assisted content engines that keep your brand publishing daily." },
      { property: "og:title", content: "Content Creation | SamysAI" },
      { property: "og:description", content: "AI-assisted content engines that keep your brand publishing daily." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentCreationPage,
});
