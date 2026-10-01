import React from "react"

import { IconProps } from "types/icon"

const Cash: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M5.5 12H5.51M18.5 12H18.51"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Cash
