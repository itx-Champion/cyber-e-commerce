"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, SearchX, SlidersHorizontal, Star, X } from "lucide-react"
import type { ProductSummary } from "@/lib/products"
import { CATEGORIES, categoryLabel } from "@/lib/categories"
import { applyFilters, filtersFromParams, SORTS } from "@/lib/catalog-filter"
import { salePrice } from "@/lib/pricing"
import { ProductCard } from "../product-card"
import { cn } from "../ui"

function useQueryState() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const update = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString())
    mutate(next)
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }
  return { params, update }
}

function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line py-5">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-sm font-semibold" aria-expanded={open}>
        {title}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Check({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count: number }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 rounded accent-ink" />
      <span className="flex-1">{label}</span>
      <span className="text-xs text-muted tabular-nums">{count}</span>
    </label>
  )
}

function Filters({ products }: { products: ProductSummary[] }) {
  const { params, update } = useQueryState()
  const f = filtersFromParams(params)
  const brands = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of products) if (p.brand) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [products])
  const [showAllBrands, setShowAllBrands] = useState(false)

  const toggle = (key: "category" | "brand", value: string) =>
    update((p) => {
      const current = p.getAll(key).flatMap((v) => v.split(","))
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      p.delete(key)
      next.forEach((v) => p.append(key, v))
    })

  const setNumber = (key: string, value: string) =>
    update((p) => {
      if (value === "") p.delete(key)
      else p.set(key, value)
    })

  return (
    <div>
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <Check
            key={c.slug}
            label={c.label}
            checked={f.categories?.includes(c.slug) ?? false}
            onChange={() => toggle("category", c.slug)}
            count={products.filter((p) => p.category === c.slug).length}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Brand">
        {(showAllBrands ? brands : brands.slice(0, 7)).map(([b, n]) => (
          <Check key={b} label={b} checked={f.brands?.includes(b) ?? false} onChange={() => toggle("brand", b)} count={n} />
        ))}
        {brands.length > 7 && (
          <button onClick={() => setShowAllBrands((s) => !s)} className="mt-2 text-sm font-medium underline underline-offset-4">
            {showAllBrands ? "Show fewer" : `Show all ${brands.length}`}
          </button>
        )}
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="flex items-center gap-2">
          {(["min", "max"] as const).map((k) => (
            <label key={k} className="flex flex-1 items-center gap-1 rounded-xl border border-line bg-white px-3 py-2 text-sm">
              <span className="text-muted">$</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={k === "min" ? "Min" : "Max"}
                aria-label={k === "min" ? "Minimum price" : "Maximum price"}
                defaultValue={params.get(k) ?? ""}
                onBlur={(e) => setNumber(k, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setNumber(k, e.currentTarget.value)}
                className="w-full bg-transparent outline-none"
              />
            </label>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["Under $100", "", "100"],
            ["$100–$500", "100", "500"],
            ["$500+", "500", ""],
          ].map(([label, min, max]) => (
            <button
              key={label}
              onClick={() =>
                update((p) => {
                  if (min) p.set("min", min)
                  else p.delete("min")
                  if (max) p.set("max", max)
                  else p.delete("max")
                })
              }
              className="rounded-full border border-line bg-white px-3 py-1 text-xs hover:border-ink"
            >
              {label}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Rating">
        {[4, 3].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
            <input
              type="radio"
              name="rating"
              checked={f.minRating === r}
              onChange={() => setNumber("rating", String(r))}
              className="size-4 accent-ink"
            />
            <span className="flex items-center gap-1">
              {r}+ <Star className="size-3.5 fill-ink" />
            </span>
          </label>
        ))}
        {f.minRating && (
          <button onClick={() => setNumber("rating", "")} className="mt-1 text-xs underline">
            Any rating
          </button>
        )}
      </FilterGroup>
      <div className="py-5">
        <label className="flex cursor-pointer items-center justify-between text-sm font-semibold">
          In stock only
          <input
            type="checkbox"
            checked={f.inStock ?? false}
            onChange={() => update((p) => (p.get("stock") === "1" ? p.delete("stock") : p.set("stock", "1")))}
            className="size-4 accent-ink"
          />
        </label>
      </div>
    </div>
  )
}

export function Catalog({ products }: { products: ProductSummary[] }) {
  const { params, update } = useQueryState()
  const f = filtersFromParams(params)
  const results = useMemo(() => applyFilters(products, f), [products, f])
  const [panelOpen, setPanelOpen] = useState(false)

  const title = f.q
    ? `Results for “${f.q}”`
    : f.categories?.length === 1
      ? categoryLabel(f.categories[0])
      : f.sort === "discount"
        ? "Deals"
        : "All products"

  const chips: { label: string; clear: (p: URLSearchParams) => void }[] = [
    ...(f.q ? [{ label: `“${f.q}”`, clear: (p: URLSearchParams) => p.delete("q") }] : []),
    ...(f.categories ?? []).map((c) => ({
      label: categoryLabel(c),
      clear: (p: URLSearchParams) => {
        const rest = p.getAll("category").flatMap((v) => v.split(",")).filter((v) => v !== c)
        p.delete("category")
        rest.forEach((v) => p.append("category", v))
      },
    })),
    ...(f.brands ?? []).map((b) => ({
      label: b,
      clear: (p: URLSearchParams) => {
        const rest = p.getAll("brand").flatMap((v) => v.split(",")).filter((v) => v !== b)
        p.delete("brand")
        rest.forEach((v) => p.append("brand", v))
      },
    })),
    ...(f.minPrice !== undefined || f.maxPrice !== undefined
      ? [
          {
            label: `$${f.minPrice ?? 0}–${f.maxPrice !== undefined ? `$${f.maxPrice}` : "any"}`,
            clear: (p: URLSearchParams) => {
              p.delete("min")
              p.delete("max")
            },
          },
        ]
      : []),
    ...(f.minRating ? [{ label: `${f.minRating}+ stars`, clear: (p: URLSearchParams) => p.delete("rating") }] : []),
    ...(f.inStock ? [{ label: "In stock", clear: (p: URLSearchParams) => p.delete("stock") }] : []),
  ]

  const priceRange = results.length
    ? [Math.min(...results.map((p) => salePrice(p.price, p.discountPercentage))), Math.max(...results.map((p) => salePrice(p.price, p.discountPercentage)))]
    : null

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">Shop</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">
            {results.length} {results.length === 1 ? "product" : "products"}
            {priceRange && ` · $${Math.floor(priceRange[0])}–$${Math.ceil(priceRange[1])}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPanelOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filters {chips.length > 0 && `(${chips.length})`}
          </button>
          <label className="relative">
            <span className="sr-only">Sort by</span>
            <select
              value={f.sort}
              onChange={(e) => update((p) => (e.target.value === "featured" ? p.delete("sort") : p.set("sort", e.target.value)))}
              className="h-10 appearance-none rounded-full border border-line bg-white pr-10 pl-4 text-sm outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-3 right-3.5 size-4" />
          </label>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-5">
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={() => update(c.clear)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white"
            >
              {c.label} <X className="size-3" />
            </button>
          ))}
          <button onClick={() => update((p) => [...p.keys()].forEach((k) => k !== "sort" && p.delete(k)))} className="text-xs underline">
            Clear all
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-10 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Filters products={products} />
          </div>
        </aside>

        {results.length === 0 ? (
          <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line py-24 text-center">
            <SearchX className="size-10 text-muted" />
            <p className="mt-4 text-lg font-medium">No products match these filters</p>
            <button onClick={() => update((p) => [...p.keys()].forEach((k) => p.delete(k)))} className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={p} priority={i < 6} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPanelOpen(false)} className="fixed inset-0 z-50 bg-ink/40 lg:hidden" />
            <motion.div
              role="dialog"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85svh] overflow-y-auto rounded-t-[2rem] bg-paper px-6 pb-8 lg:hidden"
            >
              <div className="sticky top-0 flex items-center justify-between bg-paper py-5">
                <p className="text-lg font-semibold">Filters</p>
                <button onClick={() => setPanelOpen(false)} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
                  Show {results.length}
                </button>
              </div>
              <Filters products={products} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
