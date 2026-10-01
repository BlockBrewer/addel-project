import { Text, clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="text-sm text-aqua-navy/40 line-through"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-base font-bold text-aqua-navy", {
          "text-aqua-dark": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
