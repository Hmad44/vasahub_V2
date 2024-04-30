import MemberCountCard from "../ui/dashboard/cards/memberCount/memberCount"
import UnpaidCountCard from "../ui/dashboard/cards/unpaidCount/unpaidCount"
import Transactions from "../ui/dashboard/recentTransactions/recentTransactions"
import RightBar from "../ui/dashboard/rightbar/rightbar"
import styles from "../ui/dashboard/dashboard.module.css"

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
            <div className={styles.cards}>
                    <MemberCountCard />
                    <UnpaidCountCard />
                </div>
                <Transactions/>
            </div>
            <div className={styles.side}>
                <RightBar/>
            </div>
        </div>
    )
}

export default Dashboard