"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react"
import { computeTotals, formatPrice, FREE_SHIPPING_THRESHOLD, salePrice } from "@/lib/pricing"
import { useCart, useHydrated } from "@/lib/store"

export function QuantityStepper({ value, max, onChange }: { value: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className="flex size-8 items-center justify-center rounded-full disabled:opacity-30"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-7 text-center text-sm font-medium tabular-nums">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex size-8 items-center justify-center rounded-full disabled:opacity-30"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

export function CartDrawer() {
  const hydrated = useHydrated()
  const { items, drawerOpen, setDrawer, setQuantity, remove, promo } = useCart()
  const totals = computeTotals(items, { promo: promo ?? undefined })
  const toFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal)

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false)
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [drawerOpen, setDrawer])

  return (
    <AnimatePresence>
      {hydrated && drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="text-lg font-semibold">
                Your cart <span className="text-muted">({totals.count})</span>
              </h2>
              <button onClick={() => setDrawer(false)} aria-label="Close cart" className="rounded-full p-2 hover:bg-ink/5">
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-ink/5">
                  <ShoppingBag className="size-7" />
                </span>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-muted">Find something you love — free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}.</p>
                <Link href="/products" onClick={() => setDrawer(false)} className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <p className="flex items-center gap-2 text-sm">
                    <Truck className="size-4" />
                    {toFree > 0 ? (
                      <>
                        Add <strong>{formatPrice(toFree)}</strong> for free shipping
                      </>
                    ) : (
                      <strong>You unlocked free shipping</strong>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <motion.div
                      className="h-full rounded-full bg-ink"
                      initial={false}
                      animate={{ width: `${Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>

                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 py-5"
                      >
                        <Link href={`/products/${item.id}`} onClick={() => setDrawer(false)} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-white">
                          <Image src={item.thumbnail} alt={item.title} fill sizes="80px" className="object-contain p-2" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-xs text-muted">{item.brand}</p>
                              <p className="truncate font-medium">{item.title}</p>
                            </div>
                            <button onClick={() => remove(item.id)} aria-label={`Remove ${item.title}`} className="self-start rounded-full p-1.5 text-muted hover:bg-ink/5 hover:text-ink">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QuantityStepper value={item.quantity} max={item.stock} onChange={(n) => setQuantity(item.id, n)} />
                            <span className="font-semibold tabular-nums">
                              {formatPrice(salePrice(item.price, item.discountPercentage) * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-3 border-t border-line bg-white px-6 py-5">
                  <div className="flex justify-between text-sm text-muted">
                    <span>You save</span>
                    <span className="tabular-nums">−{formatPrice(totals.savings + totals.promo)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(totals.subtotal - totals.promo)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link href="/cart" onClick={() => setDrawer(false)} className="rounded-full border border-ink py-3 text-center text-sm font-medium">
                      View cart
                    </Link>
                    <Link href="/checkout" onClick={() => setDrawer(false)} className="rounded-full bg-ink py-3 text-center text-sm font-medium text-white">
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
