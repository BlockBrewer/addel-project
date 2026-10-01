import { HttpTypes } from "@medusajs/types"

/** True when nothing in the cart needs to be shipped (all digital goods). */
export const isDigitalCart = (cart?: HttpTypes.StoreCart | null): boolean =>
  !!cart?.items?.length && cart.items.every((i) => i.requires_shipping === false)
