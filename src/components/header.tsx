"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { useAccount, useCart, useHydrated, useWishlist } from "@/lib/store"
import { cn, Logo } from "./ui"
import { useUi } from "./providers"

const nav = [
  { href: "/products", label: "Shop all" },
  { href: "/products?category=smartphones", label: "Phones" },
  { href: "/products?category=laptops", label: "Laptops" },
  { href: "/products?category=mobile-accessories", label: "Accessories" },
  { href: "/products?sort=discount", label: "Deals" },
]

function CountBadge({ value }: { value: number }) {
  return (
    <AnimatePresence>
      {value > 0 && (
        <motion.span
          key={value}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-lime px-1 text-[10px] font-bold text-ink"
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const pathname = usePathname()
  const hydrated = useHydrated()
  const { setSearchOpen } = useUi()
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const setDrawer = useCart((s) => s.setDrawer)
  const wishCount = useWishlist((s) => s.ids.length)
  const user = useAccount((s) => s.user)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dark = pathname === "/" && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const iconBtn = cn(
    "relative flex size-10 items-center justify-center rounded-full transition-colors",
    dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        dark ? "border-b border-transparent bg-ink" : "border-b border-line bg-paper/80 backdrop-blur-xl"
      )}
    >
      <div className="container-x flex h-16 items-center gap-6">
        <Logo inverted={dark} />

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition-colors",
                dark ? "text-white/70 hover:text-white" : "text-muted hover:text-ink"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              "hidden h-10 items-center gap-2 rounded-full px-4 text-sm transition-colors md:flex",
              dark ? "bg-white/10 text-white/70 hover:bg-white/15" : "bg-ink/5 text-muted hover:bg-ink/10"
            )}
          >
            <Search className="size-4" />
            Search products
            <kbd className="ml-6 rounded-md border border-current/20 px-1.5 font-mono text-[10px] opacity-70">Ctrl K</kbd>
          </button>
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className={cn(iconBtn, "md:hidden")}>
            <Search className="size-5" />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className={iconBtn}>
            <Heart className="size-5" />
            <CountBadge value={hydrated ? wishCount : 0} />
          </Link>
          <Link href="/account" aria-label={user ? `Account: ${user.name}` : "Sign in"} className={iconBtn}>
            <User className="size-5" />
            {hydrated && user && <span className="absolute right-2 bottom-2 size-2 rounded-full bg-lime ring-2 ring-current/0" />}
          </Link>
          <button onClick={() => setDrawer(true)} aria-label="Open cart" className={iconBtn}>
            <ShoppingBag className="size-5" />
            <CountBadge value={hydrated ? cartCount : 0} />
          </button>
          <button onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" className={cn(iconBtn, "lg:hidden")}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={cn("overflow-hidden border-t lg:hidden", dark ? "border-white/10 bg-ink" : "border-line bg-paper")}
          >
            <div className="container-x flex flex-col py-3">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn("py-3 text-lg", dark ? "text-white" : "text-ink")}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
