import type { MetadataRoute } from "next"
import { getCatalog } from "@/lib/products"

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalog()
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/products`, changeFrequency: "daily", priority: 0.9 },
    ...products.map((p) => ({ url: `${siteUrl}/products/${p.id}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ]
}
