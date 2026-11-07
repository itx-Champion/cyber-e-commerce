"use client"

import { useSyncExternalStore } from "react"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { ProductSummary } from "./products"
import type { ShippingMethodId } from "./pricing"

export type CartItem = Pick<ProductSummary, "id" | "title" | "price" | "discountPercentage" | "thumbnail" | "stock" | "brand"> & {
  quantity: number
}

type CartState = {
  items: CartItem[]
  promo: string | null
  drawerOpen: boolean
  add: (product: ProductSummary, quantity?: number) => void
  setQuantity: (id: number, quantity: number) => void
  remove: (id: number) => void
  clear: () => void
  applyPromo: (code: string | null) => void
  setDrawer: (open: boolean) => void
}

const clamp = (n: number, max: number) => Math.max(1, Math.min(n, Math.max(1, max)))

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      promo: null,
      drawerOpen: false,
      add: (product, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === product.id)
          const items = existing
            ? s.items.map((i) => (i.id === product.id ? { ...i, quantity: clamp(i.quantity + quantity, i.stock) } : i))
            : [
                ...s.items,
                {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  discountPercentage: product.discountPercentage,
                  thumbnail: product.thumbnail,
                  stock: product.stock,
                  brand: product.brand,
                  quantity: clamp(quantity, product.stock),
                },
              ]
          return { items, drawerOpen: true }
        }),
      setQuantity: (id, quantity) =>
        set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, quantity: clamp(quantity, i.stock) } : i)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [], promo: null }),
      applyPromo: (promo) => set({ promo }),
      setDrawer: (drawerOpen) => set({ drawerOpen }),
    }),
    {
      name: "cyber-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, promo: s.promo }),
      skipHydration: true,
    }
  )
)

type WishlistState = { ids: number[]; toggle: (id: number) => void; has: (id: number) => boolean }

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [id, ...s.ids] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "cyber-wishlist", storage: createJSONStorage(() => localStorage), skipHydration: true }
  )
)

export type Address = {
  fullName: string
  email: string
  phone: string
  street: string
  city: string
  postalCode: string
  country: string
}

export type Order = {
  id: string
  createdAt: number
  items: CartItem[]
  address: Address
  shipping: ShippingMethodId
  payment: "card" | "cod"
  total: number
}

type AccountState = {
  user: { name: string; email: string } | null
  address: Address | null
  orders: Order[]
  signIn: (user: { name: string; email: string }) => void
  signOut: () => void
  saveAddress: (address: Address) => void
  addOrder: (order: Omit<Order, "createdAt">) => void
}

export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      user: null,
      address: null,
      orders: [],
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
      saveAddress: (address) => set({ address }),
      addOrder: (order) => set((s) => ({ orders: [{ ...order, createdAt: Date.now() }, ...s.orders] })),
    }),
    { name: "cyber-account", storage: createJSONStorage(() => localStorage), skipHydration: true }
  )
)

const persisted = [useCart, useWishlist, useAccount]

/** Rehydrate every persisted store once on the client (after first paint, so SSR markup matches). */
export function rehydrateStores() {
  persisted.forEach((s) => void s.persist.rehydrate())
}

function subscribeHydration(onChange: () => void) {
  const unsubs = persisted.map((s) => s.persist.onFinishHydration(onChange))
  return () => unsubs.forEach((u) => u())
}

/** True once persisted state is loaded — gate counts and saved data behind it to avoid flicker. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeHydration,
    () => persisted.every((s) => s.persist.hasHydrated()),
    () => false
  )
}
