export type CatalogCategory = {
  label: string
  handle: string
  children: { label: string; handle: string }[]
}

// Top-level storefront categories. Handles must match the backend seed
// (apps/backend/src/scripts/seed-aquacraft.ts).
export const CATALOG: CatalogCategory[] = [
  {
    label: "SVGs",
    handle: "svgs",
    children: [
      { label: "SVG Bundles", handle: "svg-bundles" },
      { label: "Holiday SVGs", handle: "holiday-svgs" },
      { label: "Animals & Nature", handle: "animals-nature" },
    ],
  },
  {
    label: "Canva Templates",
    handle: "canva-templates",
    children: [
      { label: "Social Media", handle: "social-media" },
      { label: "Instagram", handle: "instagram" },
      { label: "Pinterest Pins", handle: "pinterest-pins" },
    ],
  },
  {
    label: "Printables",
    handle: "printables",
    children: [
      { label: "Wall Art", handle: "wall-art" },
      { label: "Coloring Pages", handle: "coloring-pages" },
      { label: "Activity Sheets", handle: "activity-sheets" },
    ],
  },
  {
    label: "Planners",
    handle: "planners",
    children: [
      { label: "Daily Planners", handle: "daily-planners" },
      { label: "Weekly Planners", handle: "weekly-planners" },
      { label: "Budget Planners", handle: "budget-planners" },
    ],
  },
  {
    label: "Journals",
    handle: "journals",
    children: [
      { label: "Gratitude Journals", handle: "gratitude-journals" },
      { label: "Bullet Journals", handle: "bullet-journals" },
    ],
  },
  {
    label: "Mockups",
    handle: "mockups",
    children: [
      { label: "Apparel Mockups", handle: "apparel-mockups" },
      { label: "Mug & Tumbler Mockups", handle: "mug-tumbler-mockups" },
    ],
  },
  {
    label: "3D Prints",
    handle: "3d-prints",
    children: [
      { label: "Home Decor", handle: "home-decor" },
      { label: "Toys & Games", handle: "toys-games" },
    ],
  },
]

export const categoryHref = (c: CatalogCategory, child?: { handle: string }) =>
  child ? `/categories/${c.handle}/${child.handle}` : `/categories/${c.handle}`
