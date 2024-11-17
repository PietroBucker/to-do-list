export default function SearchBar({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            name="search"
            type="text"
            placeholder="Search..."
            {...props}
        />
    )
}
