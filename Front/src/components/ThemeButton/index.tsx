import React, { useEffect } from 'react'
import styles from './themeButton.module.css'

export default function ThemeButton() {
  const [theme, setTheme] = React.useState<string>('dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  return (
    <button
    className={styles['theme-button']}
    onClick={toggleTheme}
    >themeButton</button>
  )
}
