"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { User } from "lucide-react";

export default function ProfileDropdown({ session, auth }) {
  if (!session) return null;

  return (
    <div className="flex items-center">
      <DropdownMenu>
        
        {/* Trigger */}
        <DropdownMenuTrigger asChild>
          <button className="text-sm font-medium hover:underline">
           <User></User>
          </button>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent align="end" className="w-48">
          
          <DropdownMenuItem asChild>
            <Link href={auth.profile.url}>Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>

         

          <DropdownMenuSeparator />

         

          <DropdownMenuItem className="text-red-500">
           <LogoutButton></LogoutButton>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}