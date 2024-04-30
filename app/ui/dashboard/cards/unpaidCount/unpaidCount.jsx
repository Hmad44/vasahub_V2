import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from './unpaidCount.module.css'
import { getUnpaidCount } from '@/app/lib/data'

const UnpaidCountCard = async () => {

    const count = await getUnpaidCount()

    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>Unpaid</span>
                <span className={styles.number}>{count}</span>
            </div>
        </div>
    )
}

export default UnpaidCountCard