import { z } from "zod"

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Enter a valid phone number"),
  street: z.string().trim().min(4, "Enter your street address"),
  city: z.string().trim().min(2, "Enter your city"),
  postalCode: z.string().trim().regex(/^[A-Za-z0-9 -]{3,10}$/, "Enter a valid postal code"),
  country: z.string().trim().min(2, "Choose a country"),
})

/** Luhn checksum — catches most mistyped card numbers before they reach a payment provider. */
export function luhn(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, "")
  if (digits.length < 12 || digits.length > 19) return false
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

export function expiryValid(value: string, now = new Date()) {
  const m = value.match(/^(\d{2})\s*\/\s*(\d{2})$/)
  if (!m) return false
  const month = Number(m[1])
  const year = 2000 + Number(m[2])
  if (month < 1 || month > 12) return false
  const endOfMonth = new Date(year, month, 0, 23, 59, 59)
  return endOfMonth >= now
}

export const cardSchema = z.object({
  name: z.string().trim().min(2, "Enter the name on the card"),
  number: z.string().refine(luhn, "Card number isn't valid"),
  expiry: z.string().refine((v) => expiryValid(v), "Use a future date in MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
})

export const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ")

export const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

export function cardBrand(number: string) {
  const d = number.replace(/\D/g, "")
  if (/^4/.test(d)) return "Visa"
  if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard"
  if (/^3[47]/.test(d)) return "Amex"
  return null
}

export function orderId() {
  return `CY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

/** Flattens zod issues to { field: message } for inline form errors. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0])
    out[key] ??= issue.message
  }
  return out
}
