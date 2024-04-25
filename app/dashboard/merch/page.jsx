import prisma from '@/lib/prisma.js'
import styles from '@/app/ui/dashboard/merch/merch.module.css'
import Paging from '@/app/ui/paging/paging'
import Search from '@/app/ui/search/search'
import { revalidatePath } from 'next/cache'
import Link from "next/link"
import Image from "next/image"

async function getMerch(q, page){
    const ITEMS_PER_PAGE = 2
    try {
        const [count, merchs] = await prisma.$transaction([
            prisma.Merch.count(),
            prisma.Merch.findMany({
                orderBy: {
                    createdAt: "asc"
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
        return [count, merchs];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to view merch")
    }
}

async function deleteMerch(formData) {
    "use server"
    const { id } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.Merch.delete({
                where: {
                    id: id
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete merch")
    }
    revalidatePath("/dashboard/merch")
}

const MerchPage = async({searchParams}) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const [count, merchs] = await getMerch(q, page)

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for merch"/>
                <Link href="/dashboard/merch/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Cost</td>
                        <td>Description</td>
                        <td>Availability</td>
                        <td>Created At</td>
                        <td>Updated At</td>
                    </tr>
                </thead>
                <tbody>
                    {merchs.map(merch => (
                    <tr key={merch.id}>
                        <td>
                            <div className={styles.merch}>
                                <Image
                                    src={merch.image_loc || "/noproduct.png"}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.merchImage}
                                />
                                {merch.title}
                            </div>
                        </td>
                        <td>${merch.costInCents/100}</td>
                        <td>{merch.description}</td>
                        <td>{merch.isAvailable ? "Available" : "Not Available"}</td>
                        <td>{merch.createdAt.toLocaleDateString()}<br/>{merch.createdAt.toLocaleTimeString()}</td>
                        <td>{merch.updatedAt.toLocaleDateString()}<br/>{merch.updatedAt.toLocaleTimeString()}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/dashboard/merch/${encodeURIComponent(merch.id)}`}>
                                    <button className={`${styles.button} ${styles.view}`}>View</button>
                                </Link>
                                <form action={deleteMerch}>
                                    <input type="hidden" name='id' value={merch.id} />                                      
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

export default MerchPage