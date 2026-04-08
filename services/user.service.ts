

export const  userService={
    
  fetchUserById: async function (userId: string)  {
  try {
    if (!userId) {
      throw new Error("User ID is required")
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
      {
        method: "GET",
        credentials: "include", // 🔐 important for cookie auth
        cache: "no-store",
      }
    )

    const result = await res.json()

    if (!res.ok || !result.success) {
      throw new Error(result?.message || "Failed to fetch user")
    }

    return result.data || null
  } catch (error) {
    console.error("Fetch user by ID error:", error)
    return null
  }
}
    }