import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import { AgentsListing } from "@/components/sections/AgentsListing";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.team.metaTitle,
    description: dict.team.metaDescription,
  };
}

export default async function AgentsPage() {
  const dict = await getDictionary();
  return <AgentsListing dict={dict.team} founders={dict.founders} />;
}
