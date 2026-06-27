import type { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import { ApplyForm } from "@/components/sections/ApplyForm";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.apply.metaTitle,
    description: dict.apply.metaDescription,
  };
}

export default async function ApplyPage() {
  const dict = await getDictionary();
  return <ApplyForm dict={dict.apply} />;
}
