async function fetchUsernames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`);
  if (!res.ok) throw new Error("Failed to fetch usernames");

  const users = await res.json();
  return users;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "http://localhost:3000",
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
    const usernames = await fetchUsernames();
    return usernames.map((username) => ({
      loc: `/AIWebsiteBuilders/portfolio/${username}`,
      lastmod: new Date().toISOString(),
    }));
  },
};
