import { Metadata } from "next";

import OAuthRedirect from "@/app/components/auth/OAuthRedirect";
import JsonLd from "@/app/components/JsonLd";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Authentication Redirect | TradesBuilder",
  description: "Completing your authentication with TradesBuilder",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Authentication Redirect | TradesBuilder",
    description: "Completing your authentication with TradesBuilder",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Authentication Redirect | TradesBuilder",
    description: "Completing your authentication with TradesBuilder",
  },
};

export default function OAuthRedirectPage() {
  const redirectSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Authentication Redirect",
    description: "Completing your authentication with TradesBuilder",
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
            "@id": "/oauth-redirect",
            name: "Authentication Redirect",
          },
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={redirectSchema} />
      <OAuthRedirect />
    </>
  );
}
