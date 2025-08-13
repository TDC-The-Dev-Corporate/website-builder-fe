/**
 * Schema definitions for SEO and structured data
 * Contains JSON-LD schemas for various components
 */

/**
 * Schema for the TradesBuilder Website Builder application
 */
export const builderSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TradesBuilder Website Builder",
  applicationCategory: "WebsiteBuilder",
  description: "Create and customize your trade business website",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Drag-and-drop interface",
    "Professional templates",
    "Mobile responsive",
    "Custom styling",
    "Image and video upload",
    "Real-time preview",
    "AI content generation",
    "AI image generation",
  ],
};

/**
 * Schema for a trade business portfolio
 * @param businessName - Name of the business
 * @param trade - Type of trade/service
 * @param description - Business description
 */
export const generatePortfolioSchema = (businessName, trade, description = "") => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: businessName,
  serviceType: trade,
  description: description || `Professional ${trade} services`,
  offers: {
    "@type": "Service",
    serviceType: trade,
  },
});

/**
 * Schema for a service page
 * @param serviceName - Name of the service
 * @param description - Service description
 * @param provider - Business providing the service
 */
export const generateServiceSchema = (serviceName, description, provider) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  description: description,
  provider: {
    "@type": "LocalBusiness",
    name: provider,
  },
});
