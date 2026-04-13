
"use server"

import { cookies } from "next/headers";
import { env } from "process"
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// console.log(BASE_URL);
// 🔐 SIGNUP SERVICE
export const signupUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    // console.log(data);
    // ❌ Handle API error
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Signup failed",
      };
    }

    // ✅ Store token (if backend returns it)
    if (data.token) {
      const cookieStore =await cookies();

      // ✅ FIX: token is directly in result.token
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "none",
        path: "/",
      });
    }
    
    return {
      success: true,
      data: data.data,
      message: data.message || "Signup successful",
    };
  } catch (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// 🔐 LOGIN
export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    // console.log("login result", result);
    if (result.success) {
      const cookieStore =await cookies();

      // ✅ FIX: token is directly in result.token
      cookieStore.set("token", result.token, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "none",
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
  // console.log("user token",token);
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`, 
      },
      cache: "no-store", // important
    });

    const result = await res.json();
    // console.log("User data",result);

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