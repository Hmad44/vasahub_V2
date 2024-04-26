import MerchCard from '@/app/ui/merch/merchCard'
import styles from './merch.module.css'
import { getMerch } from '@/app/lib/data'

const MerchPage = async () => {
    const merchs = await getMerch()
    return (
        <div className={styles.container}>
            {merchs.map(merch => (
                <div className={styles.merch} key={merch.id}>
                    <MerchCard merch={merch}/>
                </div>
            ))}
        </div>
    )
}

export default MerchPage