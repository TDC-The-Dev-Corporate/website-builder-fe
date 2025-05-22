import { Metadata } from "next";

import { baseMetadata } from "@/lib/metadata";
import PortfolioBuilder from "@/app/components/portfolio/PortfolioBuilder";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Website Builder | TradesBuilder",
  description:
    "Customize your trade business website with our easy-to-use website builder.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TemplateSelector() {
  return <PortfolioBuilder />;
}
