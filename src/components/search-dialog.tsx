"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, CornerDownLeft, Search } from "lucide-react"
import { categoryLabel } from "@/lib/categories"
import { searchProducts } from "@/lib/catalog-filter"
import { formatPrice, salePrice } from "@/lib/pricing"
import { useUi } from "./providers"
import { cn } from "./ui"

const popular = ["iPhone", "MacBook", "Samsung", "Headphones", "iPad"]

export function SearchDialog() {
  const router = useRouter()
  const { products, searchOpen, setSearchOpen } = useUi()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const results = useMemo(() => (query.trim() ? searchProducts(products, query).slice(0, 6) : []), [products, query])

  const close = () => {
    setSearchOpen(false)
    setQuery("")
    setActive(0)
  }
  const go = (href: string) => {
    close()
    router.push(href)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-label="Search products"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <label className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") close()
                  if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, results.length - 1))
                  if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0))
                  if (e.key === "Enter") {
                    const hit = results[active]
                    go(hit ? `/products/${hit.id}` : `/products?q=${encodeURIComponent(query.trim())}`)
                  }
                }}
                placeholder="Search phones, laptops, brands…"
                className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
              />
              <kbd className="rounded-md border border-line px-1.5 font-mono text-[10px] text-muted">ESC</kbd>
            </label>

            {!query.trim() ? (
              <div className="p-5">
                <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {popular.map((p) => (
                    <button key={p} onClick={() => setQuery(p)} className="rounded-full bg-ink/5 px-3.5 py-1.5 text-sm hover:bg-ink/10">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="p-8 text-center text-muted">No products match “{query}”.</p>
            ) : (
              <ul className="max-h-[60vh] overflow-y-auto p-2">
                {results.map((p, i) => (
                  <li key={p.id}>
                    <button
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(`/products/${p.id}`)}
                      className={cn("flex w-full items-center gap-4 rounded-2xl p-2 text-left", i === active && "bg-ink/5")}
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-paper">
                        <Image src={p.thumbnail} alt="" fill sizes="56px" className="object-contain p-1.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{p.title}</span>
                        <span className="text-sm text-muted">
                          {p.brand} · {categoryLabel(p.category)}
                        </span>
                      </span>
                      <span className="font-semibold tabular-nums">{formatPrice(salePrice(p.price, p.discountPercentage))}</span>
                      {i === active && <CornerDownLeft className="size-4 text-muted" />}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => go(`/products?q=${encodeURIComponent(query.trim())}`)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium hover:bg-ink/5"
                  >
                    See all results for “{query.trim()}” <ArrowRight className="size-4" />
                  </button>
                </li>
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
