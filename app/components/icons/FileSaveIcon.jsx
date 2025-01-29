import React from "react"

export function FileSaveIcon({ width = 16, height = 16, fill = "#DFDFDF", className = "",onSave }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.4444 0H1.77778C0.791111 0 0 0.8 0 1.77778V14.2222C0 15.2 0.791111 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V3.55556L12.4444 0ZM8 14.2222C6.52444 14.2222 5.33333 13.0311 5.33333 11.5556C5.33333 10.08 6.52444 8.88889 8 8.88889C9.47556 8.88889 10.6667 10.08 10.6667 11.5556C10.6667 13.0311 9.47556 14.2222 8 14.2222ZM10.6667 5.33333H1.77778V1.77778H10.6667V5.33333Z"
        fill={fill}
      />
    </svg>
  )
}

