"use client"

import { useState } from "react"
import { motion } from "motion/react"
import type { Product } from "@/lib/products"
import { cn, Rating } from "../ui"

export function DetailsTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<"overview" | "specs" | "reviews">("overview")
  const specs = [
    ["Brand", product.brand],
    ["Model / SKU", product.sku],
    ["Weight", product.weight ? `${product.weight} kg` : undefined],
    ["Dimensions", product.dimensions ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` : undefined],
    ["Warranty", product.warrantyInformation],
    ["Shipping", product.shippingInformation],
    ["Returns", product.returnPolicy],
    ["Availability", product.availabilityStatus],
  ].filter((row): row is [string, string] => Boolean(row[1]))

  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : product.rating

  return (
    <section className="mt-20">
      <div role="tablist" className="flex gap-8 border-b border-line">
        {(["overview", "specs", "reviews"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn("relative pb-4 text-sm font-medium capitalize", tab === t ? "text-ink" : "text-muted")}
          >
            {t === "reviews" ? `Reviews (${product.reviews.length})` : t}
            {tab === t && <motion.span layoutId="detail-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" />}
          </button>
        ))}
      </div>

      <div className="py-8">
        {tab === "overview" && (
          <div className="max-w-3xl">
            <p className="text-lg leading-relaxed">{product.description}</p>
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white px-3 py-1 text-xs text-muted capitalize">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "specs" && (
          <dl className="grid max-w-3xl overflow-hidden rounded-[var(--radius-card)] border border-line bg-white sm:grid-cols-2">
            {specs.map(([k, v]) => (
              <div key={k} className="border-b border-line p-4 sm:odd:border-r">
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "reviews" && (
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <div>
              <p className="text-6xl font-semibold tracking-tight">{avg.toFixed(1)}</p>
              <Rating value={avg} className="mt-2" />
              <p className="mt-1 text-sm text-muted">Based on {product.reviews.length} reviews</p>
            </div>
            <ul className="space-y-4">
              {product.reviews.map((r, i) => (
                <li key={i} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-lime">
                        {r.reviewerName.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{r.reviewerName}</p>
                        <p className="text-xs text-muted">
                          {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · Verified buyer
                        </p>
                      </div>
                    </div>
                    <Rating value={r.rating} className="text-xs" />
                  </div>
                  <p className="mt-3 text-sm">{r.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
