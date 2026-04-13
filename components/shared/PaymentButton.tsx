"use client"

import { useState } from "react"
import { stripePromise } from "@/lib/stripe"
import { Button } from "../ui/button"

import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { createPaymentIntent } from "@/services/payment.service"

export default function PaymentButton({ ideaId, price }: { ideaId: string; price: number | undefined}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  // console.log(ideaId);
  const handlePayment = async () => {
    const data=await createPaymentIntent(ideaId,price)

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