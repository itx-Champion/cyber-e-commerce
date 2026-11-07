"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Banknote, Check, CreditCard, Loader2, Lock } from "lucide-react"
import { toast } from "sonner"
import { addressSchema, cardBrand, cardSchema, fieldErrors, formatCardNumber, formatExpiry, orderId } from "@/lib/checkout"
import { computeTotals, deliveryDate, formatPrice, salePrice, SHIPPING_METHODS, type ShippingMethodId } from "@/lib/pricing"
import { useAccount, useCart, useHydrated, type Address } from "@/lib/store"
import { OrderSummary } from "@/components/order-summary"
import { cn } from "@/components/ui"

const steps = ["Address", "Shipping", "Payment"] as const
const countries = ["United States", "United Kingdom", "Canada", "Germany", "Pakistan", "United Arab Emirates", "Australia"]

function Field({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        {...props}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-12 w-full rounded-xl border bg-white px-4 outline-none transition-colors focus:border-ink",
          error ? "border-sale" : "border-line"
        )}
      />
      {error && <span className="mt-1 block text-xs text-sale">{error}</span>}
    </label>
  )
}

/** Waits for saved cart and account data before rendering the form, so prefilled values are correct. */
export function CheckoutFlow() {
  const hydrated = useHydrated()
  const count = useCart((s) => s.items.length)
  if (!hydrated) return <div className="min-h-[60vh]" />
  if (count === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold">Nothing to check out</h1>
        <Link href="/products" className="mt-6 rounded-full bg-ink px-6 py-3 font-medium text-white">
          Browse products
        </Link>
      </div>
    )
  }
  return <CheckoutForm />
}

function CheckoutForm() {
  const router = useRouter()
  const { items, promo, clear } = useCart()
  const account = useAccount()
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState<Address>(
    () =>
      account.address ?? {
        fullName: account.user?.name ?? "",
        email: account.user?.email ?? "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
        country: "United States",
      }
  )
  const [shipping, setShipping] = useState<ShippingMethodId>("standard")
  const [payment, setPayment] = useState<"card" | "cod">("card")
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [placing, setPlacing] = useState(false)
  // Clear a field's error as soon as the user edits it.
  const clearOnEdit = (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name
    if (name && errors[name]) setErrors((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => k !== name)))
  }

  const totals = computeTotals(items, { shipping, promo: promo ?? undefined })

  const submitAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const result = addressSchema.safeParse(address)
    if (!result.success) return setErrors(fieldErrors(result.error))
    setErrors({})
    account.saveAddress(result.data)
    setStep(1)
  }

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (payment === "card") {
      const result = cardSchema.safeParse(card)
      if (!result.success) return setErrors(fieldErrors(result.error))
    }
    setErrors({})
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1200)) // stand-in for a payment provider round-trip
    const id = orderId()
    account.addOrder({ id, items, address, shipping, payment, total: totals.total })
    clear()
    toast.success("Order placed", { description: `Order ${id} is confirmed.` })
    router.push(`/checkout/success?order=${id}`)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <ol className="mb-10 flex items-center gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-3">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  i < step ? "bg-ink text-lime" : i === step ? "bg-lime text-ink" : "bg-line text-muted"
                )}
                aria-current={i === step ? "step" : undefined}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </button>
              <span className={cn("text-sm font-medium", i > step && "text-muted")}>{s}</span>
              {i < steps.length - 1 && <span className={cn("h-px flex-1", i < step ? "bg-ink" : "bg-line")} />}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <form onSubmit={submitAddress} onChange={clearOnEdit} noValidate className="grid gap-4 sm:grid-cols-2">
                {!account.user && (
                  <p className="text-sm text-muted sm:col-span-2">
                    Checking out as a guest.{" "}
                    <Link href="/account?next=/checkout" className="font-medium text-ink underline">
                      Sign in
                    </Link>{" "}
                    to track orders in your account.
                  </p>
                )}
                <Field label="Full name" autoComplete="name" name="fullName" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} error={errors.fullName} className="sm:col-span-2" />
                <Field label="Email" type="email" autoComplete="email" name="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} error={errors.email} />
                <Field label="Phone" type="tel" autoComplete="tel" name="phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} error={errors.phone} />
                <Field label="Street address" autoComplete="street-address" name="street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} error={errors.street} className="sm:col-span-2" />
                <Field label="City" autoComplete="address-level2" name="city" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} error={errors.city} />
                <Field label="Postal code" autoComplete="postal-code" name="postalCode" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} error={errors.postalCode} />
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium">Country</span>
                  <select
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    autoComplete="country-name"
                    className="h-12 w-full rounded-xl border border-line bg-white px-4 outline-none focus:border-ink"
                  >
                    {countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="mt-2 h-12 rounded-full bg-ink font-medium text-white sm:col-span-2">
                  Continue to shipping
                </button>
              </form>
            )}

            {step === 1 && (
              <div className="space-y-3">
                {SHIPPING_METHODS.map((m) => {
                  const price = computeTotals(items, { shipping: m.id, promo: promo ?? undefined }).shipping
                  return (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-[var(--radius-card)] border bg-white p-5 transition-colors",
                        shipping === m.id ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink/40"
                      )}
                    >
                      <input type="radio" name="shipping" checked={shipping === m.id} onChange={() => setShipping(m.id)} className="size-4 accent-ink" />
                      <div className="flex-1">
                        <p className="font-medium">{m.label}</p>
                        <p className="text-sm text-muted">
                          {m.detail} · arrives {deliveryDate(m.days)}
                        </p>
                      </div>
                      <span className="font-semibold tabular-nums">{price === 0 ? "Free" : formatPrice(price)}</span>
                    </label>
                  )
                })}
                <div className="rounded-[var(--radius-card)] bg-white p-5 text-sm">
                  <p className="font-medium">Shipping to</p>
                  <p className="mt-1 text-muted">
                    {address.fullName}, {address.street}, {address.city} {address.postalCode}, {address.country}
                  </p>
                  <button onClick={() => setStep(0)} className="mt-2 text-sm underline">
                    Edit address
                  </button>
                </div>
                <button onClick={() => setStep(2)} className="h-12 w-full rounded-full bg-ink font-medium text-white">
                  Continue to payment
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={placeOrder} onChange={clearOnEdit} noValidate className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["card", "Card", CreditCard],
                      ["cod", "Cash on delivery", Banknote],
                    ] as const
                  ).map(([id, label, Icon]) => (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setPayment(id)}
                      className={cn(
                        "flex items-center gap-3 rounded-[var(--radius-card)] border bg-white p-4 text-left font-medium transition-colors",
                        payment === id ? "border-ink ring-1 ring-ink" : "border-line"
                      )}
                    >
                      <Icon className="size-5" /> {label}
                    </button>
                  ))}
                </div>

                {payment === "card" ? (
                  <div className="grid gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 sm:grid-cols-2">
                    <p className="flex items-center gap-2 rounded-xl bg-lime/40 px-3 py-2 text-xs sm:col-span-2">
                      <Lock className="size-3.5" /> Demo store — use test card 4242 4242 4242 4242, any future date and any CVC.
                    </p>
                    <Field label="Name on card" autoComplete="cc-name" name="name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} error={errors.name} className="sm:col-span-2" />
                    <div className="relative sm:col-span-2">
                      <Field
                        label="Card number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="1234 1234 1234 1234"
                        name="number" value={card.number}
                        onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                        error={errors.number}
                      />
                      {cardBrand(card.number) && (
                        <span className="absolute top-10 right-3 rounded-md bg-ink px-2 py-0.5 text-xs font-semibold text-white">{cardBrand(card.number)}</span>
                      )}
                    </div>
                    <Field label="Expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" name="expiry" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} error={errors.expiry} />
                    <Field label="CVC" inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} name="cvc" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "") })} error={errors.cvc} />
                  </div>
                ) : (
                  <p className="rounded-[var(--radius-card)] border border-line bg-white p-5 text-sm text-muted">
                    Pay in cash when your order arrives. Please have the exact amount ready.
                  </p>
                )}

                <button type="submit" disabled={placing} className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-lime font-semibold text-ink disabled:opacity-70">
                  {placing ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
                  {placing ? "Placing order…" : `Place order · ${formatPrice(totals.total)}`}
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <ul className="space-y-3 rounded-[var(--radius-card)] border border-line bg-white p-5">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-paper">
                <Image src={i.thumbnail} alt="" fill sizes="56px" className="object-contain p-1.5" />
                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">{i.quantity}</span>
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">{i.title}</span>
              <span className="text-sm font-medium tabular-nums">{formatPrice(salePrice(i.price, i.discountPercentage) * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <OrderSummary shipping={shipping} />
      </div>
    </div>
  )
}
