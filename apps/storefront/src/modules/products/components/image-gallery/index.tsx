"use client"

import { HttpTypes } from "@medusajs/types"
import { ChevronLeft, ChevronRight } from "@modules/home/components/icons"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [active, setActive] = useState(0)
  const list = images.filter((i) => !!i.url)

  if (!list.length) {
    return <div className="aspect-[4/5] w-full rounded-xl bg-aqua-mist" />
  }

  const go = (d: number) => setActive((a) => (a + d + list.length) % list.length)

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl bg-aqua-mist">
        <img
          src={list[active].url}
          alt={`Product image ${active + 1}`}
          className="aspect-[4/5] w-full object-cover"
          data-testid="product-main-image"
        />
      </div>
      {list.length > 1 && (
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="text-aqua-navy hover:text-aqua">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <ul className="flex flex-1 gap-2 overflow-x-auto no-scrollbar">
            {list.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`block h-16 w-16 overflow-hidden rounded-md border-2 ${i === active ? "border-aqua" : "border-transparent"}`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" aria-label="Next image" onClick={() => go(1)} className="text-aqua-navy hover:text-aqua">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
