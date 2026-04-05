"use client"

import { useState } from "react"
import { stripePromise } from "@/lib/stripe"
import { Button } from "../ui/button"

import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

export default function PaymentButton({ ideaId }: { ideaId: string }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  console.log(ideaId);
  const handlePayment = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: 1000, // ৳1000
          ideaId: ideaId,
        }),
      }
    )

    const data = await res.json()

    setClientSecret(data.clientSecret)
  }

  return (
    <div className="space-y-4">
      {!clientSecret && (
        <Button onClick={handlePayment}>
          Pay Now 💳
        </Button>
      )}

      {/* 🌿 Show Checkout Form */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  )
}