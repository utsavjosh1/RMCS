import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    const { pathname } = req.nextUrl;

    // Allow access to auth-related pages
    if (pathname.startsWith("/auth/") || pathname === "/login") {
      return NextResponse.next();
    }

    // Special case for the debug page - always accessible
    if (pathname === "/debug") {
      return NextResponse.next();
    }

    // Check for JWT token in localStorage (we can't access localStorage in middleware)
    // So we'll rely on client-side authentication state management
    // and only protect specific sensitive routes if needed

    return NextResponse.next();
  } catch (error) {
    console.error(`Middleware Error: ${error.message}`, error);
    // Continue the request even if middleware fails
    return NextResponse.next();
  }
}

// Match paths that we want to potentially protect
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/... (API routes)
     * 2. /_next/... (Next.js static files)
     * 3. /static/... (Static files)
     * 4. /favicon.ico, /robots.txt (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
