import { useState } from "react";
import Tasks from "../components/Task";
import SearchBar from "../components/SearchBar";

export default function Home(data: any) {
    const [teste, setTeste] = useState<number[]>([1,2,3])
    const [search, setSearch] = useState<string>('')
    
    const handleChange = (event: any) => {
        setSearch(event.target.value)
    }
    return (
        <div>
            <h1>TODO LIST</h1>
            <SearchBar value={search} onChange={ ({target}) => setSearch(target.value) } />
            {teste.map((item) => (<Tasks key={item} />))}

        </div>
    )
}
