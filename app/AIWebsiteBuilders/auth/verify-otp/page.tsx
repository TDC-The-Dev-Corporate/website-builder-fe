import { Metadata } from "next";

import VerifyOTP from "@/app/components/auth/VerifyOTP";
import JsonLd from "@/app/components/JsonLd";
import { authMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Verify Account | TradesBuilder",
  description: "Verify your TradesBuilder account to continue",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    ...authMetadata.openGraph,
    title: "Verify Account | TradesBuilder",
    description: "Verify your TradesBuilder account to continue",
  },
  twitter: {
    ...authMetadata.twitter,
    title: "Verify Account | TradesBuilder",
    description: "Verify your TradesBuilder account to continue",
  },
};

export default function VerifyOTPPage() {
  const verifySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Verify Account",
    description: "Verify your TradesBuilder account to continue",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "/",
            name: "Home",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "/verify",
            name: "Verify Account",
          },
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={verifySchema} />
      <VerifyOTP />
    </>
  );
}
