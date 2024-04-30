import Image from 'next/image'
import styles from './merchCard.module.css'
import Link from 'next/link'
import { checkProductType } from '@/app/lib/data'
import { MerchType } from '@prisma/client'

const MerchCard = async ({merch, due_status, shirt_status}) => {

    const type = await checkProductType(merch.id)

    let check = ""
    if (type == MerchType.DUES && due_status == true) {
        check = true
    } else if (type == MerchType.SHIRT && shirt_status == true) {
        check = true
    } else {
        check = false
    }

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
                    {check ? <Link href={`/merch`}>Already Paid</Link> : <Link href={`/merch/${encodeURIComponent(merch.id)}`}>Buy ${Number(merch.costInCents/100).toFixed(2)}</Link>}
                    
                </div>
            </div>
        </div>
    )
}

export default MerchCard