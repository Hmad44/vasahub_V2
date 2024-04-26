"use client"

import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const Search = ({placeholder}) => {
    const searchParam = useSearchParams();
    const {replace} = useRouter();
    const pathName = usePathname();

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParam)

        params.set("page", 1)

        if(e.target.value){
            e.target.value.length > 2 && params.set("q", e.target.value)
        } else {
            params.delete("q")
        }

        replace(`${pathName}?${params}`);
    },250);

    return (
        <div className={styles.container}>
            <MdSearch/>
            <input type="text" placeholder={placeholder} className={styles.input} onChange = {handleSearch} />
        </div>
    )
}

export default Search