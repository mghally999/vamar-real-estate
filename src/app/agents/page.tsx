import type { Metadata } from "next";
import { AgentsListing } from "@/components/sections/AgentsListing";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Meet the Vamar agents — specialists across luxury, family homes, investment and rentals.",
};

export default function AgentsPage() {
  return <AgentsListing />;
}
