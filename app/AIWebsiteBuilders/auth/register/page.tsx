import { Metadata } from "next";

import Register from "@/app/components/auth/Register";
import JsonLd from "@/app/components/JsonLd";
import { authMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Register | TradesBuilder",
  description: "Create your trade business account on TradesBuilder",
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
    title: "Register | TradesBuilder",
    description: "Create your trade business account on TradesBuilder",
  },
  twitter: {
    ...authMetadata.twitter,
    title: "Register | TradesBuilder",
    description: "Create your trade business account on TradesBuilder",
  },
};

export default function RegisterPage() {
  const registerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Register Trade Business Account",
    description: "Create your trade business account on TradesBuilder",
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
            "@id": "/register",
            name: "Register",
          },
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={registerSchema} />
      <Register />
    </>
  );
}
