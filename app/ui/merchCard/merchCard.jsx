import Image from 'next/image'
import styles from './merchCard.module.css'
import Link from 'next/link'

const MerchCard = ({merch}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="" fill className={styles.img} />
                </div>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{merch.title}</h1>
                <h1 className={styles.stock}>Stock: {merch.stock}</h1>
                <p className={styles.desc}>{merch.description}</p>
                <Link href="/merch">Buy ${Number(merch.costInCents/100).toFixed(2)}</Link>
            </div>
        </div>
    )
}

export default MerchCard