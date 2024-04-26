import styles from "@/app/ui/dashboard/events/viewEvent/viewEvent.module.css"
import { getSingleEvent } from "@/app/lib/data"
import { updateEvent } from "@/app/lib/action"

const ViewUserPage = async ({params}) => {
    const { id } = params;
    const event = await getSingleEvent(id)
    return (
        <div className={styles.container}>
            <form action={updateEvent} className={styles.form}>
                <input type="hidden" name="id" value={event.id} />
                <label>Title</label>
                <input type="text" name="title" placeholder={event.title} />
                <label>Location</label>
                <input type="text" name="location" placeholder={event.location} />
                <label>Date</label>
                <input type="datetime-local" name="date" placeholder={event.date} />
                <label>Description</label>
                <textarea 
                    name="description"
                    id="description" 
                    rows="10" 
                    placeholder={event.description}>
                </textarea>
                <button>Update</button>
            </form>
        </div>
    )
}

export default ViewUserPage