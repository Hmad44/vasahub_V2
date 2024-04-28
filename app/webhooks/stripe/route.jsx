import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe"
import { getSingleMerch } from "@/app/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const event = stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature"), process.env.STRIPE_WEBHOOK_SECRET)
    console.log(event.data.object.metadata.productID)
    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productID = charge.metadata.productID
        const memberID = charge.metadata.memberID
        const pricePaidInCents = charge.amount

        const product = await getSingleMerch(productID)

        if (product == null) {
            return new NextResponse("Bad Request", { status: 400})
        }

        await prisma.$transaction([
            prisma.Transactions.create({
                data: {
                    member_id: memberID,
                    merch_id: productID,
                    costPaidInCents: pricePaidInCents,
                }
            })
        ])
    }
    return new NextResponse()
}