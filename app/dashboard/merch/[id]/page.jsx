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
    const { id, title, cost, stock, description } = Object.fromEntries(formData);

    try {
        await prisma.$transaction([
            prisma.Merch.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    costInCents: parseInt(cost)*100 || undefined,
                    stock: parseInt(stock) || undefined,
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
                <label>Stock</label>
                <input type="number" name="stock" placeholder={merch.stock} />
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