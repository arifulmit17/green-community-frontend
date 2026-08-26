"use client"

import { useState } from "react"
import {
  ArrowRight,
  Pencil,
  Trash2,
  Lightbulb,
  Laptop,
  GraduationCap,
  HeartPulse,
  Leaf,
  BriefcaseBusiness,
  Users,
  Recycle,
  Zap,
  Trash2 as TrashIcon,
  Sprout,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  deleteCategory,
  updateCategory,
} from "@/services/category2.service"

type CategoryCardProps = {
  category: {
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
  showActions?: boolean
}

const iconMap = {
  Lightbulb,
  Laptop,
  GraduationCap,
  HeartPulse,
  Leaf,
  BriefcaseBusiness,
  Users,
  Recycle,
  Zap,
  Trash2: TrashIcon,
  Sprout,
}

export function CategoryCard({
  category,
  showActions = false,
}: CategoryCardProps) {
  const router = useRouter()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [name, setName] = useState(category.name)
  const [loading, setLoading] = useState(false)

  const Icon =
    category.icon && category.icon in iconMap
      ? iconMap[category.icon as keyof typeof iconMap]
      : Lightbulb

  const categoryColor = category.color || "#22C55E"

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) return

    setLoading(true)

    const result = await updateCategory(category.id, trimmedName)

    setLoading(false)

    if (!result?.success) {
      toast.error(result?.message || "Failed to update category")
      return
    }

    toast.success("Category updated successfully")
    setIsEditOpen(false)

    router.refresh()
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete the ${category.name} category?`
      )
    ) {
      return
    }

    setLoading(true)

    const result = await deleteCategory(category.id)

    setLoading(false)

    if (!result?.success) {
      toast.error(result?.message || "Failed to delete category")
      return
    }

    toast.success("Category deleted successfully")

    router.refresh()
  }

  return (
    <>
      <Card
        className="group relative w-full overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        style={{
          borderColor: `${categoryColor}20`,
        }}
      >
        {/* Top accent */}
        <div
          className="absolute inset-x-0 top-0 h-1 opacity-80"
          style={{ backgroundColor: categoryColor }}
        />

        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <Link
              href={`/ideas?categoryId=${category.id}`}
              className="flex min-w-0 items-center gap-3"
            >
              {/* Icon */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor,
                }}
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Name */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-base font-semibold capitalize text-foreground transition-colors group-hover:text-green-600">
                    {category.name}
                  </h3>

                  {category.isFeatured && (
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700"
                    >
                      Featured
                    </Badge>
                  )}
                </div>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  /{category.slug || category.name.toLowerCase()}
                </p>
              </div>
            </Link>

            {/* Actions / Ideas */}
            <div className="flex shrink-0 items-center gap-1">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor,
                }}
              >
                {category._count.ideas} Ideas
              </Badge>

              {showActions && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    title="Edit category"
                    disabled={loading}
                    onClick={() => setIsEditOpen(true)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">
                      Edit category
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    title="Delete category"
                    disabled={loading}
                    onClick={handleDelete}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">
                      Delete category
                    </span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <Link
            href={`/ideas?categoryId=${category.id}`}
            className="mt-4 block"
          >
            <p className="line-clamp-2 min-h-[40px] text-sm leading-5 text-muted-foreground">
              {category.description ||
                "Explore ideas and discussions in this category."}
            </p>
          </Link>

          {/* Stats */}
          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-4">
              {/* Contributions */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  👍
                </div>

                <div>
                  <p className="font-semibold leading-none text-foreground">
                    {category._count.votes}
                  </p>

                  <p className="mt-1 text-xs">
                    Contributions
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    category.isActive
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />

                <span className="text-xs text-muted-foreground">
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* View */}
            <Link
              href={`/ideas?categoryId=${category.id}`}
              aria-label={`View ideas in ${category.name} category`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-green-100 hover:text-green-600 group-hover:translate-x-0.5"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {showActions && (
        <Dialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Edit category
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`category-${category.id}`}>
                  Category name
                </Label>

                <Input
                  id={`category-${category.id}`}
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  autoFocus
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setIsEditOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={
                    loading || !name.trim()
                  }
                >
                  {loading
                    ? "Saving..."
                    : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}