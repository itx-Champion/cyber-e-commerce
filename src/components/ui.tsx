import Link from "next/link"
import { Star } from "lucide-react"
import { formatPrice, salePrice } from "@/lib/pricing"

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Cyber home" className={cn("group inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "relative flex size-8 items-center justify-center rounded-xl font-mono text-sm font-bold transition-transform group-hover:rotate-12",
          inverted ? "bg-lime text-ink" : "bg-ink text-lime"
        )}
      >
        C/
      </span>
      <span className={cn("text-xl font-semibold tracking-tight", inverted ? "text-white" : "text-ink")}>cyber</span>
    </Link>
  )
}

export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm", className)} aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <span className="flex">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, value - i))
          return (
            <span key={i} className="relative">
              <Star className="size-3.5 text-line" fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="size-3.5 text-ink" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          )
        })}
      </span>
      <span className="font-medium tabular-nums">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
    </span>
  )
}

export function Price({
  price,
  discountPercentage,
  size = "md",
}: {
  price: number
  discountPercentage: number
  size?: "md" | "lg"
}) {
  const sale = salePrice(price, discountPercentage)
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={cn("font-semibold tracking-tight tabular-nums", size === "lg" ? "text-3xl" : "text-lg")}>
        {formatPrice(sale)}
      </span>
      {discountPercentage >= 1 && (
        <span className={cn("text-muted line-through tabular-nums", size === "lg" ? "text-lg" : "text-sm")}>{formatPrice(price)}</span>
      )}
    </span>
  )
}

export function DiscountBadge({ value, className }: { value: number; className?: string }) {
  if (value < 1) return null
  return (
    <span className={cn("rounded-full bg-sale px-2 py-0.5 text-xs font-semibold text-white tabular-nums", className)}>
      −{Math.round(value)}%
    </span>
  )
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 font-mono text-xs tracking-widest text-muted uppercase">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}
