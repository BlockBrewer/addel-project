import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CRAFTS = [
  { label: "Cricut Projects", img: "craft-cricut.png", q: "cricut" },
  { label: "Silhouette Projects", img: "craft-silhouette.png", q: "silhouette" },
  { label: "T-Shirt Designs", img: "craft-tshirt.png", q: "t-shirt" },
  { label: "Tumbler Designs", img: "craft-tumbler.png", q: "tumbler" },
  { label: "Journaling", img: "craft-journaling.png", q: "journal" },
  { label: "Scrapbooking", img: "craft-scrapbooking.png", q: "scrapbook" },
  { label: "Printable Activities", img: "craft-printable-activities.png", q: "printable" },
  { label: "3D Printing", img: "craft-3d-printing.png", q: "3d" },
]

export default function ShopByCraft() {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-aqua-navy">Shop By Craft</h2>
        <LocalizedClientLink href="/store" className="text-xs font-medium text-aqua-dark hover:underline">
          View All
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CRAFTS.map((c) => (
          <li key={c.label}>
            <LocalizedClientLink
              href={`/store?q=${c.q}`}
              className="flex h-[92px] flex-col items-center justify-center gap-1.5 rounded-lg bg-aqua-light/40 px-2 text-center text-[12px] leading-tight text-aqua-navy transition-colors hover:bg-aqua-light"
            >
              <img src={`/aquacraft/${c.img}`} alt="" className="h-10 w-10 object-contain mix-blend-multiply" />
              {c.label}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
