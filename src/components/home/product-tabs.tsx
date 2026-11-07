"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import type { ProductSummary } from "@/lib/products"
import { applyFilters, type SortId } from "@/lib/catalog-filter"
import { ProductCard } from "../product-card"
import { cn } from "../ui"

const tabs: { id: SortId; label: string }[] = [
  { id: "featured", label: "Trending" },
  { id: "rating", label: "Top rated" },
  { id: "discount", label: "Biggest deals" },
  { id: "newest", label: "New arrivals" },
]

export function ProductTabs({ products }: { products: ProductSummary[] }) {
  const [tab, setTab] = useState<SortId>("featured")
  const items = applyFilters(products, { sort: tab, inStock: true }).slice(0, 8)

  return (
    <section className="container-x py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 font-mono text-xs tracking-widest text-muted uppercase">Featured</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Picked for you</h2>
        </div>
        <div role="tablist" className="flex gap-1 rounded-full border border-line bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn("relative rounded-full px-4 py-2 text-sm transition-colors", tab === t.id ? "text-white" : "text-muted hover:text-ink")}
            >
              {tab === t.id && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 450, damping: 35 }} />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((p, i) => (
            <motion.div
              key={`${tab}-${p.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ProductCard product={p} priority={i < 4} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href={`/products?sort=${tab}`} className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-white">
          View all products <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
