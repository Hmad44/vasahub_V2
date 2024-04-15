import prisma from '@/lib/prisma.js'
import styles from '@/app/ui/dashboard/events/events.module.css'
import Paging from '@/app/ui/paging/paging'
import Search from '@/app/ui/search/search'
import { revalidatePath } from 'next/cache'
import Link from "next/link"
import Image from "next/image"

async function getEvents(q, page){
    const ITEMS_PER_PAGE = 2
    try {
        const [count, events] = await prisma.$transaction([
            prisma.Event.count(),
            prisma.Event.findMany({
                orderBy: {
                    date: 'asc'
                },
                skip: (ITEMS_PER_PAGE * (page-1)),
                take: ITEMS_PER_PAGE,
                where: {
                    title: {
                        contains: `%${q}%`,
                        mode: 'insensitive'
                    }
                }
            })
        ])
        return [count, events];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to view event")
    }
}

async function deleteEvent(formData) {
    "use server"
    const { id } = Object.fromEntries(formData);
    // try {
        await prisma.$transaction([
            prisma.Event.delete({
                where: {
                    id: id
                }
            })
        ])
    // } catch(err) {
    //     console.log(err)
    //     throw new Error("Failed to delete event")
    // }
    revalidatePath("/dashboard/events")
}

const EventPage = async({searchParams}) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const [count, events] = await getEvents(q, page)

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for event"/>
                <Link href="/dashboard/events/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Location</td>
                        <td>Date</td>
                        <td>Created At</td>
                        <td>Updated At</td>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                    <tr key={event.id}>
                        <td>
                            <div className={styles.event}>
                                <Image
                                    src={event.image_loc || "/noproduct.png"}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.eventImage}
                                />
                                {event.title}
                            </div>
                        </td>
                        <td>{event.description}</td>
                        <td>{event.location}</td>
                        <td>{event.date.toLocaleDateString()}<br/>{event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                        <td>{event.createdAt.toLocaleDateString()}<br/>{event.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                        <td>{event.updatedAt.toLocaleDateString()}<br/>{event.updatedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/dashboard/events/${encodeURIComponent(event.id)}`}>
                                    <button className={`${styles.button} ${styles.view}`}>View</button>
                                </Link>
                                <form action={deleteEvent}>
                                    <input type="hidden" name='id' value={event.id} />                                      
                                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Paging count={count}/>
        </div>
    )
}

export default EventPage