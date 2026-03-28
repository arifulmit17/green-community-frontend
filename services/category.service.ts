
import { env } from "process"

const API_URL=env.API_URL



export const categoriesService = {
    
    getAllCategories: async function () {    
        
        const data=await fetch(`${API_URL}/categories/`,{
             credentials: "include",
            cache:'no-store'
        })
       return {data:data,error:null}
    },

    getCategoryById : async function(id:string){
    try{
         
         const res=await fetch(`${API_URL}/categories/${id}`,{
            credentials: "include",
         })
         const data=await res.json()
//  console.log("Home page session:",session);
 return {data:data,error:null}
    }
    catch(err){
        // console.log(err);
        return {data:null,error:{message:"Failed to fetch category by ID"}}
    }
},
    

    deleteCategory: async (categoryId: string) => {
       
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
      {
        
        method: "DELETE",
         credentials: "include",
      }
    )

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      throw new Error(error?.message || "Failed to delete category")
    }

    return res.json()
  },

   
}