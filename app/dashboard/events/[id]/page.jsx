import styles from "@/app/ui/dashboard/events/viewEvent/viewEvent.module.css"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma.js'

async function getEvent(id){
    try {
        const event = await prisma.$transaction([
            prisma.Event.findUnique({
                where: {
                    id: id
                },
            })  
        ])
        return event[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find event")
    }
}

async function updateEvent(formData) {
    "use server"
    const { id, title, location, date, description } = Object.fromEntries(formData);
    
    // try {
        await prisma.$transaction([
            prisma.Event.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    location: location || undefined,
                    date: new Date(date) || undefined,
                    description: description || undefined
                }
            })
        ])
    // } catch(err) {
    //     console.log(err)
    //     throw new Error("Failed to update event")
    // }
    revalidatePath("/dashboard/events")
    redirect("/dashboard/events")  
}

const ViewUserPage = async ({params}) => {
    const { id } = params;
    const event = await getEvent(id)
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