import styles from './recentTransactions.module.css'
import { getPreviewTrans } from '@/app/lib/data'

const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const Transactions = async () => {

    const transactions = await getPreviewTrans()

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Item</td>
                        <td>Amount</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.member.profile.f_name} {transaction.member.profile.l_name}</td>
                        <td>{transaction.merch.title}</td>
                        <td>{currencyFormat.format(transaction.costPaidInCents/100)}</td>
                        <td>{transaction.createdAt.toLocaleDateString()}<br/>{transaction.createdAt.toLocaleTimeString()}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Transactions