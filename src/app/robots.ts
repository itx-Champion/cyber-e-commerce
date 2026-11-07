import type { MetadataRoute } from "next"

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout", "/account", "/cart"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
