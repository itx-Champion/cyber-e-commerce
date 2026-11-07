import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { getCatalog, toSummary } from "@/lib/products"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchDialog } from "@/components/search-dialog"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Cyber — Phones, laptops & accessories", template: "%s · Cyber" },
  description: "Shop the latest smartphones, laptops, tablets and accessories with fast delivery, easy returns and members-only deals.",
  openGraph: { type: "website", siteName: "Cyber" },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = { themeColor: "#0b0b0c" }

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const products = (await getCatalog()).map(toSummary)

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Providers products={products}>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchDialog />
        </Providers>
      </body>
    </html>
  )
}
