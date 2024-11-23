import StyledButton from '../StyledButton';
import styles from './task.module.css';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash-svgrepo-com 1.svg';
import React from 'react';
import Form from '../Form';
import { deleteTask } from '../../helpers';


export default function Tasks({ desc, children, loading, id, over1000 }: any) {
  const editModalRef = React.useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  

  return (
    <div
      className={`${styles['task-container']} ${over1000 ? styles['task-over-1000'] : ''}`}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <div className={styles['task-container-buttons']}>
        <StyledButton
          onClick={() => editModalRef.current?.showModal()}
        >
          <img src={pencil} alt='pencil' />
        </StyledButton>
        <StyledButton
        onClick={() => deleteTask(id, loading)}
        >
          <img src={trash} alt="trash" />
        </StyledButton>
      </div>
      <dialog open={isOpen} className={styles.dialog_description}>
        <p className={styles.description}>{desc}</p>
      </dialog>
      <Form ref={editModalRef} useRef={editModalRef} action={'edit'} loading={loading} id={id} />
    </div>
  )
}
