"use client"

import { useState } from "react"
import { Tag } from "lucide-react"
import { toast } from "sonner"
import { computeTotals, formatPrice, PROMO_CODES, type ShippingMethodId } from "@/lib/pricing"
import { useCart } from "@/lib/store"

export function OrderSummary({ shipping, children }: { shipping?: ShippingMethodId; children?: React.ReactNode }) {
  const { items, promo, applyPromo } = useCart()
  const totals = computeTotals(items, { shipping, promo: promo ?? undefined })
  const [code, setCode] = useState("")

  const row = (label: string, value: string, muted = true) => (
    <div className={muted ? "flex justify-between text-sm text-muted" : "flex justify-between"}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )

  return (
    <div className="space-y-4 rounded-[var(--radius-card)] border border-line bg-white p-6">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <div className="space-y-2.5">
        {row(`Items (${totals.count})`, formatPrice(totals.list))}
        {totals.savings > 0 && row("Discounts", `−${formatPrice(totals.savings)}`)}
        {totals.promo > 0 && row(`Promo ${promo}`, `−${formatPrice(totals.promo)}`)}
        {row("Shipping", totals.shipping === 0 ? "Free" : formatPrice(totals.shipping))}
        {row("Estimated tax", formatPrice(totals.tax))}
      </div>
      <div className="border-t border-line pt-4">{row("Total", formatPrice(totals.total), false)}</div>

      {promo ? (
        <div className="flex items-center justify-between rounded-xl bg-lime/40 px-3 py-2 text-sm">
          <span className="flex items-center gap-2 font-medium">
            <Tag className="size-4" /> {promo} applied
          </span>
          <button onClick={() => applyPromo(null)} className="text-xs underline">
            Remove
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const value = code.trim().toUpperCase()
            if (PROMO_CODES[value]) {
              applyPromo(value)
              setCode("")
              toast.success(`${value} applied — ${PROMO_CODES[value] * 100}% off`)
            } else {
              toast.error("That code isn't valid", { description: "Try CYBER10 for 10% off." })
            }
          }}
          className="flex gap-2"
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Promo code"
            aria-label="Promo code"
            className="h-10 min-w-0 flex-1 rounded-full border border-line px-4 text-sm uppercase outline-none focus:border-ink"
          />
          <button type="submit" className="h-10 rounded-full border border-ink px-4 text-sm font-medium">
            Apply
          </button>
        </form>
      )}
      {children}
    </div>
  )
}
