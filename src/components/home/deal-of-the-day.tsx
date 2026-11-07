"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import type { ProductSummary } from "@/lib/products"
import { formatPrice, salePrice } from "@/lib/pricing"
import { useCart } from "@/lib/store"
import { Rating } from "../ui"

function useCountdownToMidnight() {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(24, 0, 0, 0)
      setLeft(Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000)))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return left
}

export function DealOfTheDay({ product }: { product: ProductSummary }) {
  const left = useCountdownToMidnight()
  const add = useCart((s) => s.add)
  const parts =
    left === null
      ? ["--", "--", "--"]
      : [Math.floor(left / 3600), Math.floor((left % 3600) / 60), left % 60].map((n) => String(n).padStart(2, "0"))
  const sale = salePrice(product.price, product.discountPercentage)

  return (
    <section className="container-x py-12">
      <div className="relative grid overflow-hidden rounded-[2rem] bg-lime md:grid-cols-2">
        <div className="relative z-10 p-8 md:p-12">
          <p className="font-mono text-xs tracking-widest uppercase">Deal of the day</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{product.title}</h2>
          <Rating value={product.rating} className="mt-3" />
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-5xl font-semibold tracking-tight tabular-nums">{formatPrice(sale)}</span>
            <span className="text-xl text-ink/50 line-through tabular-nums">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-ink px-2.5 py-1 text-sm font-semibold text-lime">
              Save {formatPrice(product.price - sale)}
            </span>
          </div>

          <div className="mt-8 flex gap-3" aria-label="Time left on this deal">
            {parts.map((p, i) => (
              <div key={i} className="flex w-20 flex-col items-center rounded-2xl bg-ink py-3 text-lime">
                <span className="font-mono text-3xl font-semibold tabular-nums">{p}</span>
                <span className="text-[10px] tracking-widest text-white/60 uppercase">{["Hours", "Mins", "Secs"][i]}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                add(product)
                toast.success("Added to cart", { description: product.title })
              }}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-white"
            >
              <ShoppingBag className="size-4" /> Add to cart
            </button>
            <Link href={`/products/${product.id}`} className="inline-flex h-12 items-center rounded-full border border-ink px-6 font-medium">
              View details
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/60">Only {product.stock} in stock at this price.</p>
        </div>
        <div className="relative min-h-[320px]">
          <div className="absolute inset-0 m-auto size-[80%] rounded-full bg-white/50 blur-3xl" />
          <Image src={product.images[0] ?? product.thumbnail} alt={product.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-10 drop-shadow-2xl" />
        </div>
      </div>
    </section>
  )
}
