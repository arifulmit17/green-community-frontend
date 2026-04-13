"use client"

import { useEffect, useState } from "react"
import IdeaCard from "@/components/cards/IdeaCard"
import { getUser } from "@/services/auth.service"
import { fetchIdeasByUser } from "@/services/idea2.service"


type Idea = {
  id: string
  title: string
  description: string
  isPaid: boolean
  price?: number
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

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  

  const [user, setUser] = useState<any>(null)

useEffect(() => {
  const getUserData = async () => {
    const result = await getUser()
    // console.log("idea user",result);
    setUser(result)
  }

  getUserData()
}, [])
  // console.log(user?.id);
  
  
  useEffect(() => {
    const loadIdeas = async () => {
      if (!user) return

      const data = await fetchIdeasByUser(user.id)
      
      setIdeas(data)
      setLoading(false)
    }

    loadIdeas()
  }, [user])
// console.log(ideas);

 

  return (
    <div suppressHydrationWarning className="w-11/12 mx-auto py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">🌱 My Ideas</h1>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-muted-foreground">
          Loading your ideas...
        </div>
      )}

      {/* Empty State */}
      {!loading && ideas.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-lg font-medium">No ideas found 🌿</p>
          <p className="text-sm">
            Start by submitting your first eco-friendly idea!
          </p>
        </div>
      )}

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  )
}