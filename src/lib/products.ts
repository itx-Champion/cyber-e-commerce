import { cacheLife, cacheTag } from "next/cache"
import "server-only"
import { z } from "zod"
import { CATEGORIES } from "./categories"

const API = "https://dummyjson.com"


const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
})

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  weight: z.number().optional(),
  dimensions: z.object({ width: z.number(), height: z.number(), depth: z.number() }).optional(),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  availabilityStatus: z.string().optional(),
  returnPolicy: z.string().optional(),
  reviews: z.array(reviewSchema).default([]),
  images: z.array(z.string()).default([]),
  thumbnail: z.string(),
  tags: z.array(z.string()).default([]),
})

export type Product = z.infer<typeof productSchema>

/** The trimmed shape sent to client components (catalog, search, cards). */
export type ProductSummary = Pick<
  Product,
  "id" | "title" | "category" | "price" | "discountPercentage" | "rating" | "stock" | "brand" | "thumbnail" | "images"
>

export const toSummary = (p: Product): ProductSummary => ({
  id: p.id,
  title: p.title,
  category: p.category,
  price: p.price,
  discountPercentage: p.discountPercentage,
  rating: p.rating,
  stock: p.stock,
  brand: p.brand,
  thumbnail: p.thumbnail,
  images: p.images.slice(0, 2),
})

async function fetchJson(path: string) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`Catalog request failed: ${res.status} ${path}`)
  return res.json() as Promise<unknown>
}

/** Every product in the electronics categories. Cached for hours; the catalog changes rarely. */
export async function getCatalog(): Promise<Product[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("catalog")

  const lists = await Promise.all(
    CATEGORIES.map(async (c) => {
      const data = z.object({ products: z.array(productSchema) }).parse(await fetchJson(`/products/category/${c.slug}?limit=0`))
      return data.products
    })
  )
  return lists.flat()
}

export async function getProduct(id: number): Promise<Product | null> {
  const catalog = await getCatalog()
  return catalog.find((p) => p.id === id) ?? null
}
