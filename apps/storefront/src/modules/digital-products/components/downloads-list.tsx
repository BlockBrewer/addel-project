import { DigitalOrder } from "@lib/data/digital-products"
import DownloadButton from "./download-button"

export default function DownloadsList({ digitalOrder }: { digitalOrder: DigitalOrder }) {
  return (
    <ul className="flex flex-col gap-3" data-testid="downloads-list">
      {digitalOrder.products.map((p) => (
        <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-aqua-light bg-aqua-mist p-4">
          <div>
            <p className="font-semibold text-aqua-navy">{p.name}</p>
            <p className="text-xs text-aqua-navy/60">
              {p.medias.map((m) => m.filename ?? "File").join(", ")}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {p.medias.map((m) => (
              <DownloadButton
                key={m.id}
                mediaId={m.id}
                orderId={digitalOrder.order_id}
                label={p.medias.length > 1 ? `Download ${m.filename ?? "file"}` : "Download"}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
