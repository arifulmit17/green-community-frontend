
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth.service";







export async function proxy(request: NextRequest) {
  
  const pathname = request.nextUrl.pathname;
  // console.log("hello proxy:",pathname);
  let isAuthenticated = false
    let isAdmin = false

  
// console.log("from proxy");
  // Check for session token in cookies
  const data = await getUser()
  // console.log("proxy data:",data);
  
  //* User is not authenticated at all
  // if (!data) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

    if (data) {
        isAuthenticated = true
        isAdmin = data.role === "ADMIN"
    }
    //* User in not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    

    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

  // Allow access if session exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
