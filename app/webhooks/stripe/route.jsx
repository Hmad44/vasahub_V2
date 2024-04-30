import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe"
import { getSingleMerch } from "@/app/lib/data";
import { MerchType } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const event = stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature"), process.env.STRIPE_WEBHOOK_SECRET)

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productID = charge.metadata.productID
        const memberID = charge.metadata.memberID
        const pricePaidInCents = charge.amount

        const product = await getSingleMerch(productID)

        if (product == null) {
            return new NextResponse("Bad Request", { status: 400})
        }

        const productType = await prisma.$transaction([
            prisma.Merch.findUnique({
                where: {
                    id: productID
                },
                select: {
                    type: true
                }
            })  
        ])

        if (productType[0].type == MerchType.DUES) {
            await prisma.$transaction([
                prisma.Member.update({
                    where: {
                        id: memberID
                    },
                    data: {
                        profile: {
                            update: {
                                data: {
                                    due_status: true
                                }
                            }
                        }
                    }
                })
            ])
        } else if (productType[0].type == MerchType.SHIRT) {
            await prisma.$transaction([
                prisma.Member.update({
                    where: {
                        id: memberID
                    },
                    data: {
                        profile: {
                            update: {
                                data: {
                                    shirt_status: true
                                }
                            }
                        }
                    }
                })
            ])
        }

        const member_name = await prisma.Member.findUnique({
            where: {
                id: memberID
            },
            select: {
                profile: {
                    select: {
                        f_name: true,
                        l_name: true
                    }
                }
            }
        })

        const product_name = await prisma.Merch.findUnique({
            where: {
                id: productID
            },
            select: {
                title: true
            }
        })

        await prisma.$transaction([
            prisma.Transactions.create({
                data: {
                    member_name: (member_name.profile.f_name + " " + member_name.profile.l_name),
                    merch_title: product_name.title,
                    costPaidInCents: pricePaidInCents,
                }
            })
        ])
    }
    return new NextResponse()
}