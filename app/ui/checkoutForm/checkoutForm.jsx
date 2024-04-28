"use client"

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import styles from "./checkoutForm.module.css"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { useState } from "react"

const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)


function Form( {costInCents} ) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    async function handleSubmit(e) {
        e.preventDefault()

        if (stripe == null || elements == null) {
            return
        }

        setIsLoading(true)

        stripe.confirmPayment( { elements, confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}merch/stripe/purchase-success`
        }}).then(({ error }) => {
            if (error.type === "card_error" || error.type ==="validation_error") {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unknown error occured")
            }
        }).finally(() => setIsLoading(false))
    }

    return <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && (<div className={styles.errorMessage}>{errorMessage}</div>)}
            <button className={styles.purchaseButton} disabled={stripe == null || isLoading}>{isLoading ? "Purchasing..." : `Purchase - ${currencyFormat.format(costInCents/100)}`} </button>
        </form>
}

const CheckoutForm = ({ product, clientSecret}) => {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.productContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/No-Image-Placeholder.png" alt="" fill className={styles.img} />
                </div>
                <div className={styles.product}>
                    <div className={styles.productTitle}>{product.title}</div>
                    <div className={styles.productDesc}>{product.description}</div>
                </div>
            </div>
            <Elements options={{ clientSecret }} stripe={stripePromise}>
                    <Form costInCents={product.costInCents} />
            </Elements>
        </div>
        </>
    )
}

export default CheckoutForm