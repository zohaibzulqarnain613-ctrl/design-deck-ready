import { createFileRoute } from "@tanstack/react-router";
import ColdEmailDashboardsBlogPost from "@/pages/blog/ColdEmailDashboardsBlogPost";

export const Route = createFileRoute("/blog/cold-email-dashboards")({
  head: () => ({
    meta: [
      { title: "Cold Email Dashboards: A Practical Guide to Outreach Infrastructure" },
      { name: "description", content: "Learn how cold email dashboards manage outreach infrastructure, deliverability, campaigns, prospect data, automation, and reporting." },
      { property: "og:title", content: "Cold Email Dashboards: A Practical Guide to Outreach Infrastructure" },
      { property: "og:description", content: "Learn how cold email dashboards manage outreach infrastructure, deliverability, campaigns, prospect data, automation, and reporting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ColdEmailDashboardsBlogPost,
});
