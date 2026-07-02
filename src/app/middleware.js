import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
        if (!session) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    if (pathname.startsWith("/dashboard/admin")) {
   if (session?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
   }
}

    
    if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
        if (session) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
        '/dashboard/:path*',
        // '/signin',
        // '/signup'
    ],
}