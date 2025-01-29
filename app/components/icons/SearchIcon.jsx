import React from "react"

export function SearchIcon({ width = 15, height = 16, fill = "#DFDFDF", className = "" ,onSearch}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.8 14.072V4.8L8 0H1.6C0.72 0 0.00800018 0.72 0.00800018 1.6L0 14.4C0 15.28 0.712 16 1.592 16H11.2C11.56 16 11.88 15.88 12.152 15.68L8.608 12.136C7.968 12.552 7.216 12.8 6.4 12.8C4.192 12.8 2.4 11.008 2.4 8.8C2.4 6.592 4.192 4.8 6.4 4.8C8.608 4.8 10.4 6.592 10.4 8.8C10.4 9.616 10.152 10.368 9.736 11L12.8 14.072ZM4 8.8C4 10.128 5.072 11.2 6.4 11.2C7.728 11.2 8.8 10.128 8.8 8.8C8.8 7.472 7.728 6.4 6.4 6.4C5.072 6.4 4 7.472 4 8.8Z"
        fill={fill}
      />
    </svg>
  )
}

