"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronLeft, ChevronRight } from "../icons"
import { useCallback, useEffect, useState } from "react"

// Placeholder artwork cropped from the design mockups. Replace the files in
// public/aquacraft/ with real hero art (keep the names, or edit this list).
const SLIDES = [
  { src: "/aquacraft/hero-1.jpg", alt: "Teal tumbler, framed print, mug and notebook mockups" },
  { src: "/aquacraft/hero-2.jpg", alt: "Blue tumbler, framed print, mug and notebook mockups" },
  { src: "/aquacraft/hero-1.jpg", alt: "Teal mockups" },
  { src: "/aquacraft/hero-2.jpg", alt: "Blue mockups" },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  )

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused, go])

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aqua-mist via-aqua-light/60 to-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      data-testid="hero-carousel"
    >
      <div className="relative grid min-h-[360px] items-center lg:min-h-[690px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Copy */}
        <div className="relative z-10 px-8 pb-6 pt-12 sm:px-12 lg:pl-[8%] lg:pr-0 lg:pt-0">
          <h1 className="font-serif text-5xl leading-[1.05] text-aqua-navy sm:text-6xl lg:text-[76px]">
            Create More.
            <span className="block text-aqua">Inspire More.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-aqua-navy">
            Discover thousands of digital designs, templates, SVGs, printables,
            and more.
            <br />
            Unlimited creativity. Instant download.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LocalizedClientLink
              href="/store"
              className="rounded-md bg-aqua px-8 py-4 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-aqua-dark"
            >
              Explore Designs
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/membership"
              className="rounded-md border border-aqua bg-white px-8 py-4 text-[15px] font-semibold text-aqua-navy transition-colors hover:bg-aqua-mist"
            >
              Join Membership
            </LocalizedClientLink>
          </div>
        </div>

        {/* Art */}
        <div className="relative h-[280px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
          {SLIDES.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.alt}
              aria-hidden={i !== index}
              className={`absolute inset-0 h-full w-full object-cover object-left transition-opacity duration-700 [mask-image:linear-gradient(to_right,transparent,black_14%)] ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-5 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-aqua-navy shadow-md transition-colors hover:bg-aqua-mist"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-5 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-aqua-navy shadow-md transition-colors hover:bg-aqua-mist"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-5 w-5 rounded-full border-2 border-aqua transition-colors ${
              i === index ? "bg-aqua" : "bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
