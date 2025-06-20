import { Metadata } from "next";

// Base application metadata that can be extended for specific pages
export const baseMetadata: Metadata = {
  title: {
    default: "TradesBuilder | Create Professional Websites for Tradespeople",
    template: "%s | TradesBuilder",
  },
  description:
    "Create professional, customizable websites for your trade business in minutes. No coding required.",
  keywords: [
    "trade website",
    "tradespeople",
    "portfolio website",
    "contractor website",
    "tradesman website builder",
    "professional trade portfolio",
  ],
  authors: [{ name: "TradesBuilder" }],
  creator: "TradesBuilder",
  publisher: "TradesBuilder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "TradesBuilder | Create Professional Websites for Tradespeople",
    description:
      "Create professional, customizable websites for your trade business in minutes. No coding required.",
    siteName: "TradesBuilder",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TradesBuilder - Website builder for tradespeople",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TradesBuilder | Create Professional Websites for Tradespeople",
    description:
      "Create professional, customizable websites for your trade business in minutes. No coding required.",
    images: ["/twitter-image.jpg"],
    creator: "@tradesbuilder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification=your-verification-code",
  },
  appleWebApp: {
    title: "TradesBuilder",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

// Auth page metadata with privacy-focused content
export const authMetadata: Metadata = {
  title: "Sign In | TradesBuilder",
  description:
    "Sign in to TradesBuilder to manage your trade business website.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Sign In | TradesBuilder",
    description:
      "Sign in to TradesBuilder to manage your trade business website.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Sign In | TradesBuilder",
    description:
      "Sign in to TradesBuilder to manage your trade business website.",
  },
};

// Dashboard metadata
export const dashboardMetadata: Metadata = {
  title: "Dashboard | TradesBuilder",
  description:
    "Manage your trade business website, templates, and drafts from your dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

// Profile metadata
export const profileMetadata: Metadata = {
  title: "Profile | TradesBuilder",
  description: "Manage your trade business profile information.",
  robots: {
    index: false,
    follow: false,
  },
};

// Get metadata for a portfolio page based on user data
export function getPortfolioMetadata(userData: any): Metadata {
  if (!userData) return baseMetadata;

  const title = `${userData.name} | ${userData.tradeSpecialization}`;
  const description = `Professional ${userData.tradeSpecialization} services by ${userData.name} at ${userData.companyName}. Contact us at ${userData.phoneNumber}.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `/portfolio/${userData.username}`,
      title,
      description,
      siteName: userData.companyName || "Professional Trade Services",
      images: [
        {
          url: userData.profileImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${userData.name} - ${userData.tradeSpecialization}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [userData.profileImage || "/twitter-image.jpg"],
    },
  };
}

// Create a JSON-LD structured data object for the organization
export function generateOrganizationSchema(userData: any) {
  if (!userData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: userData.companyName || `${userData.name} Trade Services`,
    description: `Professional ${userData.tradeSpecialization} services`,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/portfolio/${userData.username}`,
    telephone: userData.phoneNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: userData.address,
    },
    image: userData.profileImage,
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: userData.name,
    },
    areaServed: userData.address,
    sameAs: [],
  };
}

// Create a JSON-LD structured data object for a local business
export function generateLocalBusinessSchema(userData: any) {
  if (!userData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: userData.companyName || `${userData.name} Trade Services`,
    image: userData.profileImage,
    telephone: userData.phoneNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: userData.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "",
      longitude: "",
    },
    url: `${process.env.NEXT_PUBLIC_APP_URL}/portfolio/${userData.username}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
  };
}
