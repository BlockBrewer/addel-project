"use client"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    { label: "File Details", component: <FileDetailsTab product={product} /> },
    { label: "License & Usage", component: <LicenseTab /> },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item key={i} title={tab.label} headingSize="medium" value={tab.label}>
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const FileDetailsTab = ({ product }: ProductTabsProps) => {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const rows: [string, string][] = [
    ["Format", String(meta.file_format ?? "ZIP archive")],
    ["Delivery", "Instant digital download"],
    ["Compatible with", String(meta.compatible_with ?? "Cricut, Silhouette, Canva, Photoshop & more")],
    ["Type", product.type?.value ?? "Digital product"],
  ]
  return (
    <dl className="grid gap-4 py-6 text-small-regular sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="font-semibold">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

const LicenseTab = () => (
  <div className="space-y-3 py-6 text-small-regular">
    <p>
      Every purchase includes a license for personal and small-business
      commercial use on finished products (up to 500 units).
    </p>
    <p>
      You may not resell, share or redistribute the original digital files.
      Digital products are non-refundable once downloaded; contact support if
      you have a problem with your files.
    </p>
  </div>
)

export default ProductTabs
