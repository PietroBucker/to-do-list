import { useState } from "react";
import Tasks from "../components/Task";
import SearchBar from "../components/SearchBar";
import ThemeButton from "../components/ThemeButton";
import styles from './Home.module.css'

export default function Home(data: any) {
    const [teste, setTeste] = useState<number[]>([1, 2, 3])
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
            {teste.map((item) => (<Tasks key={item} />))}

        </div>
    )
}
