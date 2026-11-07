import { ImageResponse } from "next/og"

export const alt = "Cyber — Phones, laptops & accessories"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 80% 40%, rgba(212,255,63,0.25), #0b0b0c 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 700 }}>
          <div style={{ display: "flex", width: 56, height: 56, borderRadius: 14, background: "#d4ff3f", color: "#0b0b0c", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
            C/
          </div>
          cyber
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Tech that keeps up</span>
          <span style={{ color: "#d4ff3f" }}>with you.</span>
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.65)" }}>Phones · Laptops · Tablets · Accessories</div>
      </div>
    ),
    size
  )
}
