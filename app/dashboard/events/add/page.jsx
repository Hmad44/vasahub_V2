import styles from '@/app/ui/dashboard/events/addEvent/addEvent.module.css'
import { addEvent } from '@/app/lib/action'

const addEventPage = () => {
    return (
        <div className={styles.container}>
            <form action={addEvent} className={styles.form}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="location" placeholder="Location" />
                <input type="datetime-local" name="date"/>
                <textarea 
                    name="description" 
                    id="description" 
                    rows="10" 
                    placeholder="Description" >
                </textarea>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default addEventPage