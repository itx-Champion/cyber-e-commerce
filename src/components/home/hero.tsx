"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowRight, BatteryFull, Camera, Cpu, RotateCcw, ShieldCheck, Truck } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const chips = [
  { icon: Camera, label: "Pro camera system", className: "left-[2%] top-[22%]", delay: 0.9 },
  { icon: Cpu, label: "Next-gen chip", className: "right-[0%] top-[12%]", delay: 1.05 },
  { icon: BatteryFull, label: "All-day battery", className: "right-[4%] bottom-[18%]", delay: 1.2 },
]

const perks = [
  { icon: Truck, label: "Free shipping over $99" },
  { icon: RotateCcw, label: "Easy returns" },
  { icon: ShieldCheck, label: "Warranty on every device" },
]

export function Hero() {
  // Pointer-driven tilt, smoothed with springs so it feels physical rather than twitchy.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 })
  const glowX = useTransform(mx, [-0.5, 0.5], ["35%", "65%"])

  return (
    <section
      className="relative overflow-hidden bg-ink text-white"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgb(212_255_63/0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />

      <div className="container-x relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-0">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3 pl-1 text-sm text-white/80"
          >
            <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-semibold text-ink">New season</span>
            Up to 20% off flagship phones
          </motion.p>

          <h1 className="mt-8 text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
            {["Tech that", "keeps up", "with you."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={i === 2 ? "block text-lime" : "block"}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.09 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/65"
          >
            The latest phones, laptops and accessories from the brands you trust — with fast delivery and no-drama returns.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="/products"
              className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-lime px-7 font-semibold text-ink"
            >
              <span className="shine pointer-events-none absolute inset-0" />
              Shop now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products?sort=discount"
              className="inline-flex h-13 items-center rounded-full border border-white/20 px-7 font-medium transition-colors hover:bg-white/10"
            >
              Explore deals
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60"
          >
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-lime" /> {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1200px]">
          <motion.div
            style={{ left: glowX }}
            className="absolute top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/25 blur-[90px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.25 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-[8%] animate-float">
              <Image
                src="/brand/iphone-hero.png"
                alt="Flagship smartphone"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 80vw"
                className="object-contain drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]"
              />
            </div>
          </motion.div>

          {chips.map(({ icon: Icon, label, className, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay }}
              className={`absolute hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm backdrop-blur-md sm:flex ${className}`}
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-lime text-ink">
                <Icon className="size-4" />
              </span>
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
