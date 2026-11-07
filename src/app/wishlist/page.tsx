"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist, useHydrated } from "@/lib/store"
import { useUi } from "@/components/providers"
import { ProductCard } from "@/components/product-card"

export default function WishlistPage() {
  const hydrated = useHydrated()
  const ids = useWishlist((s) => s.ids)
  const { products } = useUi()
  const saved = ids.map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined)

  return (
    <div className="container-x py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Wishlist</h1>
      {hydrated && saved.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line py-24 text-center">
          <Heart className="size-10 text-muted" />
          <p className="mt-4 text-lg font-medium">Nothing saved yet</p>
          <p className="mt-1 text-sm text-muted">Tap the heart on any product to keep it here.</p>
          <Link href="/products" className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
            Discover products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
