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
    // const [teste, setTeste] = useState<number[]>([1, 2, 3,4,5,6,7,8,9,10,11,12])
    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<TasksResponse[]>()
    const modalFormRef = React.useRef<HTMLDialogElement>(null);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(json => setData(json))

    }, [])
    console.log(data)
    const handleChange = (event: any) => {
        setSearch(event.target.value)
    }
    return (
        <div className={styles['home-container']}>
            <h1>TODO LIST</h1>
            <div className={styles['home-container-search']}>
                <SearchBar value={search} onChange={({ target }) => setSearch(target.value)} />
                <ThemeButton />
            </div>
            <div className={styles['home-container-tasks']}>

                {!data ? '' : data.map((item) => (
                    <Tasks key={item.id} >
                        <div>{item.task_name}</div>
                        <div>{item.limit_date}</div>
                        <div>{item.cost}</div>
                    </ Tasks>))}
                <StyledButton 
                    onClick={() => modalFormRef.current?.showModal()}
                    className={styles['fixed-button']}>
                    <img src={cross} alt="" />
                </StyledButton>
                <Form ref={modalFormRef} useRef={modalFormRef} />
            </div>

        </div>
    )
}
