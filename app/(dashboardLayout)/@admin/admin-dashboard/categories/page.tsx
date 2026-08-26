"use client"

import { useEffect, useState } from "react"
import { Plus, Tags } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CategoryCard } from "@/components/cards/CategoryCard"
import {
  createCategory,
  getCategories,
} from "@/services/category2.service"

type Category = {
  id: string
  name: string
  slug: string | null
  description: string | null
  icon: string | null
  color: string | null
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
  _count: {
    ideas: number
    votes: number
  }
}

export default function CreateCategoryPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "Lightbulb",
    color: "#22C55E",
    isActive: true,
    isFeatured: false,
    sortOrder: "0",
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      setFetching(true)

      const data = await getCategories()

      setCategories(data || [])
    } catch (error) {
      console.error("Category fetch error:", error)
      toast.error("Failed to load categories")
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const trimmedName = form.name.trim()

    if (!trimmedName) {
      toast.error("Category name is required")
      return
    }

    setLoading(true)

    try {
      const data = await createCategory({
        name: trimmedName,
        description: form.description.trim() || undefined,
        icon: form.icon,
        color: form.color,
        isActive: form.isActive,
        isFeatured: form.isFeatured,
        sortOrder: Number(form.sortOrder) || 0,
      })

      if (!data?.success) {
        toast.error(
          data?.message || "Failed to create category"
        )
        return
      }

      toast.success("🌿 Category created successfully!")

      setForm({
        name: "",
        description: "",
        icon: "Lightbulb",
        color: "#22C55E",
        isActive: true,
        isFeatured: false,
        sortOrder: "0",
      })
      setIsCreateOpen(false)

      // Refresh category list
      await fetchCategories()
    } catch (error) {
      console.error("Create category error:", error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 p-6 lg:p-10">

      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Tags className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Category Management
            </h1>

            <p className="text-sm text-muted-foreground">
              Create, manage, and organize community categories.
            </p>
          </div>
        </div>
      </div>

      {/* Create Category */}
      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create category</DialogTitle>
              <DialogDescription>
                Add a category to organize community ideas.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category name</Label>
                <Input
                  id="category-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Waste Management"
                  disabled={loading}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What kind of ideas belong here?"
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category-icon">Icon</Label>
                  <select
                    id="category-icon"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    disabled={loading}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {['Lightbulb', 'Leaf', 'Recycle', 'Laptop', 'Users', 'Sprout', 'Zap'].map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category-color">Color</Label>
                  <Input
                    id="category-color"
                    type="color"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    disabled={loading}
                    className="h-9 cursor-pointer p-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category-order">Sort order</Label>
                  <Input
                    id="category-order"
                    type="number"
                    min="0"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    disabled={loading}
                    className="h-4 w-4 accent-green-600"
                  />
                  Active category
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    disabled={loading}
                    className="h-4 w-4 accent-green-600"
                  />
                  Featured category
                </label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !form.name.trim()} className="bg-green-600 hover:bg-green-700">
                  {loading ? "Creating..." : "Create category"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Divider */}
      <Separator />

      {/* Categories Section */}
      <section className="space-y-5">

        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Categories
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your existing community categories.
            </p>
          </div>

          <div className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            {categories.length}{" "}
            {categories.length === 1
              ? "Category"
              : "Categories"}
          </div>
        </div>

        {/* Loading */}
        {fetching ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          /* Empty State */
          <Card className="rounded-2xl border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Tags className="h-6 w-6" />
              </div>

              <h3 className="font-semibold">
                No categories yet
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Create your first category to start organizing
                community ideas.
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Category Grid */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                showActions
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}