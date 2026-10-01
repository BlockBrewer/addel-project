import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import ValueProps from "@modules/home/components/value-props"
import Featured from "@modules/home/components/featured"
import Oils from "@modules/home/components/oils"
import Story from "@modules/home/components/story"
import Certifications from "@modules/home/components/certifications"
import Reviews from "@modules/home/components/reviews"
import Newsletter from "@modules/home/components/newsletter"

export const metadata: Metadata = {
  title: "Fitrat Origins — Pure Foods. Honest Origins.",
  description:
    "Premium natural foods sourced with integrity and crafted with care for families who value purity, quality, and authentic taste. Delivery across Pakistan.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  return (
    <>
      <Hero />
      <ValueProps />
      <Featured countryCode={countryCode} />
      <Oils />
      <Story />
      <Certifications />
      <Reviews />
      <Newsletter />
    </>
  )
}
