"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type DigitalMedia = { id: string; filename: string | null; mime_type: string }
export type DigitalOrder = {
  order_id: string
  display_id: number
  created_at: string
  products: { id: string; name: string; medias: DigitalMedia[] }[]
}

export const getOrderDigitalProducts = async (
  orderId: string
): Promise<DigitalOrder | null> => {
  const headers = { ...(await getAuthHeaders()) }
  return sdk.client
    .fetch<{ digital_order: DigitalOrder | null }>(
      `/store/orders/${orderId}/digital-products`,
      { method: "GET", headers, cache: "no-store" }
    )
    .then((r) => r.digital_order)
    .catch(() => null)
}

export const listMyDigitalProducts = async (): Promise<DigitalOrder[]> => {
  const headers = { ...(await getAuthHeaders()) }
  return sdk.client
    .fetch<{ digital_orders: DigitalOrder[] }>(
      `/store/customers/me/digital-products`,
      { method: "GET", headers, cache: "no-store" }
    )
    .then((r) => r.digital_orders)
    .catch(() => [])
}

export const getDownloadUrl = async (
  mediaId: string,
  orderId: string
): Promise<{ url?: string; error?: string }> => {
  const headers = { ...(await getAuthHeaders()) }
  return sdk.client
    .fetch<{ url: string }>(`/store/digital-products/${mediaId}/download`, {
      method: "POST",
      body: { order_id: orderId },
      headers,
    })
    .then((r) => ({ url: r.url }))
    .catch((e: Error) => ({ error: e.message }))
}
