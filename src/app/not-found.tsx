import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">This page is out of stock.</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for moved or never existed.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-ink px-6 py-3 font-medium text-white">
          Go home
        </Link>
        <Link href="/products" className="rounded-full border border-ink px-6 py-3 font-medium">
          Shop all
        </Link>
      </div>
    </div>
  )
}
