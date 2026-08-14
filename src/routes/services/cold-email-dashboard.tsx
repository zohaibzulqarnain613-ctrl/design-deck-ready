import { createFileRoute } from "@tanstack/react-router";
import ColdEmailDashboardPage from "@/pages/ColdEmailDashboardPage";

export const Route = createFileRoute("/services/cold-email-dashboard")({
  head: () => ({
    meta: [
      { title: "Cold Email Dashboard | SamysAI" },
      { name: "description", content: "Track, scale and optimise cold email campaigns from one dashboard." },
      { property: "og:title", content: "Cold Email Dashboard | SamysAI" },
      { property: "og:description", content: "Track, scale and optimise cold email campaigns from one dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ColdEmailDashboardPage,
});
