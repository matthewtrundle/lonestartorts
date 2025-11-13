import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that require authentication
// Note: /admin routes have their own custom auth system (see lib/auth.ts)
const isProtectedRoute = createRouteMatcher([
  '/account(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|ogg)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
