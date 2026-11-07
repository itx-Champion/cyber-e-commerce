import { Suspense } from "react"
import type { Metadata } from "next"
import { AccountView } from "./account-view"

export const metadata: Metadata = { title: "Account", robots: { index: false } }

export default function AccountPage() {
  return (
    <div className="container-x py-12">
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <AccountView />
      </Suspense>
    </div>
  )
}
