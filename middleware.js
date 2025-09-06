import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
    '/',
    '/sign-in',
    '/sign-up',
    '/about',
    '/contact',
    '/admissions',
    '/gallery',
    '/news',
];

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const session = await supabase.auth.getSession();

    const isPublicRoute = PUBLIC_ROUTES.some(path => req.nextUrl.pathname.startsWith(path));

    if (!session.data.session && !isPublicRoute) {
        // Redirect to sign-in page if not authenticated and not on a public route
        const redirectUrl = new URL('/sign-in', req.url);
        redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // Continue to the requested page
    return res;
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
