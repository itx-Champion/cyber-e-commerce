export const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export const formatPrice = (value: number) => currency.format(value)

/** Price after the product's discount, rounded to cents. */
export const salePrice = (price: number, discountPercentage: number) =>
  Math.round(price * (1 - discountPercentage / 100) * 100) / 100

export type LineItem = { price: number; discountPercentage: number; quantity: number }

export const SHIPPING_METHODS = [
  { id: "standard", label: "Standard", detail: "4–6 business days", price: 0, days: 6 },
  { id: "express", label: "Express", detail: "2–3 business days", price: 14.99, days: 3 },
  { id: "next-day", label: "Next day", detail: "Order before 2pm", price: 29.99, days: 1 },
] as const

export type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"]

export const PROMO_CODES: Record<string, number> = { CYBER10: 0.1, WELCOME5: 0.05 }

export const FREE_SHIPPING_THRESHOLD = 99
export const TAX_RATE = 0.08

/** Order totals in one place so the cart, checkout and tests agree to the cent. */
export function computeTotals(items: LineItem[], options: { shipping?: ShippingMethodId; promo?: string } = {}) {
  const round = (n: number) => Math.round(n * 100) / 100
  const list = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const subtotal = items.reduce((s, i) => s + salePrice(i.price, i.discountPercentage) * i.quantity, 0)
  const savings = list - subtotal
  const promoRate = options.promo ? (PROMO_CODES[options.promo.toUpperCase()] ?? 0) : 0
  const promo = subtotal * promoRate
  const method = SHIPPING_METHODS.find((m) => m.id === (options.shipping ?? "standard"))!
  const shipping = items.length === 0 ? 0 : method.id === "standard" && subtotal < FREE_SHIPPING_THRESHOLD ? 9.99 : method.price
  const tax = (subtotal - promo) * TAX_RATE
  return {
    list: round(list),
    subtotal: round(subtotal),
    savings: round(savings),
    promo: round(promo),
    shipping: round(shipping),
    tax: round(tax),
    total: round(subtotal - promo + shipping + tax),
    count: items.reduce((s, i) => s + i.quantity, 0),
  }
}

/** Business-day delivery estimate, skipping weekends. */
export function deliveryDate(days: number, from = new Date()) {
  const d = new Date(from)
  let added = 0
  while (added < days) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) added++
  }
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

/** Turns supplier text like "Ships in 2 weeks" or "Ships in 3-5 business days" into business days. */
export function shippingDays(info?: string) {
  if (!info) return 6
  const text = info.toLowerCase()
  if (text.includes("overnight")) return 1
  const n = Number(text.match(/(\d+)(?:\s*-\s*(\d+))?/)?.[2] ?? text.match(/(\d+)/)?.[1] ?? 0)
  if (!n) return 6
  if (text.includes("month")) return n * 22
  if (text.includes("week")) return n * 5
  return n
}
