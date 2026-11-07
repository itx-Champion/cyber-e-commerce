import type { Metadata } from "next"
import { CheckoutFlow } from "./checkout-flow"

export const metadata: Metadata = { title: "Checkout", robots: { index: false } }

export default function CheckoutPage() {
  return (
    <div className="container-x py-12">
      <h1 className="mb-10 text-4xl font-semibold tracking-tight">Checkout</h1>
      <CheckoutFlow />
    </div>
  )
}
