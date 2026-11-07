import { describe, expect, it } from "vitest"
import { computeTotals, salePrice } from "./pricing"
import { cardBrand, expiryValid, formatCardNumber, formatExpiry, luhn } from "./checkout"
import { applyFilters, filtersFromParams, searchProducts } from "./catalog-filter"
import type { ProductSummary } from "./products"

const product = (over: Partial<ProductSummary>): ProductSummary => ({
  id: 1,
  title: "Phone",
  category: "smartphones",
  price: 100,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  brand: "Apple",
  thumbnail: "",
  images: [],
  ...over,
})

describe("pricing", () => {
  it("applies the product discount and rounds to cents", () => {
    expect(salePrice(199.99, 12.91)).toBe(174.17)
  })

  it("charges standard shipping under the free-shipping threshold", () => {
    const t = computeTotals([{ price: 50, discountPercentage: 0, quantity: 1 }])
    expect(t.shipping).toBe(9.99)
    expect(t.total).toBe(Math.round((50 + 9.99 + 50 * 0.08) * 100) / 100)
  })

  it("ships free over the threshold and charges for express", () => {
    const items = [{ price: 120, discountPercentage: 0, quantity: 1 }]
    expect(computeTotals(items).shipping).toBe(0)
    expect(computeTotals(items, { shipping: "express" }).shipping).toBe(14.99)
  })

  it("applies promo codes case-insensitively and ignores unknown codes", () => {
    const items = [{ price: 200, discountPercentage: 0, quantity: 2 }]
    expect(computeTotals(items, { promo: "cyber10" }).promo).toBe(40)
    expect(computeTotals(items, { promo: "NOPE" }).promo).toBe(0)
  })

  it("reports savings from product discounts", () => {
    const t = computeTotals([{ price: 100, discountPercentage: 25, quantity: 2 }])
    expect(t.list).toBe(200)
    expect(t.subtotal).toBe(150)
    expect(t.savings).toBe(50)
    expect(t.count).toBe(2)
  })

  it("returns zero shipping for an empty cart", () => {
    expect(computeTotals([]).total).toBe(0)
  })
})

describe("card validation", () => {
  it("accepts valid test numbers and rejects typos", () => {
    expect(luhn("4242 4242 4242 4242")).toBe(true)
    expect(luhn("4242 4242 4242 4241")).toBe(false)
    expect(luhn("1234")).toBe(false)
  })

  it("validates expiry dates against the current month", () => {
    const now = new Date(2026, 10, 15)
    expect(expiryValid("11/26", now)).toBe(true)
    expect(expiryValid("10/26", now)).toBe(false)
    expect(expiryValid("13/27", now)).toBe(false)
    expect(expiryValid("1127", now)).toBe(false)
  })

  it("formats inputs as the user types", () => {
    expect(formatCardNumber("4242424242424242")).toBe("4242 4242 4242 4242")
    expect(formatExpiry("1128")).toBe("11/28")
    expect(cardBrand("5555 5555")).toBe("Mastercard")
  })
})

describe("catalog filtering", () => {
  const products = [
    product({ id: 1, title: "iPhone 13 Pro", brand: "Apple", price: 1000, rating: 4.8 }),
    product({ id: 2, title: "Galaxy S10", brand: "Samsung", price: 700, rating: 4.1, discountPercentage: 30 }),
    product({ id: 3, title: "MacBook Pro 14", brand: "Apple", category: "laptops", price: 2000, rating: 4.5, stock: 0 }),
  ]

  it("matches every search word by prefix, ranking title hits first", () => {
    expect(searchProducts(products, "apple mac").map((p) => p.id)).toEqual([3])
    expect(searchProducts(products, "galax").map((p) => p.id)).toEqual([2])
    expect(searchProducts(products, "nokia")).toEqual([])
  })

  it("filters by category, brand, sale price, rating and stock", () => {
    expect(applyFilters(products, { categories: ["laptops"] }).map((p) => p.id)).toEqual([3])
    expect(applyFilters(products, { brands: ["Samsung"] }).map((p) => p.id)).toEqual([2])
    expect(applyFilters(products, { maxPrice: 500 }).map((p) => p.id)).toEqual([2]) // 700 − 30% = 490
    expect(applyFilters(products, { minRating: 4.5, inStock: true }).map((p) => p.id)).toEqual([1])
  })

  it("sorts by price and discount", () => {
    expect(applyFilters(products, { sort: "price-asc" }).map((p) => p.id)).toEqual([2, 1, 3])
    expect(applyFilters(products, { sort: "discount" })[0].id).toBe(2)
  })

  it("reads filters from the URL and ignores invalid values", () => {
    const f = filtersFromParams(new URLSearchParams("category=laptops&brand=Apple,Samsung&min=abc&max=900&sort=bogus&stock=1"))
    expect(f).toMatchObject({ categories: ["laptops"], brands: ["Apple", "Samsung"], minPrice: undefined, maxPrice: 900, sort: "featured", inStock: true })
  })
})

describe("shippingDays", () => {
  it("parses supplier shipping text into business days", async () => {
    const { shippingDays } = await import("./pricing")
    expect(shippingDays("Ships overnight")).toBe(1)
    expect(shippingDays("Ships in 3-5 business days")).toBe(5)
    expect(shippingDays("Ships in 2 weeks")).toBe(10)
    expect(shippingDays("Ships in 1 month")).toBe(22)
    expect(shippingDays(undefined)).toBe(6)
  })
})
