"use client"

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const card = elements.getElement(CardElement)
    if (!card) return

    setLoading(true)

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    })

    if (result.error) {
      toast.error(result.error.message)
    } else if (result.paymentIntent?.status === "succeeded") {
      toast.success("Payment successful 🌿")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} className="p-3 bg-white border rounded-md" />

      <Button disabled={loading}>
        {loading ? "Processing..." : "Confirm Payment"}
      </Button>
    </form>
  )
}