import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import HowItWorks from "@modules/home/components/how-it-works"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo, { Breadcrumb } from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6" data-testid="product-container">
        <Breadcrumb product={product} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <ImageGallery images={images} />
          <div className="flex flex-col">
            <ProductInfo product={product} />
            <div className="mt-4">
              <Suspense
                fallback={
                  <ProductActions disabled={true} product={product} region={region} />
                }
              >
                <ProductActionsWrapper
                  id={product.id}
                  region={region}
                  details={
                    <p
                      className="text-sm leading-6 text-aqua-navy/80 whitespace-pre-line"
                      data-testid="product-description"
                    >
                      {product.description}
                    </p>
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <ProductTabs product={product} />
          <HowItWorks />
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
