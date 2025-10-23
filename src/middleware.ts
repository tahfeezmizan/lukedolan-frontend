import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// LocalStorage is not available in middleware; read from cookies instead

export function middleware(req: NextRequest) {
  // Read token from cookies (middleware runs server-side)
  const token =
    req.cookies.get("token")?.value || req.cookies.get("user")?.value;
  const pathname = req.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/recruiter", "/admin", "/profile"];

  // Check if route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If route is protected and no token → redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname); // Optional: return to route after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to specific routes only
export const config = {
  matcher: ["/recruiter/:path*", "/admin/:path*", "/profile/:path*"],
};
