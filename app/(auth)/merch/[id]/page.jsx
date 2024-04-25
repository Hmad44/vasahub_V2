import Stripe from "stripe"
import { auth } from "@/app/lib/auth"
import CheckoutForm from "@/app/ui/checkoutForm/checkoutForm"
import prisma from "@/lib/prisma"

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

const PurchasePage = async ({params}) => {
    const session = await auth()

    const { id } = params;
    const product = await getMerch(id)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.costInCents,
        currency: "USD",
        receipt_email: session.user.email,
        metadata: {
            productID: product.id,
            email: session.user.email
        }
    })

    if (await paymentIntent.client_secret == null) {
        throw Error("Stripe failed to create payment intent.")
    }

    return (
        <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
    )
}

export default PurchasePage