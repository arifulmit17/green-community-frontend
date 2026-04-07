"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type User = {
  id: string
  name: string
  email: string
  role: "ADMIN" | "MEMBER"
  status?: "ACTIVE" | "BLOCKED"
}

export default function MembersPage() {
  const [users, setUsers] = useState<User[]>([])
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
//   const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // 🌿 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
          { credentials: "include" }
        )

        const result = await res.json()
        const data = result.data || []

        setUsers(data)
        // setFilteredUsers(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

//   // 🔍 Search
//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(search.toLowerCase())
//     )
//     setFilteredUsers(filtered)
//   }, [search, users])

  // 🔥 Change Role
  const handleRoleChange = async (id: string, role: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role }),
        }
      )

      const result = await res.json()

      if (result.success) {
        setUsers(result.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      }
    )

    const result = await res.json()

    if (result.success) {
      // ✅ update only that user (not whole array)
      setUsers(result.data)
    }
  } catch (err) {
    console.error(err)
  }
}

  return (
    <div className="w-11/12 mx-auto py-10 space-y-8">

      {/* 🌿 Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">👥 All Members</h1>
      </div>

      {/* Loading */}
      {loading && <p>Loading users...</p>}

      {/* Table */}
      {!loading && (
        <div className="overflow-x-auto border rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
  users.map((user, index) => {
    if (!user || !user.id) return null // 🛡️ skip invalid user

    const role = user.role || "MEMBER"

    return (
     <tr key={user.id || index} className="border-t">

  {/* Name */}
  <td className="p-3">
    {user.name || "Unknown"}
  </td>

  {/* Email */}
  <td className="p-3">
    {user.email || "No email"}
  </td>

  {/* Role */}
  <td className="p-3">
    <span
      className={`px-2 py-1 rounded text-xs ${
        role === "ADMIN"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  </td>

  {/* 🟢 Status */}
  <td className="p-3">
    <span
      className={`px-2 py-1 rounded text-xs ${
        user.status === "BLOCKED"
          ? "bg-red-100 text-red-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {user.status || "ACTIVE"}
    </span>
  </td>

  {/* Actions */}
  <td className="p-3 text-center space-x-2">

    {/* Role */}
    {role === "MEMBER" ? (
      <Button
        size="sm"
        onClick={() =>
          user.id && handleRoleChange(user.id, "ADMIN")
        }
      >
        Make Admin
      </Button>
    ) : (
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          user.id && handleRoleChange(user.id, "MEMBER")
        }
      >
        Remove Admin
      </Button>
    )}

    {/* Status */}
    {user.status === "BLOCKED" || user.role === "ADMIN" ? (
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          user.id && handleStatusChange(user.id, "ACTIVE")
        }
      >
        Unblock
      </Button>
    ) : (
      <Button
        size="sm"
        variant="destructive"
        onClick={() =>
          user.id && handleStatusChange(user.id, "BLOCKED")
        }
      >
        Block
      </Button>
    )}

  </td>
</tr>
    )
  })
) : (
  <tr>
    <td
      colSpan={4}
      className="text-center py-6 text-muted-foreground"
    >
      No users found 🌿
    </td>
  </tr>
)}
            </tbody>
          </table>

          {/* Empty */}
          {users.length === 0 && (
            <p className="text-center py-6 text-muted-foreground">
              No members found 🌿
            </p>
          )}
        </div>
      )}
    </div>
  )
}