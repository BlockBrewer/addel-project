import { getOrderDigitalProducts } from "@lib/data/digital-products"
import DownloadsList from "./downloads-list"

// Shown on the order confirmation page. The order is placed asynchronously
// (order.placed subscriber), so poll briefly on the server before giving up.
export default async function OrderDownloads({ orderId }: { orderId: string }) {
  let digital = await getOrderDigitalProducts(orderId)
  for (let i = 0; i < 5 && !digital; i++) {
    await new Promise((r) => setTimeout(r, 600))
    digital = await getOrderDigitalProducts(orderId)
  }
  if (!digital) return null

  return (
    <section className="w-full" data-testid="order-downloads">
      <h2 className="mb-3 text-2xl font-semibold text-aqua-navy">Your Downloads</h2>
      <DownloadsList digitalOrder={digital} />
    </section>
  )
}
