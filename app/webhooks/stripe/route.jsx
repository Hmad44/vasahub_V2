import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"
import { getSingleMerch, addTransaction } from "@/app/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const event = stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature"), process.env.STRIPE_WEBHOOK_SECRET)

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productID = charge.metadata.productID
        const memberID = charge.metadata.memberID
        const pricePaidInCents = charge.amount

        const product = await getSingleMerch(productID)
        if (product == null || email == null) {
            return new NextResponse("Bad Request", { status: 400})
        }

        await addTransaction(productID, memberID, pricePaidInCents)
    }
    return new NextResponse()
}