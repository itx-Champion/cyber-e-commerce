import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { getCatalog, getProduct, toSummary } from "@/lib/products"
import { categoryLabel } from "@/lib/categories"
import { salePrice } from "@/lib/pricing"
import { Gallery } from "@/components/product/gallery"
import { BuyBox } from "@/components/product/buy-box"
import { DetailsTabs } from "@/components/product/details-tabs"
import { ProductCard } from "@/components/product-card"
import { DiscountBadge, Price, Rating, SectionTitle } from "@/components/ui"

export async function generateStaticParams() {
  const catalog = await getCatalog()
  return catalog.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(Number(id))
  if (!product) return { title: "Product not found" }
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [{ url: product.images[0] ?? product.thumbnail }] },
  }
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params
  const product = await getProduct(Number(id))
  if (!product) notFound()

  const catalog = await getCatalog()
  const related = catalog
    .filter((p) => p.category === product.category && p.id !== product.id && p.stock > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map(toSummary)

  // Structured data lets search engines show price, stock and rating in results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews.length || 1 },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: salePrice(product.price, product.discountPercentage),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  }

  return (
    <div className="container-x py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href={`/products?category=${product.category}`} className="hover:text-ink">
          {categoryLabel(product.category)}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="truncate text-ink">{product.title}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Gallery images={product.images.length ? product.images : [product.thumbnail]} title={product.title} />

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">{product.brand ?? categoryLabel(product.category)}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{product.title}</h1>
          <div className="mt-4 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviews.length} />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Price price={product.price} discountPercentage={product.discountPercentage} size="lg" />
            <DiscountBadge value={product.discountPercentage} />
          </div>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>
          <div className="mt-8">
            <BuyBox
              product={toSummary(product)}
              warranty={product.warrantyInformation}
              shipping={product.shippingInformation}
              returns={product.returnPolicy}
            />
          </div>
        </div>
      </div>

      <DetailsTabs product={product} />

      {related.length > 0 && (
        <section className="mt-8">
          <SectionTitle eyebrow="More like this" title="You might also like" />
          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
