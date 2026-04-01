"use client";
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/services/auth.service';

import { toast } from 'sonner';




export default function LogoutButton() {
    const handleLogout = async () => {
    logoutUser()
}
  return (
    <div>
       <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
    </div>
  )
}
