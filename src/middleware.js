import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    // Detect which cookie name is being used
    const hasNextAuthToken = req.cookies.has('next-auth.session-token');
    const hasAuthJsToken = req.cookies.has('authjs.session-token');
    
    // Direct approach - check if any auth cookie exists and consider user authenticated
    const isAuthenticated = hasNextAuthToken || hasAuthJsToken;
    
    const { pathname, searchParams } = req.nextUrl;
    
    // Special case for the debug page - always accessible
    if (pathname === "/debug") {
      return NextResponse.next();
    }

    // If user is not authenticated and trying to access any page other than login,
    // redirect to login page
    if (!isAuthenticated && pathname !== "/login") {
      const loginUrl = new URL("/login", req.url);
      // Store the page they tried to visit to redirect after login
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // If user is authenticated and tries to access login page, redirect to home
    if (isAuthenticated && pathname === "/login") {
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl && callbackUrl.startsWith('/')) {
        return NextResponse.redirect(new URL(callbackUrl, req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error(`Middleware Error: ${error.message}`, error);
    // Continue the request even if middleware fails
    return NextResponse.next();
  }
}

// Match all paths that we want to protect
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/auth/... (NextAuth.js API routes)
     * 2. /api/socket/... (Socket.io API routes)
     * 3. /_next/... (Next.js static files)
     * 4. /static/... (Static files)
     * 5. /favicon.ico, /robots.txt (public files)
     */
    '/((?!api/auth|api/socket|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
}; 