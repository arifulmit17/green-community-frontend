"use client"


import IdeaCardAdmin from '@/components/cards/IdeaCardAdmin'
import { getIdeas } from '@/services/idea2.service'
import React, { useEffect, useState } from 'react'

type Idea = {
  id: string
  title: string
  description: string
  isPaid: boolean
  price?: number
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  author: {
    name: string
    email: string
  }
  category: {
    name: string
    id: string
  }
  votes: {
    type: "UP" | "DOWN"
  }[]
}

export default function IdeaPage() {

  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
   useEffect(() => {
      const fetchAllIdeas = async () => {
        try {
          
              const data = await getIdeas()
          
          //  console.log(data);
          
          setIdeas(data)
  
          
          

         
        } catch (error) {
          console.error("Error fetching ideas:", error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchAllIdeas()
    }, [])
  

  return (
    <div className='flex flex-col gap-10'>


      {/* 🌱 Ideas Grid */}
      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <IdeaCardAdmin key={idea.id} idea={idea} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <p className="text-lg font-medium">No ideas found 🌱</p>
            <p className="text-sm">
              Try searching or selecting a different category.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}