"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUser } from "@/services/auth.service"
import { getIdeas } from "@/services/idea2.service"
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image"

type idea = {
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
function IdeaSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5 space-y-4">
        
        {/* Category */}
        <Skeleton className="h-5 w-24 rounded-full" />

        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />

        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>

      </CardContent>
    </Card>
  );
}

export default function PopularIdeas() {
  const [Ideas, setIdeas] = useState<idea[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  // console.log("Popular Ideas:", Ideas);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const result = await getIdeas()
         

const ideas = Array.isArray(result) ? result : []
console.log("popular ideas:",ideas);
const sorted = ideas.sort((a: idea, b: idea) => {
  const scoreA = a.votes.reduce(
    (acc, v) => (v.type === "UP" ? acc + 1 : acc - 1),
    0
  )
  const scoreB = b.votes.reduce(
    (acc, v) => (v.type === "UP" ? acc + 1 : acc - 1),
    0
  )
  return scoreB - scoreA
})

        setIdeas(sorted.slice(0, 4)) // top 4
      } catch (err) {
        console.error("Failed to fetch Ideas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
       const user=await getUser()
       setUser(user)
    }
    fetchUser()
  },[])

  return (
    <div className="w-11/12 mx-auto py-10 space-y-6">

      {/* 🌿 Header */}
      <div className="flex justify-between items-center">

        <Link
          href="/ideas"
          className="text-sm text-green-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Loading */}
      {loading && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
    {Array.from({ length: 4 }).map((_, i) => (
      <IdeaSkeleton key={i} />
    ))}
  </div>
)}

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Ideas.map((idea) => {
          const voteCount = idea.votes.reduce(
            (acc, v) => (v.type === "UP" ? acc + 1 : acc - 1),
            0
          )

          return (
            <Card
              key={idea.id}
              className="rounded-2xl hover:shadow-lg transition"
            >
              <CardContent className="p-5 space-y-3">
                {/* 🌟 Paid Badge */}
      {idea?.isPaid && (
        <div className="absolute -top-3 -right-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-white shadow">
          💰 Paid
        </div>
      )}


                {/* Category */}
                <Badge className="bg-green-100 text-green-700">
                  🌿 {idea.category?.name}
                </Badge>

                 {/* Avatar (Author initial) */}
                       <div className="h-20 w-11/12 rounded-2xl overflow-hidden bg-card flex items-center justify-center">
                  {idea?.image ? (
                    <Image
                      src={idea?.image}
                      alt={idea?.title}
                      width={100}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-sm font-bold text-green-700">
                      {idea?.author?.name?.charAt(0) || "U"}
                    </span>
                  )}
                  </div>



                {/* Title */}
                <div className="w-11/12 h-10">
                  <h3 className="text-lg font-semibold line-clamp-2">
                  {idea.title}
                </h3>

                </div>
                

                {/* Description */}
                <div className="w-11/12 h-20">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                  {idea.description}
                </p>

                </div>
                

                {/* Footer */}
                <div className="flex justify-between items-center pt-2">

                  {/* Votes */}
                  <span className="text-green-600 font-bold">
                    👍 {voteCount}
                  </span>

                  {/* Link */}
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

              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty */}
      {!loading && Ideas.length === 0 && (
        <p className="text-center text-muted-foreground">
          No popular Ideas yet 🌿
        </p>
      )}
    </div>
  )
}