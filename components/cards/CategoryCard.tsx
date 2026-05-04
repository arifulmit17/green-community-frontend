import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type CategoryCardProps = {
  category: {
    id: string
    name: string
    _count: {
      ideas: number
      votes: number
    }
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="w-full group rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md hover:border-green-500">
      
      <CardContent className="p-0 space-y-3">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold capitalize transition group-hover:text-green-600">
             {category?.name}
          </h3>

          <Badge className="bg-green-100 text-green-700">
            {category?._count?.ideas} Ideas
          </Badge>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>💡 {category?._count?.votes} Contributions</span>
        </div>

      </CardContent>
    </Card>
  )
}