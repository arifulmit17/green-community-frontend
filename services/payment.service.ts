"use server"
import { cookies} from "next/headers"
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPaymentIntent = async (ideaId: string, price: number | undefined) => {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try{

  
  const res = await fetch(
      `${BASE_URL}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Cookie: `token=${token}`,
        },
        
        body: JSON.stringify({
          amount: price, // ৳1000
          ideaId: ideaId,
        }),
      }
    )

    const data = await res.json()
    return data
}catch(error){
  console.error("Create payment intent error:", error)
}

}

export const verifyPayment = async (
  {ideaId}: { ideaId: string }) => {
  console.log("Payment Data:", ideaId);
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;    
    if (!token) return null;

    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/purchase/check/${ideaId}`, {
   
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`, 
    }
})
const  {purchased}  = await result.json()
console.log("purchased:", purchased);
return purchased

    }catch(error){
      console.error("Verify payment error:", error)
    }
  }