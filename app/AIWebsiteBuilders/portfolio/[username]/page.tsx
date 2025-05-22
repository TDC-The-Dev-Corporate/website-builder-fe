import { Metadata } from "next";

import {
  baseMetadata,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  getPortfolioMetadata,
} from "@/lib/metadata";
import JsonLd from "@/app/components/JsonLd";
import PortfolioPage from "@/app/components/portfolio/PortfolioPage";

import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  try {
    const portfolioData = await getPortfolioByUserName(params.username);

    if (portfolioData) {
      return getPortfolioMetadata(portfolioData);
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    ...baseMetadata,
    title: "Trade Professional Portfolio | TradesBuilder",
    description:
      "View this tradesperson's professional portfolio and services.",
  };
}

export default async function PortfolioUserPage({
  params,
}: {
  params: { username: string };
}) {
  let portfolioData = null;
  let structuredData = null;

  try {
    portfolioData = await getPortfolioByUserName(params.username);

    if (portfolioData) {
      structuredData = [
        generateOrganizationSchema(portfolioData),
        generateLocalBusinessSchema(portfolioData),
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `${portfolioData.name}'s Trade Portfolio`,
          description: `Professional ${portfolioData.tradeSpecialization} services portfolio`,
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
                  "@id": `/portfolio/${portfolioData.username}`,
                  name: "Portfolio",
                },
              },
            ],
          },
        },
      ].filter(Boolean);
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }

  return (
    <>
      {structuredData && structuredData.length > 0 && (
        <JsonLd data={structuredData} />
      )}
      <PortfolioPage />
    </>
  );
}
