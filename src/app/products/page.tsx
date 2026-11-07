import { Suspense } from "react"
import type { Metadata } from "next"
import { getCatalog, toSummary } from "@/lib/products"
import { Catalog } from "@/components/catalog/catalog"

export const metadata: Metadata = {
  title: "Shop all products",
  description: "Browse smartphones, laptops, tablets and accessories. Filter by brand, price and rating.",
}

function CatalogSkeleton() {
  return (
    <div className="container-x py-10">
      <div className="h-24 w-72 animate-pulse rounded-2xl bg-line" />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:ml-[290px]">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-[var(--radius-card)] bg-line" />
        ))}
      </div>
    </div>
  )
}

export default async function ProductsPage() {
  const products = (await getCatalog()).map(toSummary)
  // Filters live in the URL, which is only known at request time — stream the catalog in.
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <Catalog products={products} />
    </Suspense>
  )
}
