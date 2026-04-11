"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { z } from "zod"


export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(100, "Email is too long")

  const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault()

  const validation = emailSchema.safeParse(email)
  if (!validation.success) {
    return toast.error(validation.error.issues[0].message)
  }

  setLoading(true)

  try {
    console.log("Subscribed:", validation.data) // use validated data
    setEmail("")
    toast.success("🌱 Successfully subscribed!")
  } catch (error) {
    toast.error("Something went wrong")
  } finally {
    setLoading(false)
  }
}
  return (
    <section className="w-full py-20 bg-green-50">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* 🌿 Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          Join Our Green Community 🌱
        </h2>

        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Get eco-friendly ideas, sustainability tips, and inspiring community
          projects delivered straight to your inbox.
        </p>

        {/* 📩 Form */}
        <form
          onSubmit={handleSubscribe}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-sm"
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? "Subscribing..." : "Subscribe 🌿"}
          </Button>
        </form>

        {/* 🌍 Extra trust text */}
        <p className="text-xs text-muted-foreground mt-4">
          No spam. Only meaningful green ideas 🌎
        </p>

      </div>
    </section>
  )
}