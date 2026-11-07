"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "../ui"

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="no-scrollbar flex gap-3 overflow-x-auto md:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={active === i}
            className={cn(
              "relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition-colors",
              active === i ? "border-ink" : "border-transparent hover:border-line"
            )}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
          </button>
        ))}
      </div>
      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-[2rem] bg-white"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
        }}
        onPointerLeave={() => setZoom(null)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${title} — image ${active + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain p-10 transition-transform duration-200"
              style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
