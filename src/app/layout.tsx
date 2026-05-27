import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://vamar.ae"),
  title: { default: "Vamar Real Estate", template: "%s · Vamar Real Estate" },
  description:
    "An Emirati boutique brokerage specialising in heavy assets — properties exceeding AED 50 million in the UAE.",
  openGraph: {
    title: "Vamar Real Estate",
    description:
      "Trusted brokerage for high-value real estate across the UAE.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
