export const CATEGORIES = [
  { slug: "smartphones", label: "Smartphones", blurb: "Flagship cameras, all-day battery" },
  { slug: "laptops", label: "Laptops", blurb: "Power for work and play" },
  { slug: "tablets", label: "Tablets", blurb: "Big screens, light bodies" },
  { slug: "mobile-accessories", label: "Accessories", blurb: "Audio, charging and more" },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]["slug"]

export const categoryLabel = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.label ?? slug
