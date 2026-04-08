"use client"

import { voteIdea } from "@/services/idea2.service"
import { useState } from "react"

import { toast } from "sonner"


type Props = {
  ideaId: string
  votes: { type: "UP" | "DOWN" }[]
  userVote?: "UP" | "DOWN" | null
}

export default function VoteButtons({
  ideaId,
  votes,
  userVote: initialUserVote,
}: Props) {
  const [userVote, setUserVote] = useState(initialUserVote || null)
  const [voteCount, setVoteCount] = useState(
    votes.reduce((acc, v) => (v.type === "UP" ? acc + 1 : acc - 1), 0)
  )
  const [loading, setLoading] = useState(false)

  const handleVote = async (type: "UP" | "DOWN") => {
    if (loading) return
    setLoading(true)

    let newVote: "UP" | "DOWN" | null = type

    // 🔁 Toggle logic
    if (userVote === type) {
      newVote = null
    }

    // 🔥 Optimistic UI update
    let newCount = voteCount

    if (userVote === "UP") newCount -= 1
    if (userVote === "DOWN") newCount += 1

    if (newVote === "UP") newCount += 1
    if (newVote === "DOWN") newCount -= 1

    setUserVote(newVote)
    setVoteCount(newCount)

    try {
      const res = await voteIdea(ideaId, type)

      if (!res.success) {
        toast.error("Vote failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 w-12">

       
      <button
        onClick={() => handleVote("UP")}
        disabled={loading}
        className={`text-xl transition ${
          userVote === "UP"
            ? "text-green-600 scale-110"
            : "text-gray-400 hover:text-green-500"
        }`}
      >
        👍
      </button>

      {/* 🔢 Count */}
      <span
        className={`text-sm font-bold ${
          voteCount > 0
            ? "text-green-600"
            : voteCount < 0
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {voteCount}
      </span>

      {/* 🔽 Downvote */}
      <button
        onClick={() => handleVote("DOWN")}
        disabled={loading}
        className={`text-xl transition ${
          userVote === "DOWN"
            ? "text-red-500 scale-110"
            : "text-gray-400 hover:text-red-400"
        }`}
      >
        👎
      </button>
    </div>
  )
}