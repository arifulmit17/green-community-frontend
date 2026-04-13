"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createIdea } from "@/services/idea2.service"

type Category = {
  id: string
  name: string
}

export default function CreateIdeaPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    problem: "",
    solution: "",
    description: "",
    image: "",
    categoryId: "",
    isPaid: false,
    price: "",
  })

  // 🔄 Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
        )
        const {data} = await res.json()
        setCategories(data)
      } catch (err) {
        console.error("Category fetch error:", err)
      }
    }

    fetchCategories()
  }, [])

  // 📝 Handle change
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // 🚀 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const idea=createIdea(form)

      // console.log(idea);
      
         toast.success("🌿 Idea created successfully!")
      

     

      // reset form
      setForm({
        title: "",
        problem: "",
        solution: "",
        description: "",
        image: "",
        categoryId: "",
        isPaid: false,
        price: "",
      })
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="rounded-2xl border-green-100">
        <CardContent className="p-6 space-y-6">
          
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">🌱 Submit Your Idea</h1>
            <p className="text-muted-foreground text-sm">
              Share eco-friendly ideas to improve your community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Title */}
            <div>
              <Label>Idea Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Reduce plastic usage in markets"
                required
              />
            </div>

            {/* Problem */}
            <div>
              <Label>Problem</Label>
              <Textarea
                name="problem"
                value={form.problem}
                onChange={handleChange}
                placeholder="Describe the environmental problem..."
                required
              />
            </div>

            {/* Solution */}
            <div>
              <Label>Solution</Label>
              <Textarea
                name="solution"
                value={form.solution}
                onChange={handleChange}
                placeholder="Your proposed solution..."
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="More details about your idea..."
              />
            </div>

            {/* Image */}
            <div>
              <Label>Image URL</Label>
              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="">Select category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Paid Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPaid"
                checked={form.isPaid}
                onChange={handleChange}
              />
              <Label>This is a paid idea</Label>
            </div>

            {/* Price */}
            {form.isPaid && (
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? "Submitting..." : "Submit Idea 🌿"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}