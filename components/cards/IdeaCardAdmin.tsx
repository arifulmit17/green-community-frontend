import Link from "next/link"
import IdeaStatusActions from "../shared/ChangeIdeaStatus"
import { useEffect, useState } from "react"
import { getUser } from "@/services/auth.service"
import Image from "next/image"

type Idea = {
  id: string
  title: string
  description: string
  isPaid: boolean
  price?: number
  image?: string
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  author: {
    name: string
  }
  category: {
    name: string
  }
  votes: {
    type: "UP" | "DOWN"
  }[]
}

export default function IdeaCard({ idea}: { idea: Idea;  }) {
    
  
  

  // 🔥 Calculate vote score
  const voteCount = idea.votes.reduce((acc, v) => {
    return v.type === "UP" ? acc + 1 : acc - 1
  }, 0)

  return (
    <div className="group lg:h-100 h-120 relative rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">

      {/* 🌟 Paid Badge */}
      {idea?.isPaid && (
        <div className="absolute -top-3 -right-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-white shadow">
          💰 Paid
        </div>
      )}

      {/* 🌿 Header */}
      <div className="flex items-center gap-4">

        {/* Avatar (Author initial) */}
              <div className="h-20 w-20 rounded-full overflow-hidden bg-card flex items-center justify-center">
         {idea?.image ? (
           <Image
             src={idea?.image}
             alt={idea?.title}
             width={48}
             height={48}
             className="object-cover w-full h-full"
           />
         ) : (
           <span className="text-sm font-bold text-green-700">
             {idea?.author?.name?.charAt(0) || "U"}
           </span>
         )}
       </div>

        <div className="flex-1">
          <div className="w-11/12 h-10">
             <h3 className="text-lg font-semibold leading-tight capitalize">
            {idea?.title}
          </h3>

          </div>
         
          <p className="text-sm text-muted-foreground">
            by {idea?.author?.name} · 🌿 {idea?.category?.name}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-muted" />

      {/* 🌱 Description */}
      <div className="w-11/12 h-1/5">
        <p className="text-sm text-muted-foreground line-clamp-3">
        {idea?.description}
      </p>

      </div>
      

      {/* Divider */}
      <div className="my-4 h-px bg-muted" />

      {/* 📊 Stats */}
      <div className="flex items-center justify-between">
        
        {/* Votes */}
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Community Votes
          </p>
          <p className="text-2xl font-bold text-green-600">
            {voteCount}
          </p>
        </div>

        {/* Status */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            idea?.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : idea?.status === "UNDER_REVIEW"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {idea?.status.replace("_", " ")}
        </span>
        {/* Price */}
        <span className="text-sm text-muted-foreground">
          {idea?.isPaid ? `৳${idea?.price}` : "Free"}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-5 flex gap-5 items-center justify-between">
        
        

    {/* Status update */}
         
         <IdeaStatusActions ideaId={idea.id} currentStatus={idea.status} />
         

        <Link
          href={`/ideas/${idea?.id}`}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          View Idea →
        </Link>
      </div>
    </div>
  )
}