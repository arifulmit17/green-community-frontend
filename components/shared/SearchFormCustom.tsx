"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { getCategories } from "@/services/category2.service"
import { get } from "http"
import { getIdeasSearch } from "@/services/idea2.service"

type Category = {
  id: string
  name: string
}

export default function SearchFormCustom({
  onResults,
}: {
  onResults: (data: any[]) => void
}) {
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(false)

  // 🌿 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        
        // console.log(data);
        setCategories(data)
      } catch (error) {
        console.error("Category fetch error:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const params = new URLSearchParams()
       
      if (search) params.append("search", search)
if (selectedCategory) params.append("categoryId", selectedCategory)

      const data = await getIdeasSearch(params.toString())

      
    //   console.log(data);
      onResults(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-green-100">
      <CardContent className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3"
        >

          {/* 🔍 Search */}
          <Input
            placeholder="Search ideas by title, keyword, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 focus-visible:ring-green-500"
          />

          {/* 🌿 Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border bg-background rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            {categories.length > 0 && (
  categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))
)}
          </select>

          {/* 🔘 Button */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? "Searching..." : "Search 🌿"}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}