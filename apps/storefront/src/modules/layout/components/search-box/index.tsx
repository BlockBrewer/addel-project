"use client"

import { Search } from "@modules/home/components/icons"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export default function SearchBox({ className = "" }: { className?: string }) {
  const router = useRouter()
  const { countryCode } = useParams()
  const params = useSearchParams()
  const [q, setQ] = useState(params.get("q") ?? "")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    router.push(`/${countryCode}/store${term ? `?q=${encodeURIComponent(term)}` : ""}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={`flex h-12 items-center rounded-xl border border-gray-200 bg-white pl-4 pr-3 shadow-sm focus-within:border-aqua ${className}`}
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search designs..."
        aria-label="Search designs"
        data-testid="nav-search-input"
        className="min-w-0 flex-1 bg-transparent text-sm text-aqua-navy outline-none placeholder:text-gray-400"
      />
      <button type="submit" aria-label="Search" className="text-aqua-navy hover:text-aqua">
        <Search className="h-5 w-5" strokeWidth={2} />
      </button>
    </form>
  )
}
