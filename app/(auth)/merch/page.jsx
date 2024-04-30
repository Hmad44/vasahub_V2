import MerchCard from '@/app/ui/merch/merchCard'
import styles from './merch.module.css'
import { checkDuesAndShirtPaid, getMerch } from '@/app/lib/data'
import { auth } from '@/app/lib/auth'

const MerchPage = async () => {

    const session = await auth()
    const check = await checkDuesAndShirtPaid(session.user.id)

    const merchs = await getMerch()

    return (
        <div className={styles.container}>
            {merchs.map(merch => (
                <div className={styles.merch} key={merch.id}>
                    <MerchCard merch={merch} due_status={check.profile.due_status} shirt_status={check.profile.shirt_status}/>
                </div>
            ))}
        </div>
    )
}

export default MerchPage