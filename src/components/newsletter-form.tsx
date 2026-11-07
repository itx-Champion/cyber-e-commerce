"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

const email = z.email()

export function NewsletterForm() {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (!email.safeParse(value.trim()).success) {
          setError("Enter a valid email address.")
          return
        }
        setError(null)
        setValue("")
        toast.success("You're on the list", { description: "Watch your inbox for the next drop." })
      }}
      className="mt-4"
    >
      <div className="flex rounded-full bg-white/10 p-1 focus-within:ring-2 focus-within:ring-lime">
        <input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          aria-invalid={Boolean(error)}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
        />
        <button type="submit" aria-label="Subscribe" className="flex size-10 items-center justify-center rounded-full bg-lime text-ink">
          <ArrowRight className="size-4" />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-sale">{error}</p>}
    </form>
  )
}
