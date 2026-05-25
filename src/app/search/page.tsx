import type { Metadata } from "next";
import { SearchListing } from "@/components/sections/SearchListing";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Browse a handpicked slice of homes for sale and rent across the UAE — filter by mode, bedrooms, neighborhood.",
};

export default function SearchPage() {
  return <SearchListing />;
}
