import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Headphones, Lock, RotateCcw, Truck } from "lucide-react"
import { CATEGORIES } from "@/lib/categories"
import type { ProductSummary } from "@/lib/products"
import { cn, SectionTitle } from "../ui"

export function BrandMarquee({ brands }: { brands: string[] }) {
  const row = [...brands, ...brands]
  return (
    <section aria-label="Brands we carry" className="border-b border-line bg-white py-6">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
          {row.map((b, i) => (
            <Link
              key={i}
              href={`/products?brand=${encodeURIComponent(b)}`}
              aria-hidden={i >= brands.length}
              tabIndex={i >= brands.length ? -1 : undefined}
              className="text-2xl font-semibold tracking-tight whitespace-nowrap text-ink/25 transition-colors hover:text-ink"
            >
              {b}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CategoryBento({ products }: { products: ProductSummary[] }) {
  const tiles = CATEGORIES.map((c) => {
    const items = products.filter((p) => p.category === c.slug)
    const hero = [...items].sort((a, b) => b.rating - a.rating)[0]
    return { ...c, count: items.length, image: hero?.thumbnail }
  })

  return (
    <section className="container-x py-20">
      <SectionTitle eyebrow="Browse" title="Shop by category" />
      <div className="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-4">
        {tiles.map((t, i) => (
          <Link
            key={t.slug}
            href={`/products?category=${t.slug}`}
            className={cn(
              "group relative overflow-hidden rounded-[var(--radius-card)] p-6 transition-transform duration-500 hover:-translate-y-1",
              i === 0 ? "bg-ink text-white md:col-span-2 md:row-span-2" : i === 1 ? "bg-lime md:col-span-2" : "bg-white"
            )}
          >
            <div className="relative z-10 max-w-[60%]">
              <p className={cn("font-mono text-xs", i === 0 ? "text-white/50" : "text-ink/50")}>{t.count} products</p>
              <h3 className={cn("mt-2 font-semibold tracking-tight", i === 0 ? "text-4xl" : "text-2xl")}>{t.label}</h3>
              <p className={cn("mt-1 text-sm", i === 0 ? "text-white/60" : "text-ink/60")}>{t.blurb}</p>
            </div>
            <span
              className={cn(
                "absolute bottom-5 left-6 z-10 flex size-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45",
                i === 0 ? "bg-lime text-ink" : "bg-ink text-white"
              )}
            >
              <ArrowUpRight className="size-4" />
            </span>
            {t.image && (
              <Image
                src={t.image}
                alt=""
                width={i === 0 ? 420 : 220}
                height={i === 0 ? 420 : 220}
                className={cn(
                  "absolute object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3",
                  i === 0 ? "-right-6 -bottom-6 size-[70%]" : "-right-2 -bottom-2 size-[55%]"
                )}
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}

export function PromoBanners() {
  return (
    <section className="container-x grid gap-4 py-8 md:grid-cols-2">
      <Link
        href="/products?category=laptops"
        className="group relative flex min-h-[340px] overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-[#e9e9e4] to-white p-8"
      >
        <div className="relative z-10 max-w-[55%]">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">Laptops</p>
          <h3 className="mt-3 text-4xl font-semibold tracking-tight">Thin. Light. Seriously fast.</h3>
          <p className="mt-3 text-sm text-muted">Machines that boot in seconds and last all day.</p>
          <span className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-medium">
            Shop laptops <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
        <Image
          src="/brand/macbook.png"
          alt="Laptop"
          width={331}
          height={201}
          className="absolute right-[-8%] bottom-8 w-[62%] object-contain transition-transform duration-700 group-hover:-translate-x-3"
        />
      </Link>
      <Link
        href="/products?category=mobile-accessories"
        className="group relative flex min-h-[340px] overflow-hidden rounded-[var(--radius-card)] bg-ink p-8 text-white"
      >
        <div className="relative z-10 max-w-[55%]">
          <p className="font-mono text-xs tracking-widest text-lime uppercase">Audio & wearables</p>
          <h3 className="mt-3 text-4xl font-semibold tracking-tight">Hear more. Carry less.</h3>
          <p className="mt-3 text-sm text-white/60">Earbuds, watches and chargers that just work together.</p>
          <span className="mt-6 inline-flex items-center gap-2 border-b border-lime pb-0.5 text-sm font-medium">
            Shop accessories <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
        <Image
          src="/brand/watch-buds.png"
          alt="Earbuds and smartwatch"
          width={360}
          height={385}
          className="absolute right-[-4%] bottom-[-6%] w-[52%] object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
    </section>
  )
}

const perks = [
  { icon: Truck, title: "Fast, free delivery", body: "Free standard shipping on orders over $99, next-day available." },
  { icon: RotateCcw, title: "Easy returns", body: "Changed your mind? Return eligible items, no questions asked." },
  { icon: Lock, title: "Secure checkout", body: "Encrypted payments and buyer protection on every order." },
  { icon: Headphones, title: "Real human support", body: "Tech experts on chat seven days a week." },
]

export function Perks() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-lime">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
