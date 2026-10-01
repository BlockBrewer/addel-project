import * as React from "react"

type IconProps = React.SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
})

export const Leaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
)

export const Sprout = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 20h10" />
    <path d="M12 20v-9" />
    <path d="M12 11C8 11 5 8 5 5c4 0 7 3 7 6Z" />
    <path d="M12 11c0-3 3-6 7-6 0 3-3 6-7 6Z" />
  </svg>
)

export const Medal = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7.21 4 4.5 9.5l7.5 9 7.5-9L16.79 4" />
    <path d="M11 4h2" />
    <circle cx="12" cy="15" r="4.5" />
    <path d="M12 13v4" />
  </svg>
)

export const Box = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="m3 8 9 5 9-5" />
    <path d="M12 13v8" />
  </svg>
)

export const Users = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export const ShieldCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const Globe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
)

export const BadgeCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const Truck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" />
    <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1" />
    <circle cx="7.5" cy="18" r="1.5" />
    <circle cx="17.5" cy="18" r="1.5" />
  </svg>
)

export const Lock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export const Banknote = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
)

export const Heart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7L12 21l8.8-8.4a5 5 0 0 0 0-7Z" />
  </svg>
)

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
)

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const User = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
)

export const Bag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
)

export const Star = (p: IconProps) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
  </svg>
)

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m20 6-11 11-5-5" />
  </svg>
)

export const Facebook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  </svg>
)

export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
)

export const Whatsapp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5Z" />
    <path d="M8.5 8.8c.3-.8.6-.8 1-.8.4 0 .7.1 1 .9.2.5.6 1.5.6 1.6.1.2 0 .4-.1.6l-.5.6c-.2.2-.3.3-.1.6.2.4.8 1.2 1.6 1.7.7.5 1 .5 1.2.4.2-.1.6-.7.8-.9.2-.3.4-.2.6-.1.3.1 1.5.7 1.7.9.2.1.4.2.4.3 0 .3-.1.9-.5 1.3-.4.4-1.2.7-1.8.7-.7 0-2.2-.4-3.7-1.6-1.6-1.3-2.4-2.9-2.6-3.4-.2-.5-.3-1.1.2-1.8Z" />
  </svg>
)

export const Menu = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const ChevronLeft = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const ChevronRight = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const Infinity = (p: IconProps) => (
  <svg {...base({ viewBox: "0 0 48 24", width: 48, strokeWidth: 2.4, ...p })}>
    <path d="M24 12c-3-5-6-8-10-8a8 8 0 1 0 0 16c4 0 7-3 10-8Zm0 0c3 5 6 8 10 8a8 8 0 1 0 0-16c-4 0-7 3-10 8Z" />
  </svg>
)

export const Refresh = (p: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="M20 11a8 8 0 0 0-14.5-4M4 13a8 8 0 0 0 14.5 4" />
    <path d="M20 4v5h-5M4 20v-5h5" />
  </svg>
)

export const Award = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="6" />
    <path d="m9.2 9 2 2 3.6-3.8" />
    <path d="m8.5 14-2 7 5.5-3 5.5 3-2-7" />
  </svg>
)

export const Cart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 3h3l2.4 12.2a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L20 7H6" />
    <circle cx="9.5" cy="20" r="1.4" />
    <circle cx="17" cy="20" r="1.4" />
  </svg>
)

export const Download = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4" />
    <path d="M5 19h14" />
  </svg>
)

export const Pencil = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m16 3 5 5L8 21H3v-5L16 3Z" />
    <path d="m13.5 5.5 5 5" />
  </svg>
)

export const Customize = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="8" width="14" height="13" rx="2" />
    <path d="M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M12 12v5M9.5 14.5h5" />
  </svg>
)

export const Pinterest = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.5 20 12.6 11.5M9.5 13.5c-1-3 1-5.5 3.5-5.5 2 0 3 1.3 3 3 0 2.2-1.3 3.7-2.8 3.7-1 0-1.6-.7-1.4-1.6" />
  </svg>
)

export const TikTok = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.6 1.9 4.3 4.5 4.5" />
  </svg>
)

export const Youtube = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
  </svg>
)

export const Sparkle = (p: IconProps) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Zm7 12 .8 3.2L23 18l-3.2.8L19 22l-.8-3.2L15 18l3.2-.8L19 14Z" />
  </svg>
)

export const Chat = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.4} />
  </svg>
)
