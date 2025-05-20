/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "http://localhost:3000", // Change to production URL when live
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/private/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  additionalPaths: async (config) => {
    const usernames = ["mahrooshhashmi"];
    return usernames.map((username) => ({
      loc: `/AIWebsiteBuilders/portfolio/${username}`,
      lastmod: new Date().toISOString(),
    }));
  },
};
