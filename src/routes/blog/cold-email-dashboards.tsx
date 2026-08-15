import { createFileRoute } from "@tanstack/react-router";
import ColdEmailDashboardsBlogPost from "@/pages/blog/ColdEmailDashboardsBlogPost";

export const Route = createFileRoute("/blog/cold-email-dashboards")({
  head: () => ({
    meta: [
      { title: "Cold Email Dashboards: A Practical Guide | SamysAI" },
      { name: "description", content: "Learn how businesses use cold email dashboards to manage outreach, track deliverability, and build reliable lead generation systems." },
      { property: "og:title", content: "Cold Email Dashboards: A Practical Guide | SamysAI" },
      { property: "og:description", content: "Learn how businesses use cold email dashboards to manage outreach, track deliverability, and build reliable lead generation systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ColdEmailDashboardsBlogPost,
});
