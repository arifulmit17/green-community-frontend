import Link from "next/link"

import VoteButtons from './../shared/VoteButton';
import DeleteIdeaButton from "../shared/DeleteIdea";
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth.service";

import EditIdeaModal from "../shared/EditIdeaModal";
import Image from "next/image";
import { Button } from "@/components/ui/button";


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
  const voteCount = idea.votes?.length ?? 0
  const authorInitial = idea?.author?.name?.charAt(0)?.toUpperCase() || "U"

  return (
    <article className="group relative overflow-hidden rounded-[28px] bg-white/90 shadow-[0_18px_40px_rgba(15,118,110,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,118,110,0.16)]">
      {/* 🌟 Paid Badge */}
      {idea?.isPaid && (
        <div className="absolute right-4 top-4 z-20 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-900 shadow-lg shadow-amber-200">
          Paid
        </div>
      )}

      <div className="relative h-64 overflow-hidden bg-emerald-50 sm:h-72">
        {idea?.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 text-5xl font-bold text-emerald-700">
            {authorInitial}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {idea?.category?.name}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
              idea?.status === "APPROVED"
                ? "bg-emerald-500 text-white"
                : idea?.status === "UNDER_REVIEW"
                ? "bg-amber-400 text-slate-900"
                : "bg-rose-500 text-white"
            }`}
          >
            {idea?.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              {authorInitial}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                by {idea?.author?.name}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {idea?.isPaid ? `৳${idea?.price}` : "Free"}
          </span>
        </div>

        <Link href={`/ideas/${idea?.id}`} className="mt-4 block">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-700">
            {idea?.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {idea?.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
          {idea.author?.id !== user?.id && user?.role !== "ADMIN" && (
            <VoteButtons ideaId={idea.id} votes={idea.votes} />
          )}

          <div className="ml-auto text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Community Votes
            </p>
            <p className="text-2xl font-black text-emerald-600">{voteCount}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {idea.status !== "APPROVED" && idea.author?.id === user?.id && (
              <>
                <DeleteIdeaButton ideaId={idea.id} />
                <EditIdeaModal idea={idea} />
              </>
            )}
          </div>

          {user ? (
            <Button asChild size="sm">
              <Link href={`/ideas/${idea?.id}`}>View Idea →</Link>
            </Button>
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link href={`/login`}>View Idea →</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}