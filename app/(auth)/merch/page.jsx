import MerchCard from '@/app/ui/merch/merchCard'
import styles from './merch.module.css'
import { getMerchs } from '@/app/lib/data'

const MerchPage = async () => {
    const merchs = await getMerchs()
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