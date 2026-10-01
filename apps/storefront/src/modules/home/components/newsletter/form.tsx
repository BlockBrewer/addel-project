"use client"

import { FormEvent, useState } from "react"

// Placeholder: no mailing-list provider is wired up yet. Hook the submit
// handler up to your provider (Mailchimp, Klaviyo, ...) when ready.
export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return <p className="mt-6 text-sm font-medium">Thanks for subscribing!</p>
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`mt-6 flex overflow-hidden rounded-lg bg-white ${compact ? "" : "mx-auto max-w-[480px]"}`}
    >
      <input
        type="email"
        required
        placeholder="Enter your email address"
        aria-label="Email address"
        className="h-12 min-w-0 flex-1 bg-white px-4 text-sm text-aqua-navy outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="h-12 shrink-0 bg-aqua-dark px-6 text-sm font-semibold text-white transition-colors hover:bg-aqua-deep"
      >
        Subscribe
      </button>
    </form>
  )
}
