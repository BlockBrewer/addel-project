import LocalizedClientLink from "@modules/common/components/localized-client-link"

const TILES = [
  { label: "SVGs", handle: "svgs", img: "cat-svgs.png" },
  { label: "Canva Templates", handle: "canva-templates", img: "cat-canva.png" },
  { label: "Printables", handle: "printables", img: "cat-printables.png" },
  { label: "Planners", handle: "planners", img: "cat-planners.png" },
  { label: "Sublimation", handle: "sublimation", img: "cat-sublimation.png" },
  { label: "Journals", handle: "journals", img: "cat-journals.png" },
  { label: "Digital Papers", handle: "digital-papers", img: "cat-digital-papers.png" },
  { label: "3D Prints", handle: "3d-prints", img: "cat-3d-prints.png" },
]

export default function CategoryTiles() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
      {TILES.map((t) => (
        <li key={t.handle}>
          <LocalizedClientLink
            href={`/categories/${t.handle}`}
            className="flex h-[76px] items-center gap-3 rounded-xl bg-aqua-light/50 px-4 text-[15px] font-medium leading-tight text-aqua-navy transition-colors hover:bg-aqua-light"
          >
            <img
              src={`/aquacraft/${t.img}`}
              alt=""
              className="h-12 w-12 shrink-0 object-contain mix-blend-multiply"
            />
            <span>{t.label}</span>
          </LocalizedClientLink>
        </li>
      ))}
    </ul>
  )
}
