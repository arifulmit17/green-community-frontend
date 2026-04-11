"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateIdea } from "@/services/idea2.service"
import { toast } from "sonner"

export default function EditIdeaModal({ idea, onUpdated }: any) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(idea.title)
  const [description, setDescription] = useState(idea.description)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)

    const updated = await updateIdea(idea.id, {
      title,
      description,
    })

    setLoading(false)

    if (updated) {
      toast.success("Idea updated successfully ✅")
      setOpen(false)

      // 🔥 optional: refresh parent
      onUpdated?.(updated)
    } else {
      toast.error("Update failed ❌")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          ✏️ Edit
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Idea 🌿</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Title */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Idea title"
          />

          {/* Description */}
          <textarea
            className="w-full border rounded p-2 min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Idea description"
          />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}