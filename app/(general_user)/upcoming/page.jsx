import UpcomingCard from '@/app/ui/upcomingCard/upcomingCard'
import styles from './upcoming.module.css'
import { getEvents } from '@/app/lib/data'

const UpcomingPage = async () => {
    const events = await getEvents()
    return (
        <div className={styles.container}>
            {events.map(event => (
                <div className={styles.event} key={event.id}>
                    <UpcomingCard event={event}/>
                </div>
            ))}
        </div>
    )
}

export default UpcomingPage