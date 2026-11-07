import Link from "next/link"
import { CATEGORIES } from "@/lib/categories"
import { Logo } from "./ui"
import { NewsletterForm } from "./newsletter-form"

const help = [
  { href: "/account", label: "Your orders" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
  { href: "/products?sort=discount", label: "Deals" },
]

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div className="max-w-xs">
          <Logo inverted />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Premium phones, laptops and accessories — curated, fairly priced and delivered fast.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Shop</p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="hover:text-white">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Help</p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {help.map((h) => (
              <li key={h.label}>
                <Link href={h.href} className="hover:text-white">
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Get the drop first</p>
          <p className="mt-2 text-sm text-white/60">New releases and members-only deals, once a week.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Cyber. Demo storefront — no real orders or payments are processed.</p>
          <p>Product data from DummyJSON. Built with Next.js.</p>
        </div>
      </div>
    </footer>
  )
}
