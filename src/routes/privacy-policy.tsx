import { createFileRoute } from "@tanstack/react-router";
const PrivacyPolicyPage = React.lazy(() => import("@/pages/PrivacyPolicyPage"));

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | SamysAI" },
      { name: "description", content: "How SamysAI collects, uses and protects your data." },
      { property: "og:title", content: "Privacy Policy | SamysAI" },
      { property: "og:description", content: "How SamysAI collects, uses and protects your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPolicyPage,
});
