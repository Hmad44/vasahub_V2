import Image from 'next/image'
import styles from './upcomingCard.module.css'
import Link from 'next/link'

const UpcomingCard = ({event}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
            </div>
            <span className={styles.date}>{event.date.toLocaleDateString()}<br/>{event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{event.title}</h1>
                <h1 className={styles.location}>{event.location}</h1>
                <p className={styles.desc}>{event.description}</p>
            </div>
        </div>
    )
}

export default UpcomingCard