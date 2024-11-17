import React from 'react'

export default function ThemeButton({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    {...props}
    >themeButton</button>
  )
}
