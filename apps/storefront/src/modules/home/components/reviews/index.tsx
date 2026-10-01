import Rating from "../rating"

const REVIEWS = [
  { quote: "Amazing designs and super easy to use! Love the instant download.", name: "Sarah J." },
  { quote: "High quality templates that saved me so much time. Highly recommend!", name: "Michael T." },
  { quote: "The membership is totally worth it. So many beautiful designs every week!", name: "Emily R." },
]

export default function Reviews({ className = "" }: { className?: string }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-6 ${className}`}>
      <h2 className="text-center text-lg font-semibold text-aqua-navy">What Our Customers Say</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {REVIEWS.map((r) => (
          <li key={r.name} className="flex flex-col items-center rounded-lg border border-gray-100 bg-aqua-mist/60 p-4 text-center">
            <Rating value={5} size="h-3.5 w-3.5" />
            <p className="mt-3 flex-1 text-xs leading-5 text-aqua-navy/80">“{r.quote}”</p>
            <p className="mt-3 text-xs font-semibold text-aqua-navy">– {r.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
