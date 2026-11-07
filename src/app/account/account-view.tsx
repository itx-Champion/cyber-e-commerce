"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { LogOut, Package } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { fieldErrors } from "@/lib/checkout"
import { formatPrice, SHIPPING_METHODS } from "@/lib/pricing"
import { useAccount, useHydrated } from "@/lib/store"
import { cn } from "@/components/ui"

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
})
const signInSchema = signUpSchema.pick({ email: true, password: true })

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })

function AuthForm() {
  const router = useRouter()
  const next = useSearchParams().get("next")
  const signIn = useAccount((s) => s.signIn)
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = (mode === "signup" ? signUpSchema : signInSchema).safeParse(form)
    if (!result.success) return setErrors(fieldErrors(result.error))
    const name = mode === "signup" ? form.name.trim() : form.email.split("@")[0]
    signIn({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email.trim().toLowerCase() })
    toast.success(mode === "signup" ? "Account created" : "Welcome back")
    if (next?.startsWith("/")) router.push(next)
  }

  const input = (key: keyof typeof form, label: string, type = "text", autoComplete?: string) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        aria-invalid={Boolean(errors[key])}
        className={cn("h-12 w-full rounded-xl border bg-white px-4 outline-none focus:border-ink", errors[key] ? "border-sale" : "border-line")}
      />
      {errors[key] && <span className="mt-1 block text-xs text-sale">{errors[key]}</span>}
    </label>
  )

  return (
    <div className="mx-auto max-w-md">
      <div className="flex rounded-full bg-white p-1">
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m)
              setErrors({})
            }}
            className={cn("flex-1 rounded-full py-2.5 text-sm font-medium transition-colors", mode === m ? "bg-ink text-white" : "text-muted")}
          >
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        {mode === "signup" && input("name", "Full name", "text", "name")}
        {input("email", "Email", "email", "email")}
        {input("password", "Password", "password", mode === "signup" ? "new-password" : "current-password")}
        <button type="submit" className="h-12 w-full rounded-full bg-ink font-medium text-white">
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <p className="text-center text-xs text-muted">Demo store: accounts are saved only in this browser.</p>
      </form>
    </div>
  )
}

export function AccountView() {
  const hydrated = useHydrated()
  const { user, orders, address, signOut } = useAccount()

  if (!hydrated) return <div className="min-h-[50vh]" />
  if (!user) {
    return (
      <>
        <h1 className="text-center text-4xl font-semibold tracking-tight">Your account</h1>
        <p className="mt-2 mb-10 text-center text-muted">Sign in to track orders and check out faster.</p>
        <AuthForm />
      </>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-[var(--radius-card)] bg-ink p-6 text-white">
          <span className="flex size-12 items-center justify-center rounded-full bg-lime text-lg font-semibold text-ink">{user.name.charAt(0)}</span>
          <p className="mt-4 text-xl font-semibold">{user.name}</p>
          <p className="text-sm text-white/60">{user.email}</p>
          <button onClick={() => signOut()} className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
        {address && (
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 text-sm">
            <p className="font-medium">Saved address</p>
            <p className="mt-2 text-muted">
              {address.fullName}
              <br />
              {address.street}
              <br />
              {address.city} {address.postalCode}, {address.country}
            </p>
          </div>
        )}
      </aside>

      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
        {orders.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line py-20 text-center">
            <Package className="size-10 text-muted" />
            <p className="mt-4 font-medium">No orders yet</p>
            <Link href="/products" className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((o) => (
              <li key={o.id} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4 text-sm">
                  <div>
                    <p className="font-mono font-semibold">{o.id}</p>
                    <p className="text-muted">
                      {dateFmt.format(o.createdAt)} · {SHIPPING_METHODS.find((m) => m.id === o.shipping)?.label} delivery
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-lime/50 px-2.5 py-1 text-xs font-medium">Processing</span>
                    <span className="font-semibold tabular-nums">{formatPrice(o.total)}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  {o.items.map((i) => (
                    <Link key={i.id} href={`/products/${i.id}`} className="relative size-14 overflow-hidden rounded-xl bg-paper" title={i.title}>
                      <Image src={i.thumbnail} alt={i.title} fill sizes="56px" className="object-contain p-1" />
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
