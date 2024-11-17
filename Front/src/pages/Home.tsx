import { useState } from "react";
import Tasks from "../components/Task";
import SearchBar from "../components/SearchBar";
import ThemeButton from "../components/ThemeButton";
import styles from './Home.module.css'
import StyledButton from "../components/StyledButton";
import cross from '../assets/cross.svg'

export default function Home(data: any) {
    const [teste, setTeste] = useState<number[]>([1, 2, 3,4,5,6,7,8,9,10,11,12])
    const [search, setSearch] = useState<string>('')

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
                {teste.map((item) => (<Tasks key={item} />))}
                <StyledButton className={styles['fixed-button']}>
                    <img src={cross} alt="" />
                </StyledButton>
            </div>

        </div>
    )
}
