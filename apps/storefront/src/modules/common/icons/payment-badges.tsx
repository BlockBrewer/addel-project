const box =
  "flex h-9 w-[62px] items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm"

export const PaymentBadges = () => (
  <ul className="flex items-center gap-3" aria-label="Accepted payment methods">
    <li className={box}>
      <span className="text-[15px] font-extrabold italic tracking-tight text-[#1a1f71]">VISA</span>
    </li>
    <li className={box}>
      <svg viewBox="0 0 38 24" className="h-5" aria-label="Mastercard">
        <circle cx="14" cy="12" r="8" fill="#eb001b" />
        <circle cx="24" cy="12" r="8" fill="#f79e1b" fillOpacity=".9" />
      </svg>
    </li>
    <li className={box}>
      <span className="text-[15px] font-extrabold italic text-[#003087]">
        P<span className="text-[#009cde]">P</span>
      </span>
    </li>
    <li className={box}>
      <span className="text-[13px] font-semibold text-black">Apple Pay</span>
    </li>
    <li className={box}>
      <span className="text-[13px] font-semibold">
        <span className="text-[#4285f4]">G</span> <span className="text-gray-600">Pay</span>
      </span>
    </li>
  </ul>
)
