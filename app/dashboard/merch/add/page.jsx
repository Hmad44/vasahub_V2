import prisma from '@/lib/prisma.js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import styles from '@/app/ui/dashboard/merch/addMerch/addMerch.module.css'

async function addMerch(formData) {
    "use server"
    const { title, description, cost, stock } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.Merch.create({
                data: {
                    title: title,
                    description: description,
                    costInCents: cost*100,
                    stock: parseInt(stock),
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to create merch")
    }
    revalidatePath("/dashboard/merch")
    redirect("/dashboard/merch")
}

const AddMerchPage = () => {
    return (
        <div className={styles.container}>
            <form action={addMerch} className={styles.form}>
                <input type="text" placeholder='Title' name='title' required />
                <input type="number" placeholder='Stock' name='stock' required />
                <input type="number" placeholder='Cost' name='cost' required />
                <textarea  
                    id="desc" 
                    rows="16" 
                    placeholder="Description" 
                    name="description"    
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddMerchPage