import Image from "next/image"
import styles from "./purchase-success.module.css"
import Stripe from "stripe"
import { notFound } from "next/navigation"
import Link from "next/link"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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


export default async function PaymentSuccessPage({searchParams}) {

    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

    if (paymentIntent.metadata.productID == null) {
        return notFound()
    }

    const product = await getMerch(paymentIntent.metadata.productID)
    if (product == null) {
        return notFound()
    }

    const isSuccess = (paymentIntent.status === "succeeded")

    return (
        <div className={styles.container}>
            <h1 className={styles.message}>{isSuccess ? "Success!" : "Error!"}</h1>
            <div className={styles.productContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
                <div className={styles.product}>
                    <div className={styles.productTitle}>{product.title}</div>
                    <div className={styles.productDesc}>{product.description}</div>
                </div>
                
            </div>
            {isSuccess ? <button className={styles.nextButton}><Link href={`/`}>Return to Home</Link></button> : <button className={styles.nextButton}><Link href={`/merch/${product.id}`}>Try Again</Link></button>}
        </div>
    )
}