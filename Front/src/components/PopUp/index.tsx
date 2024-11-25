import StyledButton from '../StyledButton'
import styles from './PopUp.module.css'

interface PopUpProps {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    loading: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PopUp({ message, setMessage, loading }: PopUpProps) {
  return (
    <div className={styles.popup}>
      <p>{message}</p>
      <StyledButton onClick={() => {
        setMessage('')
        loading(true)
        }}>OK</StyledButton>
    </div>
  )
}
