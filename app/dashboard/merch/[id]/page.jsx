import styles from "@/app/ui/dashboard/merch/viewMerch/viewMerch.module.css"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma.js'

async function getMerch(id){
    try {
        const merch = await prisma.$transaction([
            prisma.Merch.findUnique({
                where: {
                    id: id
                },
            })  
        ])
        return merch[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find merch")
    }
}

async function updateMerch(formData) {
    "use server"
    const { id, title, cost, isAvailable, description } = Object.fromEntries(formData);

    let isAvailable_bool = (isAvailable === 'true')
    console.log(isAvailable_bool)

    try {
        await prisma.$transaction([
            prisma.Merch.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    costInCents: Number(cost)*100 || undefined,
                    isAvailable: isAvailable_bool,
                    description: description || undefined
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to update merch")
    }
    revalidatePath("/dashboard/merch")
    redirect("/dashboard/merch")  
}

const ViewUserPage = async ({params}) => {
    const { id } = params;
    const merch = await getMerch(id)
    return (
        <div className={styles.container}>
            <form action={updateMerch} className={styles.form}>
                <input type="hidden" name="id" value={merch.id} />
                <label>Title</label>
                <input type="text" name="title" placeholder={merch.title} />
                <label>Cost</label>
                <input type="number" name="cost" placeholder={merch.costInCents/100} />
                <label>Availability</label>
                    <select name="isAvailable" id="isAvailable">
                        <option value={true} selected={merch.isAvailable == true}>Available</option>
                        <option value={false} selected={merch.isAvailable == false}>Not Available</option>
                    </select>
                <label>Description</label>
                <textarea 
                    name="description" 
                    id="description" 
                    rows="10" 
                    placeholder={merch.description} >
                </textarea>
                <button>Update</button>
            </form>
        </div>
    )
}

export default ViewUserPage