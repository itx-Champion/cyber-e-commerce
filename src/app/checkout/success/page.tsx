"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { Check, Package } from "lucide-react"
import { deliveryDate, formatPrice, SHIPPING_METHODS } from "@/lib/pricing"
import { useAccount, useHydrated } from "@/lib/store"

function Confirmation() {
  const hydrated = useHydrated()
  const id = useSearchParams().get("order")
  const order = useAccount((s) => s.orders.find((o) => o.id === id))

  if (!hydrated) return <div className="min-h-[60vh]" />
  if (!order) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold">We couldn&apos;t find that order</h1>
        <Link href="/account" className="mt-6 rounded-full bg-ink px-6 py-3 font-medium text-white">
          View your orders
        </Link>
      </div>
    )
  }

  const method = SHIPPING_METHODS.find((m) => m.id === order.shipping)!

  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.span
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="mx-auto flex size-20 items-center justify-center rounded-full bg-lime"
      >
        <Check className="size-10" strokeWidth={3} />
      </motion.span>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight">Thanks, {order.address.fullName.split(" ")[0]}!</h1>
      <p className="mt-3 text-muted">
        Order <span className="font-mono font-medium text-ink">{order.id}</span> is confirmed. A receipt is on its way to {order.address.email}.
      </p>

      <div className="mt-10 rounded-[var(--radius-card)] border border-line bg-white p-6 text-left">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <Package className="size-5" />
          <div>
            <p className="font-medium">Arriving by {deliveryDate(method.days, new Date(order.createdAt))}</p>
            <p className="text-sm text-muted">
              {method.label} delivery to {order.address.city}, {order.address.country}
            </p>
          </div>
        </div>
        <ul className="divide-y divide-line">
          {order.items.map((i) => (
            <li key={i.id} className="flex items-center gap-3 py-3">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-paper">
                <Image src={i.thumbnail} alt="" fill sizes="48px" className="object-contain p-1" />
              </span>
              <span className="flex-1 text-sm">
                {i.quantity} × {i.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-line pt-4 font-semibold">
          <span>Total {order.payment === "cod" ? "(cash on delivery)" : "paid"}</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link href="/products" className="rounded-full bg-ink px-6 py-3 font-medium text-white">
          Keep shopping
        </Link>
        <Link href="/account" className="rounded-full border border-ink px-6 py-3 font-medium">
          Your orders
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="container-x py-16">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <Confirmation />
      </Suspense>
    </div>
  )
}
