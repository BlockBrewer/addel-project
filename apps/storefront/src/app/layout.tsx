import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, DM_Serif_Display } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "AquaCraft — Design. Download. Inspire.",
  description:
    "Discover thousands of digital designs, templates, SVGs, printables and more. Unlimited creativity. Instant download.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${inter.variable} ${serif.variable}`}
    >
      <body className="font-sans bg-white text-aqua-navy antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
