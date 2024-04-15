import Card from "../ui/dashboard/card/card"
import Transactions from "../ui/dashboard/transactions/transactions"
import RightBar from "../ui/dashboard/rightbar/rightbar"
import styles from "../ui/dashboard/dashboard.module.css"

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
            <div className={styles.cards}>
                    <Card />
                    <Card />
                    <Card />
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