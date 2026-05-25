import type { Metadata } from "next";
import { ResourcesListing } from "@/components/sections/ResourcesListing";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Buyer guides, market reads, and operational explainers from the Vamar Real Estate team — written for first-time buyers, investors, and sellers across Dubai and the wider UAE.",
};

export default function ResourcesPage() {
  return <ResourcesListing />;
}
