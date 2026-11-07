import { getCatalog, toSummary } from "@/lib/products"
import { Hero } from "@/components/home/hero"
import { BrandMarquee, CategoryBento, Perks, PromoBanners } from "@/components/home/sections"
import { ProductTabs } from "@/components/home/product-tabs"
import { DealOfTheDay } from "@/components/home/deal-of-the-day"

export default async function HomePage() {
  const products = (await getCatalog()).map(toSummary)
  const brands = [...new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b)))]
  const deal = [...products].filter((p) => p.stock > 0 && p.price > 100 && p.rating >= 4).sort((a, b) => b.discountPercentage - a.discountPercentage)[0]

  return (
    <>
      <Hero />
      <BrandMarquee brands={brands} />
      <CategoryBento products={products} />
      <ProductTabs products={products} />
      {deal && <DealOfTheDay product={deal} />}
      <PromoBanners />
      <Perks />
    </>
  )
}
