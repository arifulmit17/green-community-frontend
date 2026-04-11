"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateUser } from "@/services/user.service"

export default function EditProfileModal({
  open,
  setOpen,
  user,
  onUpdate,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  user: any
  onUpdate: (data: any) => void
}) {
  const [name, setName] = useState(user?.name || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await updateUser(user.id, { name })
   
      if (result.success) {
        onUpdate(result.data)
        setOpen(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>✏️ Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile 🌿"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  )
}