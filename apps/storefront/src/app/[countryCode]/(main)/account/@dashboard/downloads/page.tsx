import { Metadata } from "next"

import { listMyDigitalProducts } from "@lib/data/digital-products"
import DownloadsList from "@modules/digital-products/components/downloads-list"

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download your purchased digital files.",
}

export default async function Downloads() {
  const orders = await listMyDigitalProducts()

  return (
    <div className="w-full" data-testid="downloads-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-2">
        <h1 className="text-2xl-semi">Downloads</h1>
        <p className="text-base-regular">Your purchased digital files, available any time.</p>
      </div>
      {orders.length === 0 ? (
        <p className="text-base-regular" data-testid="no-downloads">
          You haven&apos;t purchased any digital products yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((o) => (
            <section key={o.order_id}>
              <h2 className="mb-3 text-base-semi">
                Order #{o.display_id} · {new Date(o.created_at).toLocaleDateString()}
              </h2>
              <DownloadsList digitalOrder={o} />
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
