import styles from './task.module.css';

export default function Tasks() {
  return (
    <div className={styles['task-container']}>
      <p>Name Task</p>
      <p>Cost</p>
      <p>Limit Date</p>
    </div>
  )
}
