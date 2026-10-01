import { Metadata } from "next"
import { notFound } from "next/navigation"

const PAGES: Record<string, { title: string; body: string[] }> = {
  about: {
    title: "About Us",
    body: [
      "AquaCraft is a marketplace of digital designs — SVGs, Canva templates, printables, planners and more — for makers, small businesses and creative people everywhere.",
      "Our mission is simple: Design. Download. Inspire.",
    ],
  },
  "commercial-use": {
    title: "Commercial Use",
    body: [
      "Every AquaCraft purchase includes a license to use the designs on physical and digital products you sell, up to 500 units per design.",
      "You may not resell, share or redistribute the original files.",
    ],
  },
  license: {
    title: "License",
    body: [
      "Personal use: unlimited. Small-business commercial use: up to 500 units per design. Extended licenses are available on request.",
    ],
  },
  faq: {
    title: "FAQ",
    body: [
      "How do I get my files? After checkout your downloads appear on the order confirmation page and in My Account → Downloads.",
      "What software do I need? Our files work with Cricut, Silhouette, Canva, Photoshop and most design tools.",
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    body: ["We only collect the information needed to process your order and improve the store. We never sell your data."],
  },
  "refund-policy": {
    title: "Refund Policy",
    body: [
      "Because digital files cannot be returned, purchases are non-refundable once downloaded. If a file is damaged or not as described, contact support@aquacraft.com and we will make it right.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: ["By using AquaCraft you agree to the license terms and acceptable-use rules described on this site."],
  },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const page = PAGES[slug]
  return { title: page ? `${page.title} | AquaCraft` : "AquaCraft" }
}

export default async function InfoPage(props: Props) {
  const { slug } = await props.params
  const page = PAGES[slug]
  if (!page) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-4xl text-aqua-navy">{page.title}</h1>
      <div className="mt-6 space-y-4 leading-7 text-aqua-navy/80">
        {page.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="mt-10 text-xs text-aqua-navy/50">
        Placeholder copy — replace with your final legal text.
      </p>
    </div>
  )
}
