import { createFileRoute } from "@tanstack/react-router";
import AppDevelopmentPage from "@/pages/AppDevelopmentPage";

export const Route = createFileRoute("/services/app-development")({
  head: () => ({
    meta: [
      { title: "App Development | SamysAI" },
      { name: "description", content: "Custom mobile and web apps powered by AI automation." },
      { property: "og:title", content: "App Development | SamysAI" },
      { property: "og:description", content: "Custom mobile and web apps powered by AI automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppDevelopmentPage,
});
