import Image from 'next/image'
import styles from './merchCard.module.css'
import Link from 'next/link'

const MerchCard = ({merch}) => {
    
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{merch.title}</h1>
                <p className={styles.desc}>{merch.description}</p>
                <div className={styles.buy}>
                    <Link href={`/merch/${encodeURIComponent(merch.id)}`}>Buy ${Number(merch.costInCents/100).toFixed(2)}</Link>
                </div>
            </div>
        </div>
    )
}

export default MerchCard