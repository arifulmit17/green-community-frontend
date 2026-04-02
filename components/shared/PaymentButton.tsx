"use client"

import { stripePromise } from "@/lib/stripe"

export default function PaymentButton() {
  const handlePayment = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000, // $10
        }),
      }
    )

    const { clientSecret } = await res.json()

    const stripe = await stripePromise

  }

  return (
    <button onClick={handlePayment}>
      Pay Now 💳
    </button>
  )
}