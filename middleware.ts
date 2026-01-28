import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',                    // Landing page ✅
  '/about',               // About page ✅ NEW
  '/contact',             // Contact page ✅ NEW
  '/features',            // Features page ✅ NEW
  '/how-it-works',        // How it works ✅ NEW
  '/sign-in(.*)',         // Clerk sign-in ✅
  '/sign-up(.*)',         // Clerk sign-up ✅
  '/sign-out(.*)',        // Clerk sign-out ✅
  '/demo(.*)',            // Demo page ✅
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();  // Protect everything else
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
