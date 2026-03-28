"use client"

import IdeaCard from '@/components/cards/IdeaCard'
// import SearchFormCustom from '@/components/modules/shared/SearchFormCustom'
import React, { useState } from 'react'

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
  }
  votes: {
    type: "UP" | "DOWN"
  }[]
}

export default function IdeaPage() {

  const [allIdeas, setAllIdeas] = useState<Idea[]>([])
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Extract categories dynamically
  const categories = Array.from(
    new Set(allIdeas?.map((i) => i.category?.name).filter(Boolean))
  )

  return (
    <div className='flex flex-col gap-10'>

      {/* 🔍 Search */}
      {/* <div>
        <SearchFormCustom onResults={(results: Idea[]) => {
          setAllIdeas(results)
          setIdeas(results)
        }} />
      </div> */}

      {/* 🌿 Category Filter */}
      <div className="w-11/12 mx-auto flex gap-4 items-center">
        <label className="text-sm font-medium">Filter by category:</label>

        <select
          value={selectedCategory}
          onChange={(e) => {
            const value = e.target.value
            setSelectedCategory(value)

            if (value === "all") {
              setIdeas(allIdeas)
            } else {
              setIdeas(
                allIdeas?.filter(
                  (idea) => idea.category?.name === value
                )
              )
            }
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🌱 Ideas Grid */}
      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
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

    </div>
  )
}