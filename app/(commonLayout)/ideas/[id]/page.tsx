"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PaymentButton from "@/components/shared/PaymentButton"
import DeleteIdeaButton from "@/components/shared/DeleteIdea"
import { fetchIdeaById } from "@/services/idea2.service"
import { verifyPayment } from "@/services/payment.service"
import Image from "next/image"

type Idea = {
  id: string
  title: string
  problem: string
  solution: string
  description: string
  image?: string
  isPaid: boolean
  price?: number 
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  author: { name: string }
  category: { name: string }
  votes: { type: "UP" | "DOWN" }[]
  comments: any[]
}

type lockedIdea = {
  id: string
  price: number
  message: string
}

export default function IdeaDetailsPage() {
  const { id } = useParams()
  const [idea, setIdea] = useState<Idea | null>(null)
  const [loading, setLoading] = useState(true)
  const [locked, setLocked] = useState(false)
  const[lockedIdea,setLockedIdea]=useState<lockedIdea | null>(null)

  useEffect(() => {
    const fetchIdea = async () => {
      try {

        const data= await fetchIdeaById(id as string)

        
        console.log("idea data:",data);
        setLockedIdea(data)
        // 🔒 Paid idea protection

        const paymentIdea=await verifyPayment({ ideaId: id as string })
        console.log(paymentIdea);
        if(paymentIdea){
          setLocked(false)
        }
        if (data?.message) {
          setLocked(true)
        } else {
          setIdea(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIdea()
  }, [id])

  if (loading) return <p className="text-center py-20">Loading...</p>

  if (!idea && lockedIdea && locked)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">🔒 Premium Idea</h2>
        <p className="text-muted-foreground mt-2">
          This idea is paid. Purchase to unlock full content.
        </p>
        <h2>Price: ${lockedIdea.price}</h2>

         <PaymentButton ideaId={id as string} price={lockedIdea.price}></PaymentButton>
      </div>
    )

  if (!idea) return <p className="text-center py-20">Idea not found</p>

  // 🔥 Vote count
  const voteCount = idea?.votes?.reduce((acc, v) => {
  return v.type === "UP" ? acc + 1 : acc - 1
}, 0) ?? 0

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* 🌿 Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          {idea.title}
        </h1>

        <p className="text-muted-foreground mt-2">
          🌿 {idea?.category?.name} · by {idea?.author?.name}
        </p>
      </div>

      {/* 🖼 Image */}
      {idea?.image && (
        <Image
          src={idea?.image}
          alt={idea?.title}
          className="w-full h-[350px] object-cover rounded-xl mb-6"
          width={400}
          height={350}
        />
      )}

      {/* 📊 Stats */}
      <div className="flex items-center gap-6 mb-8">
        <span className="text-green-600 font-semibold">
          ⬆ {voteCount} Votes
        </span>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            idea.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : idea.status === "UNDER_REVIEW"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {idea.status}
        </span>
      </div>

      {/* 🌍 Problem */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🌍 Problem</h2>
        <p className="text-muted-foreground">{idea.problem}</p>
      </section>

      {/* 🌱 Solution */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🌱 Solution</h2>
        <p className="text-muted-foreground">{idea.solution}</p>
      </section>

      {/* 📖 Description */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📖 Full Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          {idea.description}
        </p>
      </section>

      {/* 💬 Comments */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          💬 Discussions ({idea.comments.length})
        </h2>

        {idea.comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet</p>
        ) : (
          <div className="space-y-4">
            {idea.comments.map((comment: any) => (
              <div
                key={comment.id}
                className="border rounded-lg p-4 bg-white"
              >
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* {Delete idea} */}
     {idea.status !== "APPROVED" && (
        <div>
          <DeleteIdeaButton ideaId={id as string}></DeleteIdeaButton>
        </div>
      )}

      {/* 🔙 Back */}
      <div className="mt-10">
        <Link href="/ideas">
          <Button variant="outline">← Back to Ideas</Button>
        </Link>
      </div>

    </div>
  )
}
