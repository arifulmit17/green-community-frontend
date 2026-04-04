
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ideaService = {

  deleteIdea : async function (id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/idea/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!res.ok) {
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error("Delete idea error:", error)

    return { success: false }
  }
},

voteIdea : async function (
  ideaId: string,
  type: "UP" | "DOWN"
) {
  try {
    const res = await fetch(`${BASE_URL}/api/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
},



 updateIdeaStatus: async  function(
  ideaId: string,
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/idea/${ideaId}/status/`, // ⚠️ adjust if your route differs
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔐 for cookie auth
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
}