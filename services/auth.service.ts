"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 🔐 LOGIN
export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      const cookieStore =await cookies();

      // ✅ FIX: token is directly in result.token
      cookieStore.set("token", result.token, {
        httpOnly: true,
        secure: false, // true in production
        path: "/",
      });
    }

    return result;
  } catch (error) {
    console.log("Login error:", error);
    return null;
  }
};

export const getUser = async () => {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token:",token);
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // important
    });

    const result = await res.json();
    console.log("User data",result);

    if (!result.success) return null;

    return result.data;
  } catch (error) {
    console.log("Get user error:", error);
    return null;
  }
};

export const logoutUser = async () => {
  const cookieStore =await cookies();

  cookieStore.delete("token");

  return {
    success: true,
    message: "Logged out successfully",
  };
};