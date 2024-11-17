import StyledButton from '../StyledButton';
import styles from './task.module.css';
import pencil from '../../assets/Vector.svg';
import trash from '../../assets/trash-svgrepo-com 1.svg';
export default function Tasks() {
  return (
    <div className={styles['task-container']}>
      <p>Name Task</p>
      <p>Limit Date</p>
      <p>Cost</p>
      <div className={styles['task-container-buttons']}>
        <StyledButton><img src={pencil} alt='pencil' /></StyledButton>
        <StyledButton><img src={trash} alt="trash" /></StyledButton>
      </div>
    </div>
  )
}
