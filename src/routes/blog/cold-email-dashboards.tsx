import { createFileRoute } from "@tanstack/react-router";
import ColdEmailDashboardsBlogPost from "@/pages/blog/ColdEmailDashboardsBlogPost";

export const Route = createFileRoute("/blog/cold-email-dashboards")({
  head: () => ({
    meta: [
      { title: "Cold Email Dashboards Guide | SamysAI" },
      { name: "description", content: "Measuring and scaling cold email with the right dashboard." },
      { property: "og:title", content: "Cold Email Dashboards Guide | SamysAI" },
      { property: "og:description", content: "Measuring and scaling cold email with the right dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ColdEmailDashboardsBlogPost,
});
