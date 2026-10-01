"use client"

import { getDownloadUrl } from "@lib/data/digital-products"
import { Download } from "@modules/home/components/icons"
import { useState } from "react"

export default function DownloadButton({
  mediaId,
  orderId,
  label,
}: {
  mediaId: string
  orderId: string
  label: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onClick = async () => {
    setLoading(true)
    setError(null)
    const res = await getDownloadUrl(mediaId, orderId)
    setLoading(false)
    if (res.url) {
      window.location.href = res.url
    } else {
      setError("Download unavailable. Please contact support.")
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        data-testid="download-button"
        className="inline-flex items-center gap-2 rounded-md bg-aqua px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-aqua-dark disabled:opacity-60"
      >
        <Download className="h-4 w-4" />
        {loading ? "Preparing..." : label}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
