"use client"

import styles from './paging.module.css'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const Paging = ({count}) => {
    const searchParam = useSearchParams();
    const {replace} = useRouter();
    const pathName = usePathname();

    const page = searchParam.get("page") || 1; 

    const params = new URLSearchParams(searchParam)
    const ITEMS_PER_PAGE = 2;

    const hasPrev = (ITEMS_PER_PAGE * (parseInt(page)-1)) > 0
    const hasNext = (ITEMS_PER_PAGE * (parseInt(page)-1)) + ITEMS_PER_PAGE < parseInt(count)

    // console.log((ITEMS_PER_PAGE * (parseInt(page)-1)))

    const handleChangePage = (type) => {
        type === "prev" 
        ? params.set("page", parseInt(page)-1) 
        : params.set("page", parseInt(page)+1)
        replace(`${pathName}?${params}`)
    }


    return (
        <div className={styles.container}>
            <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Previous</button>
            <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>Next</button>
        </div>
    )
}

export default Paging