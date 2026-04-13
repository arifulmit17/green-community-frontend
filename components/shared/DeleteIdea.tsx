"use client"

import { Button } from "@/components/ui/button"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteIdea } from "@/services/idea2.service"

export default function DeleteIdeaButton({ ideaId }: { ideaId: string  }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this idea?"
    )

    if (!confirmed) return

    try {
    const result=  await deleteIdea(ideaId)
    // console.log(result);
    if(result){
      toast.success("Idea deleted successfully")
      router.refresh()
    }else{
      toast.error("Failed to delete idea")
    }

      
    } catch (error) {
      // console.error(error)
      toast.error("Failed to delete idea")
    }
  }

  return (
    <Button
      onClick={handleDelete}
      size="sm"
      variant="outline"
      className="text-red-600 border-red-200 hover:bg-red-50"
    >
      Delete
    </Button>
  )
}
