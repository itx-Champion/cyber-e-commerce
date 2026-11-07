"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Heart, Plus } from "lucide-react"
import { toast } from "sonner"
import type { ProductSummary } from "@/lib/products"
import { useCart, useHydrated, useWishlist } from "@/lib/store"
import { cn, DiscountBadge, Price, Rating } from "./ui"

export function WishlistButton({ id, title, className }: { id: number; title: string; className?: string }) {
  const hydrated = useHydrated()
  const saved = useWishlist((s) => s.ids.includes(id))
  const toggle = useWishlist((s) => s.toggle)
  const on = hydrated && saved
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        toggle(id)
        toast(on ? "Removed from wishlist" : "Saved to wishlist", { description: title })
      }}
      aria-label={on ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      aria-pressed={on}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform hover:scale-110",
        className
      )}
    >
      <motion.span key={String(on)} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
        <Heart className={cn("size-4", on ? "fill-sale text-sale" : "text-ink")} />
      </motion.span>
    </button>
  )
}

export function ProductCard({ product, priority }: { product: ProductSummary; priority?: boolean }) {
  const add = useCart((s) => s.add)
  const second = product.images[1]
  const soldOut = product.stock <= 0

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)]"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white to-paper">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn(
            "object-contain p-6 transition duration-700 ease-out group-hover:scale-105",
            second && "group-hover:opacity-0"
          )}
        />
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="scale-105 object-contain p-6 opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <DiscountBadge value={product.discountPercentage} />
          {product.stock > 0 && product.stock < 10 && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-xs font-medium text-white">Only {product.stock} left</span>
          )}
        </div>
        <WishlistButton id={product.id} title={product.title} className="absolute top-3 right-3" />
        {!soldOut && (
          <button
            onClick={(e) => {
              e.preventDefault()
              add(product)
              toast.success("Added to cart", { description: product.title })
            }}
            className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100"
          >
            <Plus className="size-4" /> Add to cart
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs text-muted">{product.brand ?? "Cyber"}</p>
        <h3 className="line-clamp-1 font-medium">{product.title}</h3>
        <Rating value={product.rating} className="text-xs" />
        <div className="mt-auto pt-2">
          {soldOut ? <span className="text-sm text-muted">Sold out</span> : <Price price={product.price} discountPercentage={product.discountPercentage} />}
        </div>
      </div>
    </Link>
  )
}
