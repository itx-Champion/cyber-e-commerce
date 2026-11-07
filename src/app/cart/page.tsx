"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Lock, ShoppingBag, Trash2 } from "lucide-react"
import { formatPrice, salePrice } from "@/lib/pricing"
import { useCart, useHydrated } from "@/lib/store"
import { QuantityStepper } from "@/components/cart-drawer"
import { OrderSummary } from "@/components/order-summary"

export default function CartPage() {
  const hydrated = useHydrated()
  const { items, setQuantity, remove } = useCart()

  if (!hydrated) return <div className="container-x min-h-[60vh] py-12" />

  if (items.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-white">
          <ShoppingBag className="size-8" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-muted">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="mt-8 rounded-full bg-ink px-6 py-3 font-medium text-white">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="container-x py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Shopping cart</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white px-6">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li key={item.id} layout exit={{ opacity: 0, height: 0 }} className="flex gap-5 py-6">
                <Link href={`/products/${item.id}`} className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-paper">
                  <Image src={item.thumbnail} alt={item.title} fill sizes="112px" className="object-contain p-3" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-muted">{item.brand}</p>
                      <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                        {item.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{formatPrice(salePrice(item.price, item.discountPercentage))} each</p>
                    </div>
                    <p className="text-lg font-semibold tabular-nums">
                      {formatPrice(salePrice(item.price, item.discountPercentage) * item.quantity)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper value={item.quantity} max={item.stock} onChange={(n) => setQuantity(item.id, n)} />
                    <button onClick={() => remove(item.id)} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
                      <Trash2 className="size-4" /> Remove
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary>
            <Link href="/checkout" className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-medium text-white">
              Checkout <ArrowRight className="size-4" />
            </Link>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
              <Lock className="size-3" /> Secure checkout · Guest checkout available
            </p>
          </OrderSummary>
        </div>
      </div>
    </div>
  )
}
