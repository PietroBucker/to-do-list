import React, { useState } from 'react'
import StyledButton from '../StyledButton';
import styles from './Form.module.css'
import { TasksResponse } from '../../interface';
import PopUp from '../PopUp';
import { editTask, saveTask } from '../../helpers';
interface FormProps {
    useRef: React.RefObject<HTMLDialogElement>
    action: string
    loading: React.Dispatch<React.SetStateAction<boolean>>
    id?: number
}

const Form = React.forwardRef<HTMLDialogElement, FormProps>(({ useRef, action, loading, id=0 }, ref) => {
    const [data, setData] = useState<TasksResponse>({task_name: '', limit_date: '', description: '' })
    const [message, setMessage] = useState<string>('')

    const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === useRef.current) {
            useRef.current?.close()
            cleanData()
        }
    };

    const cleanData = () => {
        setData({task_name: '', limit_date: '', description: '' })
    }

    const handleChange = ({ target }: any) => {
        setData({ ...data, [target.name]: target.value })
    }

    const handleSubmit = () => {
        switch (action) {
            case 'save':
                saveTask(data, setMessage)
                loading(true)
                useRef.current?.close()
                cleanData()
                break;
            case 'edit':
                editTask(data, id, setMessage)
                loading(true)
                useRef.current?.close()
                cleanData()    
                break;
                default:
                    break;
                }
            }

    return (
        <>
            {message === '' ? '' : <PopUp message={message} setMessage={setMessage} />}
            <dialog ref={ref} onClick={handleOutsideClick} className={styles.dialog_container}>
                <div className={styles.dialog_content}>
                    <form>
                        <h2>{action === 'save' ? 'NEW TASK' : 'EDIT TASK'}</h2>
                        <input
                            id='task_name'
                            name='task_name'
                            type="text"
                            value={data.task_name}
                            onChange={handleChange}
                            maxLength={20}
                            placeholder='Task Name'
                        />


                        <input
                            type="text"
                            name='limit_date'
                            value={data.limit_date}
                            onChange={handleChange}
                            placeholder='Limit Date: exp...2021-12-31'
                        />


                        <input
                            type="number"
                            name='cost'
                            value={data.cost || ''}
                            onChange={handleChange}
                            placeholder="Cost"
                        />


                        <input
                            type="textarea"
                            name='description'
                            value={data.description}
                            onChange={handleChange}
                            placeholder='Description'
                        />

                    </form>

                    <div className={styles.button_container}>

                        <StyledButton
                            onClick={() => {
                                useRef.current?.close()
                                cleanData()
                            }}
                            className={styles.buttons}
                        >CANCEL</StyledButton>
                        <StyledButton
                            onClick={handleSubmit}
                            className={styles.buttons}
                        >APPLY</StyledButton>
                    </div>

                </div>
            </dialog>
        </>

    )
})
export default Form