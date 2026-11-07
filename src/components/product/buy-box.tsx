"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ShieldCheck, ShoppingBag, Truck, Undo2, Zap } from "lucide-react"
import { toast } from "sonner"
import type { ProductSummary } from "@/lib/products"
import { formatPrice, salePrice, shippingDays } from "@/lib/pricing"
import { DeliveryEstimate } from "../delivery-estimate"
import { useCart } from "@/lib/store"
import { QuantityStepper } from "../cart-drawer"
import { WishlistButton } from "../product-card"

type Props = {
  product: ProductSummary
  warranty?: string
  shipping?: string
  returns?: string
}

export function BuyBox({ product, warranty, shipping, returns }: Props) {
  const router = useRouter()
  const add = useCart((s) => s.add)
  const setDrawer = useCart((s) => s.setDrawer)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const soldOut = product.stock <= 0
  const save = product.price - salePrice(product.price, product.discountPercentage)

  return (
    <div className="space-y-6">
      {save >= 1 && <p className="text-sm font-medium text-sale">You save {formatPrice(save * qty)}</p>}

      <div className="flex items-center gap-2 text-sm">
        <span className={product.stock > 10 ? "size-2 rounded-full bg-emerald-500" : "size-2 rounded-full bg-amber-500"} />
        {soldOut ? "Out of stock" : product.stock > 10 ? "In stock, ready to ship" : `Only ${product.stock} left — order soon`}
      </div>

      {!soldOut && (
        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper value={qty} max={product.stock} onChange={setQty} />
          <button
            onClick={() => {
              add(product, qty)
              setAdded(true)
              setTimeout(() => setAdded(false), 1800)
              toast.success(`Added ${qty} × ${product.title}`)
            }}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 font-medium text-white transition-transform active:scale-[0.98]"
          >
            {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
            {added ? "Added" : "Add to cart"}
          </button>
          <WishlistButton id={product.id} title={product.title} className="size-12 border border-line shadow-none" />
        </div>
      )}
      {!soldOut && (
        <button
          onClick={() => {
            add(product, qty)
            setDrawer(false)
            router.push("/checkout")
          }}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime font-semibold text-ink"
        >
          <Zap className="size-4" /> Buy now
        </button>
      )}

      <ul className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white text-sm">
        <li className="flex gap-3 p-4">
          <Truck className="size-5 shrink-0" />
          <div>
            <p className="font-medium">
              <DeliveryEstimate days={shippingDays(shipping)} range={shipping?.replace(/^Ships /, "") ?? "4–6 business days"} />
            </p>
            <p className="text-muted">{shipping ?? "Free standard shipping over $99"} · Express available at checkout</p>
          </div>
        </li>
        <li className="flex gap-3 p-4">
          <Undo2 className="size-5 shrink-0" />
          <p>
            <span className="font-medium">{returns ?? "30 days return policy"}</span>
          </p>
        </li>
        <li className="flex gap-3 p-4">
          <ShieldCheck className="size-5 shrink-0" />
          <p className="font-medium">{warranty ?? "1 year warranty"}</p>
        </li>
      </ul>
    </div>
  )
}
