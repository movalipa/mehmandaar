import { getIronSession } from "iron-session"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { type SessionData, sessionOptions } from "@/utils/session"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  )

  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/login"]
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile"]
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  const isLoggedIn = session.isLoggedIn && session.userId

  // Redirect logged-in users away from login page
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect non-logged-in users to login page
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
