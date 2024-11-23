import StyledButton from '../StyledButton'
import styles from './PopUp.module.css'

interface PopUpProps {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
}
export default function PopUp({ message, setMessage }: PopUpProps) {
  return (
    <div className={styles.popup}>
      <p>{message}</p>
      <StyledButton onClick={() => setMessage('')}>OK</StyledButton>
    </div>
  )
}
