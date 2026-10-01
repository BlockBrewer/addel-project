import Rating from "../rating"
import { Star } from "../icons"

const reviews = [
  {
    quote:
      "The desi ghee is absolutely pure and has an amazing aroma. You can taste the difference in every bite.",
    name: "Ayesha Khan",
    city: "Lahore",
  },
  {
    quote:
      "Fitrat Origins honey is our family favorite. Truly raw and natural — you feel the goodness in it.",
    name: "Bilal Ahmed",
    city: "Karachi",
  },
  {
    quote:
      "Excellent quality oils! The mustard oil adds a rich flavor to our food. Highly recommended.",
    name: "Sana Mehmood",
    city: "Islamabad",
  },
]

export default function Reviews() {
  return (
    <section className="w-full bg-cream-light">
      <div className="content-container py-16 sm:py-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
            What Our Customers Say
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-forest sm:text-5xl">
            Trusted by Thousands
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <span className="text-sm font-semibold text-forest">4.9/5</span>
            <span className="text-sm text-forest/50">(2,500+ Reviews)</span>
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <li
              key={r.name}
              className="flex flex-col rounded-xl border border-forest/10 bg-white p-7 shadow-sm"
            >
              <Rating value={5} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-forest/75">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-forest/10 pt-4">
                <p className="text-sm font-semibold text-forest">{r.name}</p>
                <p className="text-xs text-forest/50">{r.city}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
