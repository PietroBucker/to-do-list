import React, { useEffect, useState } from "react";
import Tasks from "../components/Task";
import SearchBar from "../components/SearchBar";
import ThemeButton from "../components/ThemeButton";
import styles from './Home.module.css'
import StyledButton from "../components/StyledButton";
import cross from '../assets/cross.svg'
import { TasksResponse } from "../../../Back/src/interface";
import Form from "../components/Form";

export default function Home() {
    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<TasksResponse[]>()
    const modalFormRef = React.useRef<HTMLDialogElement>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(json => setData(json))
            .then(() => setLoading(false))

    }, [loading])
    
    const filterData = data?.filter((item) => {
        return item.task_name.includes(search)
        || item.limit_date.includes(search)
        || String(item.cost).includes(search)
    })

    return (
        <div className={styles['home-container']}>
            <h1>TODO LIST</h1>
            <div className={styles['home-container-search']}>
                <SearchBar value={search} onChange={({ target }) => setSearch(target.value)} />
                <ThemeButton />
            </div>
            <div className={styles['home-container-tasks']}>
            {loading ? <h1>Carregando...</h1> : ''}
                {!filterData ? '' : filterData.map((item) => (
                    <Tasks key={item.id} desc={item.descsda} loading={setLoading} id={item.id}>
                        <div className={styles.task_item}>{item.task_name}</div>
                        <div className={styles.task_item}>{item.limit_date}</div>
                        <div className={styles.task_item}>{item.cost}</div>
                    </ Tasks>))}
                <StyledButton 
                    onClick={() => modalFormRef.current?.showModal()}
                    className={styles['fixed-button']}>
                    <img src={cross} alt="" />
                </StyledButton>
                <Form ref={modalFormRef} useRef={modalFormRef} action={'save'} loading={setLoading} />
            </div>

        </div>
    )
}
