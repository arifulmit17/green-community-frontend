"use server"
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; 

export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      credentials: "include",
      cache: "no-store",
    })
    const result = await res.json()

    if (!res.ok || !result.success) {
      throw new Error(result?.message || "Failed to fetch categories")
    }   
    return result.data || []
} catch (error) {
    console.error("Get categories error:", error)
    return []
  }
}

export const createCategory = async (name: string) => {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
    try {
  const res = await fetch(
        `${BASE_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
          },
          body: JSON.stringify({ name }),
        }
      )
         const data = await res.json() 
         
         return data
    } catch (error) {
      console.error("Create category error:", error)
      return null
    }


}