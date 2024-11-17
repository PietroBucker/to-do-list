import styles from './button.module.css';

export default function StyledButton({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    className={styles['styled-button']}
    {...props}
    >{children}</button>
  )
}
