"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { CategoryCard } from "@/components/cards/CategoryCard"
import { createCategory, getCategories } from "@/services/category2.service"

type Category = {
  id: string
  name: string
   _count: {
      ideas: number
      votes: number
    }
}

export default function CreateCategoryPage() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const id =useParams()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {

      const data =await createCategory(name)
      // console.log("category data",data);

      if (!data) {
        toast.error( "Failed to create category")
        return
      }

      toast.success("🌿 Category created successfully!")
      setName("")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data=await getCategories()
          setCategories(data)
        } catch (err) {
          console.error("Category fetch error:", err)
        }
      }
  
      fetchCategories()
    }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        toast.error(data?.message || "Update failed")
        return
      }

      toast.success("🌿 Category updated successfully!")
      router.push("/categories") // redirect
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" flex flex-col gap-10 py-10">
      
        <div className="flex flex-col gap-10">
            <h1 className="text-xl font-bold text-center">
            🌱 Create Category
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-5">
              <Label>Category Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Waste Management"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </form>
       

        </div>
        
      
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {
        categories.map((category) => (
          <CategoryCard key={category.id} category={category}>
            
          </CategoryCard>
        ))

      }
    </div>
       
         
       
    </div>
  )
}