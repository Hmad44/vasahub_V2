"use client"

import { useState } from "react"
import { handleLogout } from "@/app/lib/action"
import styles from './links.module.css'
import NavLink from "./navLink/navLink"
import { MemberType } from "@prisma/client"

const links = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Yearly Events",
        path: "/regular"
    },
    {
        title: "Upcoming Events",
        path: "/upcoming"
    },
]

const Links = ({session}) => {

    const [open, setOpen] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link=> (<NavLink item={link} key={link.title} />)))}
                {session?.user ? null : (<NavLink item={{title: "Register", path: "/register"}}/>)}
                {session?.user ? (
                    <>
                        {session.user?.membership_type === MemberType.ADMIN && (<NavLink item={{title: "Merch", path: "/merch"}}/>)}
                        {session.user?.membership_type === MemberType.GENERAL && (<NavLink item={{title: "Merch", path: "/merch"}}/>)}
                        {session.user?.membership_type === MemberType.ADMIN && (<NavLink item={{title: "Admin", path: "/dashboard"}}/>)}
                        <form action={handleLogout}>
                            <button className={styles.logout}>Logout</button>
                        </form>
                    </>
                ) : (<NavLink item={{title: "Login", path: "/login"}}/>)}
            </div>
            <button className={styles.menuButton} onClick={() => setOpen(prev => !prev)}>Menu</button>
            {open && ( 
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Links