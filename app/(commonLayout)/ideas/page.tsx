"use client"

import IdeaCard from '@/components/cards/IdeaCard'
import SearchFormCustom from '@/components/shared/SearchFormCustom'
import { getUser } from '@/services/auth.service'
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
    id: string
    name: string
    
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
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
const [itemsPerPage] = useState(4)
  const [sortOrder, setSortOrder] = useState<"HIGH" | "LOW">("HIGH")

  
const sortedIdeas = [...ideas].sort((a, b) => {
  const getVotes = (idea: Idea) =>
    idea.votes.reduce((acc, v) => acc + (v.type === "UP" ? 1 : -1), 0)

  return sortOrder === "HIGH"
    ? getVotes(b) - getVotes(a)
    : getVotes(a) - getVotes(b)
})

  useEffect(() => { 
    const fetchUser = async () => {
      const data = await getUser()
      setUser(data)
    }
    fetchUser()
  },[])

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await getIdeas()
       
        setIdeas(res)
      } catch (error) {
        console.error("Idea fetch error:", error)
      }
      
  }
  fetchIdeas()
},[user])
  // console.log(user);

  const totalPages = Math.ceil(sortedIdeas.length / itemsPerPage)

const paginatedIdeas = sortedIdeas.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
)
   
  return (
    <div className='flex flex-col gap-10'>

      {/* 🔍 Search + Category */}
      <SearchFormCustom  onResults={(data) => {
    setIdeas(data)
    setCurrentPage(1) // reset page
  }} />

      <div className="w-11/12 mx-auto flex justify-between items-center">
  <h2 className="text-xl font-semibold">Ideas</h2>

  <select
    className="border bg-background px-3 py-1 rounded"
    value={sortOrder}
    onChange={(e) => {
      setSortOrder(e.target.value as "HIGH" | "LOW")
      setCurrentPage(1) // reset page
    }}
  >
    <option value="HIGH">🔥 Most Voted</option>
    <option value="LOW">⬇️ Least Voted</option>
  </select>
</div>

      {/* 🌱 Ideas Grid */}
      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {paginatedIdeas.length > 0 ? (
  paginatedIdeas.map((idea) => (
    <IdeaCard key={idea.id} idea={idea} />
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
      <div className="flex justify-center items-center gap-4 py-6">

  <button
    className="px-3 py-1 border rounded disabled:opacity-50"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
  >
    ⬅ Prev
  </button>

  <span className="text-sm">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="px-3 py-1 border rounded disabled:opacity-50"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => prev + 1)}
  >
    Next ➡
  </button>

</div>

    </div>
  )
}