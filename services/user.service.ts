"use server"
import { cookies} from "next/headers"


export const getAllUsers = async () => {
    const cookieStore =await cookies();
      const token = cookieStore.get("token")?.value;
      
      if (!token) return null;
    const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
         {
            headers:{
            Cookie: `token=${token}`,
          }
         } 
        )

        const result = await res.json()
        // console.log("all user",result);
        return result.data || []
    
}

export const ChangeUserRole = async (id: string, role: string) => {
    const cookieStore =await cookies();
      const token = cookieStore.get("token")?.value;
     
      if (!token) return null;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
          },
          
          body: JSON.stringify({ role }),
        }
      )

      const result = await res.json()
      return result

}

export const ChangeUserStatus = async (id: string, isActive: boolean) => {
    const cookieStore =await cookies();
      const token = cookieStore.get("token")?.value;
      
      if (!token) return null;
      // console.log("status",isActive);
       const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({ isActive }),
      }
    )

    const result = await res.json()
    return result
}

export const updateUser= async (id: string, payload: { name?: string }) => {
      const cookieStore =await cookies();
      const token = cookieStore.get("token")?.value;
      
      if (!token) return null;

       try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
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
      return result || null
    } catch (error) {
      console.error("Update user error:", error)
      return null
    }



}

