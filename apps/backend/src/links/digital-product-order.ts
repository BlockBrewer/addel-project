import { defineLink } from "@medusajs/framework/utils"
import DigitalProductModule from "../modules/digital-product"
import OrderModule from "@medusajs/medusa/order"

export default defineLink(
  {
    linkable: DigitalProductModule.linkable.digitalProductOrder,
    deleteCascade: true,
  },
  OrderModule.linkable.order
)
