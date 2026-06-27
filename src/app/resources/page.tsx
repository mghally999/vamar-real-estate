import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import { ResourcesListing } from "@/components/sections/ResourcesListing";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.resources.metaTitle,
    description: dict.resources.metaDescription,
  };
}

export default async function ResourcesPage() {
  const dict = await getDictionary();
  return <ResourcesListing dict={dict.resources} />;
}
