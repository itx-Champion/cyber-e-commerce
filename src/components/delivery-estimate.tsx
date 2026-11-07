"use client"

import { useSyncExternalStore } from "react"
import { deliveryDate } from "@/lib/pricing"

const noop = () => () => {}

/**
 * Delivery dates depend on today's date, so they're computed in the browser.
 * Prerendered HTML shows a generic range that's replaced on hydration.
 */
export function DeliveryEstimate({ days, range }: { days: number; range: string }) {
  const date = useSyncExternalStore(noop, () => deliveryDate(days), () => null)
  return <>{date ? `Get it by ${date}` : `Get it in ${range}`}</>
}
