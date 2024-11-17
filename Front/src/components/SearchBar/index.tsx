import Styles from './searchBar.module.css';

export default function SearchBar({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={Styles['search-bar-container']}>
            <input
                name="search"
                type="text"
                placeholder="Search..."
                {...props}
            />
        </div>
    )
}
