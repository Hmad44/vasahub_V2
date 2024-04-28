import Stripe from "stripe"
import { auth } from "@/app/lib/auth"
import CheckoutForm from "@/app/ui/checkoutForm/checkoutForm"
import { getSingleMerch } from "@/app/lib/data"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PurchasePage = async ({params}) => {
    const session = await auth()

    const { id } = params;
    const product = await getSingleMerch(id)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.costInCents,
        currency: "USD",
        receipt_email: session.user.email,
        metadata: {
            productID: product.id,
            email: session.user.email,
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