import React from 'react'
import styles from './themeButton.module.css'

export default function ThemeButton({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    className={styles['theme-button']}
    {...props}
    >themeButton</button>
  )
}
