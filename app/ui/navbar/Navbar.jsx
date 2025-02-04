import Link from "next/link"
import Links from "./links/Links"
import { auth } from "@/app/lib/auth"
import styles from './navbar.module.css'

const Navbar = async () => {

    const session = await auth()
    
    return (
        <div className={styles.container}>
            <Link href='/' className={styles.logo}>OleVasa Hub</Link>
            <div>
                <Links session={session} />
            </div>
        </div>
    )
}

export default Navbar