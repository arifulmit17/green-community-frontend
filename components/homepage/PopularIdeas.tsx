"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Session = {
  id: string
  title: string
  description: string
  category: { name: string }
  votes: { type: "UP" | "DOWN" }[]
}

export default function PopularIdeas() {
  const [Ideas, setIdeas] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  console.log("Popular Ideas:", Ideas);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/idea`,
          {
            credentials: "include",
          }
        )

        const result = await res.json()

const ideas = Array.isArray(result.data) ? result.data : []

const sorted = ideas.sort((a: Session, b: Session) => {
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

        setIdeas(sorted.slice(0, 3)) // top 3
      } catch (err) {
        console.error("Failed to fetch Ideas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [])

  return (
    <div className="w-11/12 mx-auto py-10 space-y-6">

      {/* 🌿 Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🔥 Popular Ideas</h2>

        <Link
          href="/ideas"
          className="text-sm text-green-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-muted-foreground">Loading Ideas...</p>
      )}

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Ideas.map((session) => {
          const voteCount = session.votes.reduce(
            (acc, v) => (v.type === "UP" ? acc + 1 : acc - 1),
            0
          )

          return (
            <Card
              key={session.id}
              className="rounded-2xl hover:shadow-lg transition"
            >
              <CardContent className="p-5 space-y-3">

                {/* Category */}
                <Badge className="bg-green-100 text-green-700">
                  🌿 {session.category?.name}
                </Badge>

                {/* Title */}
                <h3 className="text-lg font-semibold line-clamp-2">
                  {session.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {session.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2">

                  {/* Votes */}
                  <span className="text-green-600 font-bold">
                    👍 {voteCount}
                  </span>

                  {/* Link */}
                  <Link
                    href={`/ideas/${session.id}`}
                    className="text-sm text-green-600 hover:underline"
                  >
                    View →
                  </Link>
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