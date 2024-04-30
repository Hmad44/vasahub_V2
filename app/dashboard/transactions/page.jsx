import styles from '@/app/ui/dashboard/merch/merch.module.css'
import Paging from '@/app/ui/paging/paging'
import Search from '@/app/ui/search/search'
import { getAllTrans } from '@/app/lib/data'

const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const TransactionsPage = async({searchParams}) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const [count, trans] = await getAllTrans(q, page)
   

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for transactions"/>
            </div>
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
                    {trans.map(tran => (
                    <tr key={trans.id}>
                        <td>{tran.member_name}</td>
                        <td>{tran.merch_title}</td>
                        <td>{currencyFormat.format(tran.costPaidInCents/100)}</td>
                        <td>{tran.createdAt.toLocaleDateString()}<br/>{tran.createdAt.toLocaleTimeString()}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Paging count={count}/>
        </div>
    )
}

export default TransactionsPage