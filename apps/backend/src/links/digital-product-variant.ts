import { defineLink } from "@medusajs/framework/utils"
import DigitalProductModule from "../modules/digital-product"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  {
    linkable: DigitalProductModule.linkable.digitalProduct,
    deleteCascade: true,
  },
  ProductModule.linkable.productVariant
)
