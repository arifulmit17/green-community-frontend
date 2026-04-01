"use client"

import { useEffect, useState } from "react"
import IdeaCard from "@/components/cards/IdeaCard"
import { Button } from "@/components/ui/button"

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
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("ALL")
  

  const [user, setUser] = useState<any>(null)

useEffect(() => {
  const getUser = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
      {
        credentials: "include",
      }
    )

    const result = await res.json()
    setUser(result.data)
  }

  getUser()
}, [])
  console.log(user?.id);
  
  
  useEffect(() => {
    const fetchMyIdeas = async () => {
      try {
        if (user){
            const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/idea/user/${user?.id}`,
          {
            credentials: "include", // 🔐 cookie auth
          }
        )
        const {data} = await res.json()
         console.log(data);
        
        setIdeas(data)
        setFilteredIdeas(data)

        }
        

        
       
      } catch (error) {
        console.error("Error fetching ideas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyIdeas()
  }, [user])

  // 🔍 Filter by status
  const handleFilter = (status: string) => {
    setStatusFilter(status)

    if (status === "ALL") {
      setFilteredIdeas(ideas)
    } else {
      setFilteredIdeas(
        ideas.filter((idea) => idea.status === status)
      )
    }
  }

  return (
    <div className="w-11/12 mx-auto py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">🌱 My Ideas</h1>

        {/* Filters */}
        <div className="flex gap-2">
          {["ALL", "APPROVED", "UNDER_REVIEW", "REJECTED"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => handleFilter(status)}
              className="text-sm"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-muted-foreground">
          Loading your ideas...
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredIdeas.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-lg font-medium">No ideas found 🌿</p>
          <p className="text-sm">
            Start by submitting your first eco-friendly idea!
          </p>
        </div>
      )}

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  )
}