import NewsletterForm from "./form"

export default function Newsletter({ className = "" }: { className?: string }) {
  return (
    <section
      id="newsletter"
      className={`rounded-2xl bg-gradient-to-br from-aqua to-aqua-sky p-8 text-center text-white ${className}`}
    >
      <h2 className="font-serif text-2xl sm:text-3xl">Get Exclusive Offers &amp; New Designs</h2>
      <p className="mt-3 text-sm">Subscribe to our newsletter and never miss an update!</p>
      <NewsletterForm />
      <p className="mt-4 text-xs text-white/90">No spam. Unsubscribe anytime.</p>
    </section>
  )
}
