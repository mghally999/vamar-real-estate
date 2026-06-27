import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import { SearchListing } from "@/components/sections/SearchListing";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.search.metaTitle,
    description: dict.search.metaDescription,
  };
}

export default async function SearchPage() {
  const dict = await getDictionary();
  return <SearchListing dict={dict.search} />;
}
