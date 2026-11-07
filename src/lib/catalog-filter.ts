import type { ProductSummary } from "./products"
import { salePrice } from "./pricing"

export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "discount", label: "Biggest discounts" },
  { id: "newest", label: "Newest" },
] as const

export type SortId = (typeof SORTS)[number]["id"]

export type CatalogFilters = {
  q?: string
  categories?: string[]
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  sort?: SortId
}

const normalize = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s]/gu, " ")

/** Every query word must appear in the title, brand or category (prefix match). */
export function searchProducts(products: ProductSummary[], query: string) {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (!words.length) return products
  return products
    .map((p) => {
      const hay = normalize(`${p.title} ${p.brand ?? ""} ${p.category}`).split(/\s+/)
      const titleWords = normalize(p.title).split(/\s+/)
      let score = 0
      for (const w of words) {
        if (!hay.some((h) => h.startsWith(w))) return null
        score += titleWords.some((t) => t.startsWith(w)) ? 2 : 1
      }
      return { p, score }
    })
    .filter((r): r is { p: ProductSummary; score: number } => r !== null)
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
    .map((r) => r.p)
}

export function applyFilters(products: ProductSummary[], f: CatalogFilters) {
  let list = f.q ? searchProducts(products, f.q) : [...products]
  if (f.categories?.length) list = list.filter((p) => f.categories!.includes(p.category))
  if (f.brands?.length) list = list.filter((p) => p.brand && f.brands!.includes(p.brand))
  if (f.minPrice !== undefined) list = list.filter((p) => salePrice(p.price, p.discountPercentage) >= f.minPrice!)
  if (f.maxPrice !== undefined) list = list.filter((p) => salePrice(p.price, p.discountPercentage) <= f.maxPrice!)
  if (f.minRating) list = list.filter((p) => p.rating >= f.minRating!)
  if (f.inStock) list = list.filter((p) => p.stock > 0)

  const by = (fn: (p: ProductSummary) => number) => list.sort((a, b) => fn(a) - fn(b))
  switch (f.sort) {
    case "price-asc":
      return by((p) => salePrice(p.price, p.discountPercentage))
    case "price-desc":
      return by((p) => -salePrice(p.price, p.discountPercentage))
    case "rating":
      return by((p) => -p.rating)
    case "discount":
      return by((p) => -p.discountPercentage)
    case "newest":
      return by((p) => -p.id)
    default:
      return f.q ? list : by((p) => -(p.rating * 10 + Math.min(p.stock, 50) / 10))
  }
}

/** Reads filters from URL search params (the catalog's single source of truth). */
export function filtersFromParams(params: URLSearchParams): CatalogFilters {
  const num = (k: string) => {
    const v = params.get(k)
    return v === null || v === "" || Number.isNaN(Number(v)) ? undefined : Number(v)
  }
  const list = (k: string) => params.getAll(k).flatMap((v) => v.split(",")).filter(Boolean)
  const sort = params.get("sort")
  return {
    q: params.get("q") ?? undefined,
    categories: list("category"),
    brands: list("brand"),
    minPrice: num("min"),
    maxPrice: num("max"),
    minRating: num("rating"),
    inStock: params.get("stock") === "1",
    sort: (SORTS.some((s) => s.id === sort) ? sort : "featured") as SortId,
  }
}
