import prisma from '@/lib/prisma.js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import styles from '@/app/ui/dashboard/events/addEvent/addEvent.module.css'

async function addEvent(formData) {
    "use server"
    const { title, location, date, description } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.Event.create({
                data: {
                    title: title,
                    description: description,
                    location: location,
                    date: new Date(date),
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to create event")
    }
    revalidatePath("/dashboard/events")
    redirect("/dashboard/events")
}

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