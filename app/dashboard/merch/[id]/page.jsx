import styles from "@/app/ui/dashboard/merch/viewMerch/viewMerch.module.css"
import { getSingleMerch } from "@/app/lib/data"
import { updateMerch } from "@/app/lib/action";
import { MerchType } from "@prisma/client";

const ViewMerchPage = async ({params}) => {
    const { id } = params;
    const merch = await getSingleMerch(id)
    return (
        <div className={styles.container}>
            <form action={updateMerch} className={styles.form}>
                <input type="hidden" name="id" value={merch.id} />
                <label>Title</label>
                <input type="text" name="title" placeholder={merch.title} />
                <label>Cost</label>
                <input type="number" name="cost" placeholder={merch.costInCents/100} />
                <label>Type of Product</label>
                <select name='type'>
                    <option value={MerchType.MERCH} selected={merch.type == MerchType.MERCH}>Merchandise</option>
                    <option value={MerchType.DUES} selected={merch.type == MerchType.DUES}>Dues</option>
                    <option value={MerchType.SHIRT} selected={merch.type == MerchType.SHIRT}>Shirt</option>
                </select>
                <label>Availability</label>
                    <select name="isAvailable" id="isAvailable">
                        <option value={false} selected={merch.isAvailable == false}>Not Available</option>
                        <option value={true} selected={merch.isAvailable == true}>Available</option>
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

export default ViewMerchPage