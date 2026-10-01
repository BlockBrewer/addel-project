import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Fitrat Origins — Pure Foods. Honest Origins.",
  description:
    "Premium Pakistani natural foods — desi ghee, pure honey, wood-pressed mustard oil and extra virgin olive oil. Honestly sourced, packed with care, delivered across Pakistan.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${inter.variable} ${serif.variable}`}
    >
      <body className="font-sans text-forest-dark antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
