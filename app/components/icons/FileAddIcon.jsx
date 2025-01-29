import React from "react"

export function FileAddIcon({ width = 13, height = 16, fill = "#DFDFDF", className = "",onAdd }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 0H1.6C0.72 0 0.00800018 0.72 0.00800018 1.6L0 14.4C0 15.28 0.712 16 1.592 16H11.2C12.08 16 12.8 15.28 12.8 14.4V4.8L8 0ZM9.6 11.2H7.2V13.6H5.6V11.2H3.2V9.6H5.6V7.2H7.2V9.6H9.6V11.2ZM7.2 5.6V1.2L11.6 5.6H7.2Z"
        fill={fill}
      />
    </svg>
  )
}
