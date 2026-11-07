"use client"

import { createContext, use, useEffect, useState, type ReactNode } from "react"
import { Toaster } from "sonner"
import { rehydrateStores } from "@/lib/store"
import type { ProductSummary } from "@/lib/products"

type UiContext = {
  products: ProductSummary[]
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

const Ctx = createContext<UiContext | null>(null)

export function Providers({ products, children }: { products: ProductSummary[]; children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    rehydrateStores()
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <Ctx value={{ products, searchOpen, setSearchOpen }}>
      {children}
      <Toaster position="bottom-center" toastOptions={{ className: "!rounded-2xl !font-sans" }} />
    </Ctx>
  )
}

export function useUi() {
  const ctx = use(Ctx)
  if (!ctx) throw new Error("useUi must be used inside <Providers>")
  return ctx
}
