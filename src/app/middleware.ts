import { NextRequest, NextResponse } from 'next/server';

// Define routes that don't require authentication
const publicRoutes = ['/', '/login', '/register'];

// Define route access by role
const roleRoutes: { [key: string]: string[] } = {
  student: ['/student-dashboard'],
  advisor: ['/dashboard'],
  admin: ['/admin-dashboard']
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated
  const userDataCookie = request.cookies.get('userData')?.value;
  const userTypeCookie = request.cookies.get('userType')?.value;
  
  // If no auth data, redirect to login
  if (!userDataCookie || !userTypeCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Check role-based access
  const userRole = userTypeCookie;
  const allowedRoutes = roleRoutes[userRole] || [];
  
  // Check if the current route starts with any of the allowed routes
  const hasAccess = allowedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (!hasAccess) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'student':
        return NextResponse.redirect(new URL('/student-dashboard', request.url));
      case 'advisor':
        return NextResponse.redirect(new URL('/dashboard', request.url));
      case 'admin':
        return NextResponse.redirect(new URL('/admin-dashboard', request.url));
      default:
        return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/* (image files)
     * - api/* (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
}; 