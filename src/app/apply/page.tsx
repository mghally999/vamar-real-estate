import type { Metadata } from "next";
import { ApplyForm } from "@/components/sections/ApplyForm";

export const metadata: Metadata = {
  title: "Apply",
  description: "Start your Vamar application — for clients and agents.",
};

export default function ApplyPage() {
  return <ApplyForm />;
}
