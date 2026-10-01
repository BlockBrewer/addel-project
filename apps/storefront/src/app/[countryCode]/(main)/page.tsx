import { Metadata } from "next"

import HeroCarousel from "@modules/home/components/hero-carousel"
import CategoryTiles from "@modules/home/components/category-tiles"
import ValueProps from "@modules/home/components/value-props"
import Trending from "@modules/home/components/trending"
import ShopByCraft from "@modules/home/components/shop-by-craft"
import HowItWorks from "@modules/home/components/how-it-works"
import Reviews from "@modules/home/components/reviews"
import Newsletter from "@modules/home/components/newsletter"

export const metadata: Metadata = {
  title: "AquaCraft — Design. Download. Inspire.",
  description:
    "Discover thousands of digital designs, templates, SVGs, printables and more. Unlimited creativity. Instant download.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 pb-14 pt-4 sm:px-6 lg:px-10">
      <HeroCarousel />
      <CategoryTiles />
      <ValueProps />
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <Trending countryCode={countryCode} />
        <ShopByCraft />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        <HowItWorks />
        <Reviews />
        <Newsletter />
      </div>
    </div>
  )
}
