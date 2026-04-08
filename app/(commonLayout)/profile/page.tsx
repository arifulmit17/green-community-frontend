"use client"

import { useEffect, useState } from "react"
import IdeaCard from "@/components/cards/IdeaCard"
import { Button } from "@/components/ui/button"
import { getUser } from "@/services/auth.service"

import { fetchIdeasByUser } from './../../../services/idea2.service';



type Idea = {
  id: string
  title: string
  description: string
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  category: { name: string }
  votes: { type: "UP" | "DOWN" }[]
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  // 🌿 Fetch user
  useEffect(() => {
      const fetchUser = async () => {
        const userData = await getUser()
        
        setUser(userData)
      }
  
      fetchUser()
    }, [])

  // 🌱 Fetch user's ideas
  useEffect(() => {
      const fetchIdeas = async () => {
        const ideaData=await fetchIdeasByUser(user?.id || "")
        
        setIdeas(ideaData)
        setLoading(false)
      }
  
      fetchIdeas()
    }, [user])

  // 📊 Calculate stats
  const totalVotes = ideas.reduce((acc, idea) => {
    return (
      acc +
      idea.votes.reduce((a, v) => (v.type === "UP" ? a + 1 : a - 1), 0)
    )
  }, 0)

  return (
    <div className="w-11/12 mx-auto py-10 space-y-10">

      {/* 🌿 Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-2xl shadow-sm">

        {/* Avatar */}
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
          {user?.name?.charAt(0) || "U"}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
          <p className="text-sm text-green-600 mt-1">
            🌿 {user?.role}
          </p>
        </div>

      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 border rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {ideas.length}
          </h3>
          <p className="text-sm text-muted-foreground">Ideas Submitted</p>
        </div>

        <div className="p-6 border rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {totalVotes}
          </h3>
          <p className="text-sm text-muted-foreground">Total Votes</p>
        </div>

        <div className="p-6 border rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {
              ideas.filter((i) => i.status === "APPROVED").length
            }
          </h3>
          <p className="text-sm text-muted-foreground">Approved Ideas</p>
        </div>

      </div>

      

    </div>
  )
}