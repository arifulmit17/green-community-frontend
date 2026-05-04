export const dynamic = "force-dynamic"
import { redirect } from "next/navigation";


export default function AdminDashboard() {
  redirect("/admin-dashboard/stats");
    
  
}