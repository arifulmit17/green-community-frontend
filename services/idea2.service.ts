"use server"
import { cookies } from "next/headers";


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; 

export const createIdea=async function(form:{
    title: string
    problem: string
    solution: string
    description: string
    image: string
    categoryId: string
    isPaid: boolean
    price: string
}){
    const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/idea`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Cookie: `token=${token}`, 
          },
           // 🔐 send cookie
          body: JSON.stringify({
            ...form,
            price: form.isPaid ? Number(form.price) : null,
          }),
        }
      )
       const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create idea")
      }
      

};

export const getIdeas = async function () {
  try{
    const res= await fetch(`${BASE_URL}/api/idea`, {
    method: "GET",
    cache: "no-store",
  })
  const result = await res.json()

  if (!res.ok || !result.success) {
    throw new Error(result?.message || "Failed to fetch ideas")
  }
  return result.data || []

  }catch(error){
    console.error("Fetch ideas error:", error)
    return []
  }
  };
  
export const getIdeasSearch = async function (params: string) {
  try{
    const res= await fetch(`${BASE_URL}/api/idea?${params}`, {
    method: "GET",
    cache: "no-store",
  })
  const result = await res.json()

  if (!res.ok || !result.success) {
    throw new Error(result?.message || "Failed to fetch ideas")
  }
  return result.data || []

  }catch(error){
    console.error("Fetch ideas error:", error)
    return []
  }
  };

export const fetchIdeaById = async (ideaId: string) => {
     const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
  try {
    if (!ideaId) {
      throw new Error("Idea ID is required")
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/idea/${ideaId}`,
      {
        method: "GET",
         headers: {
        Cookie: `token=${token}`, 
      },
        cache: "no-store",
      }
    )

    const result = await res.json()

    if (!res.ok || !result.success) {
      throw new Error(result?.message || "Failed to fetch idea")
    }

    return result.data || null
  } catch (error) {
    console.error("Fetch idea by ID error:", error)
    return null
  }
}

export const fetchIdeasByUser = async function (userId: string) {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
  try {
    if (!userId) {
      throw new Error("User ID is required")
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/idea/user/${userId}`,
      {
        method: "GET",
       headers: {
        Cookie: `token=${token}`, 
      },
        cache: "no-store",
      }
    )

    const result = await res.json()

    if (!res.ok || !result.success) {
      throw new Error(result?.message || "Failed to fetch ideas")
    }

    return result.data || []
  } catch (error) {
    console.error("Fetch ideas by user error:", error)
    return []
  }
};

export const deleteIdea = async function (id: string) {
    const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
  try {
    const res = await fetch(`${BASE_URL}/api/idea/${id}`, {
      method: "DELETE",
       headers: {
        Cookie: `token=${token}`, 
      },
      
    })

    if (!res.ok) {
      return { success: false }
    }
    return { success: true }
  } catch (error) {
    console.error("Delete idea error:", error)

    return { success: false }
  }
};

export const voteIdea = async function (
  ideaId: string,
  type: "UP" | "DOWN"
) {
  try {
     const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
    const res = await fetch(`${BASE_URL}/api/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      
      body: JSON.stringify({ ideaId, type }),
    })

    const data = await res.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Vote error:", error)
    
    return { success: false }
  }
};



 export const updateIdeaStatus= async  function(
  ideaId: string,
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
) {
  try {
     const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
    const res = await fetch(
      `${BASE_URL}/api/idea/${ideaId}/status/`, // ⚠️ adjust if your route differs
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
            Cookie: `token=${token}`,
        },
       
        body: JSON.stringify({ status }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to update status",
      }
    }

    return {
      success: true,
      data: data.data,
      message: data.message,
    }
  } catch (error) {
    console.error("Update status error:", error)
      
    return {
      success: false,
      message: "Something went wrong",
    }
  }
}

export const updateIdea = async (
  ideaId: string,
  payload: {
    title?: string
    description?: string
    price?: number
    isPaid?: boolean
    categoryId?: string
  }
) => {
  try {
    const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log("user token",token);
  if (!token) return null;
    if (!ideaId) {
      throw new Error("Idea ID is required")
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/idea/${ideaId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
              Cookie: `token=${token}`,
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await res.json()

    if (!res.ok || !result.success) {
      throw new Error(result?.message || "Failed to update idea")
    }
   
    return result.data
  } catch (error) {
    console.error("Update idea error:", error)
    return null
  }
}