import styles from "./sidebar.module.css"
import MenuLink from "./menuLink/menuLink"
import Image from "next/image";
import {MdDashboard, MdSupervisedUserCircle, MdAttachMoney} from "react-icons/md";

const menuItems = [
    {   
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Events",
                path: "/dashboard/events",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Merch",
                path: "/dashboard/merch",
                icon: <MdAttachMoney />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
];

const Sidebar = async () => {

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50"/>
                <div className={styles.userDetail}>
                    <span className={styles.username}>Administrator</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map(cat=>(
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item=>(
                            <MenuLink item={item} key={item.title}/>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar