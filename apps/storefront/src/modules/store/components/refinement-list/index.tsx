"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="mb-8 small:mb-0 small:mr-6 small:min-w-[230px] small:sticky small:top-24">
      <div className="rounded-lg border border-aqua-navy/10 bg-aqua-mist px-5 py-5">
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </div>
    </div>
  )
}

export default RefinementList
