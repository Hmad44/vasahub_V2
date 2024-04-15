import styles from './transactions.module.css'

const Transactions = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <td>Name</td>
                    {/* <td>Status</td> */}
                    <td>Date</td>
                    <td>Amount</td>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        {/* <span className={`${styles.status} ${styles.pending}`}> Pending </span> */}
                        <td>03.06.2024</td>
                        <td>$20</td>
                    </tr>
                    <tr>
                        <td>John Doe</td>
                        {/* <span className={`${styles.status} ${styles.done}`}> Done </span> */}
                        <td>03.06.2024</td>
                        <td>$20</td>
                    </tr>
                    <tr>
                        <td>John Doe</td>
                        {/* <span className={`${styles.status} ${styles.canceled}`}> Canceled </span> */}
                        <td>03.06.2024</td>
                        <td>$20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Transactions