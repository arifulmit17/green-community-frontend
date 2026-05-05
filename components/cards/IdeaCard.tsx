import Link from "next/link"

import VoteButtons from './../shared/VoteButton';
import DeleteIdeaButton from "../shared/DeleteIdea";
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth.service";

import EditIdeaModal from "../shared/EditIdeaModal";
import Image from "next/image";


type Idea = {
  id: string
  title: string
  description: string
  isPaid: boolean
  price?: number
  image?: string
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  author: {
    id: string
    name: string
  }
  category: {
    name: string
  }
  votes: {
    type: "UP" | "DOWN"
  }[]
}

export default function IdeaCard({ idea}: { idea: Idea; }) {
    const [user, setUser] = useState<any>(null)
  useEffect(()=>{
    const fetchUser=async()=>{
        const user=await getUser()
        setUser(user)
    }
    fetchUser()
  },[])
 

  // 🔥 Calculate vote score
  const voteCount = idea.votes.reduce((acc, v) => {
    return v.type === "UP" ? acc + 1 : acc + 1
  }, 0)

  return (
    <div className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">

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
          <h3 className="text-lg font-semibold leading-tight capitalize">
            {idea?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            by {idea?.author?.name} · 🌿 {idea?.category?.name}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-muted" />

      {/* 🌱 Description */}
      <p className="text-sm text-muted-foreground line-clamp-3">
        {idea?.description}
      </p>

      {/* Divider */}
      <div className="my-4 h-px bg-muted" />

      {/* 📊 Stats */}
      <div className="flex items-center justify-between">
      {idea.author?.id !== user?.id && user?.role !=="ADMIN" && <VoteButtons ideaId={idea.id} votes={idea.votes} />}  
        
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
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        
        {/* Price */}
        <span className="text-sm text-muted-foreground">
          {idea?.isPaid ? `৳${idea?.price}` : "Free"}
        </span>
        {idea.status!="APPROVED" && idea.author?.id === user?.id && <DeleteIdeaButton ideaId={idea.id} />}
        {idea.status!="APPROVED" && idea.author?.id === user?.id && <EditIdeaModal idea={idea}/>}
        

   
         

        {user && <Link
          href={`/ideas/${idea?.id}`}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          View Idea →
        </Link>}
        {!user && <Link
          href={`/login`}
          className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          View Idea →
        </Link>}
      </div>
    </div>
  )
}