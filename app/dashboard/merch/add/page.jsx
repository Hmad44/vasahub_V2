import styles from '@/app/ui/dashboard/merch/addMerch/addMerch.module.css'
import { addMerch } from '@/app/lib/action'
import { MerchType } from '@prisma/client'

const AddMerchPage = () => {
    return (
        <div className={styles.container}>
            <form action={addMerch} className={styles.form}>
                <input type="text" placeholder='Title' name='title' required />
                <input type="number" placeholder='Cost' name='cost' required />
                <select name='type'>
                    <option value="" disabled>Choose type of product</option>
                    <option value={MerchType.MERCH}>Merchandise</option>
                    <option value={MerchType.DUES}>Dues</option>
                    <option value={MerchType.SHIRT}>Shirt</option>
                </select>
                <select name='isAvailable'>
                    <option value="" disabled>Choose Availability</option>
                    <option value={false}>Not Available</option>
                    <option value={true}>Available</option>
                </select>
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