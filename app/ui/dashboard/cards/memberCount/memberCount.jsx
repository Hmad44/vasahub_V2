import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from './memberCount.module.css'
import { getMemberCount } from '@/app/lib/data'

const MemberCountCard = async () => {

    const count = await getMemberCount()

    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>Total Members</span>
                <span className={styles.number}>{count}</span>
            </div>
        </div>
    )
}

export default MemberCountCard