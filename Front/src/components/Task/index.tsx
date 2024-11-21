import StyledButton from '../StyledButton';
import styles from './task.module.css';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash-svgrepo-com 1.svg';


export default function Tasks({children}: any) {
  return (
    <div className={styles['task-container']}>
      {children}
      <div className={styles['task-container-buttons']}>
        <StyledButton><img src={pencil} alt='pencil' /></StyledButton>
        <StyledButton><img src={trash} alt="trash" /></StyledButton>
      </div>
    </div>
  )
}