import styles from './regular.module.css'
import Image from 'next/image'

const RegularPage = async () => {

    return (
        <div className={styles.container}>
            <div className={styles.event}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>Date Auction</h1>
                    <h1 className={styles.location}>Location & Time: TBA</h1>
                    <p className={styles.desc}>Date Auction is a philanthropic showcase held annually that features dancing, video skits, and auctionee talents. Date Auction features VSAs (Vietnamese Student Associations) from all over the Gulf Coast Region including Mississippi, Alabama, and Louisiana. Each year, a Collective Philantrophy Project is chosen as the charity, and each VSA organization provides two auctionees, a video skit, and a dance performance.</p>
                </div>
            </div>
            <div className={styles.event}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>OleVASA Formal</h1>
                    <h1 className={styles.location}>Location & Time: TBA</h1>
                    <p className={styles.desc}>OleVasa annualy hosts a themed formal for its members.</p>
                </div>
            </div>
            <div className={styles.event}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>Culture Show</h1>
                    <h1 className={styles.location}>Location & Time: TBA</h1>
                    <p className={styles.desc}>Culture Show is our way of celebrating Lunar New Year with performances, food, and arts and crafts and is the most culturally significant event of the year. We had our own general members perform for the fan dance, lion dance, and singing performances. It is open to anyone within the university and local community!</p>
                </div>
            </div>
        </div>
    )
}

export default RegularPage