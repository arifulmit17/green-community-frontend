
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
}
}