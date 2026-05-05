"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { getUser } from "@/services/auth.service"
import { updateIdeaStatus } from "@/services/idea2.service"

type Props = {
  ideaId: string
  currentStatus: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
}

export default function IdeaStatusActions({
  ideaId,
  currentStatus,
}: Props) {
  const [loading, setLoading] = useState(false)
 
  const handleStatusChange = async (
    status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  ) => {
    setLoading(true)

    try {
      const res = await updateIdeaStatus(ideaId, status)

      if (res.success) {
        toast.success(`🌿 Status updated to ${status}`)
        window.location.reload() // quick fix
      } else {
        toast.error(res.message || "Failed to update")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 flex-wrap">
      <Button
        variant={currentStatus === "UNDER_REVIEW" ? "default" : "outline"}
        onClick={() => handleStatusChange("UNDER_REVIEW")}
        disabled={loading}
      >
        Review
      </Button>

      <Button
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={() => handleStatusChange("APPROVED")}
        disabled={loading}
      >
        Approve 🌱
      </Button>

      <Button
        variant="destructive"
        onClick={() => handleStatusChange("REJECTED")}
        disabled={loading}
      >
        Reject ❌
      </Button>
    </div>
  )
}