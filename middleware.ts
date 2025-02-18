// import {
//   convexAuthNextjsMiddleware,
//   createRouteMatcher,
//   nextjsMiddlewareRedirect,
// } from '@convex-dev/auth/nextjs/server';

// const isSignInPage = createRouteMatcher(['/auth/sign-in']);
// const isProtectedRoute = createRouteMatcher([
//   '/instructor(.*)',
//   '/student(.*)',
// ]);

// export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
//   const isAuthenticated = await convexAuth.isAuthenticated();
//   if (isSignInPage(request) && isAuthenticated) {
//     return nextjsMiddlewareRedirect(request, '/');
//   }
//   if (isProtectedRoute(request) && !isAuthenticated) {
//     return nextjsMiddlewareRedirect(request, '/auth/sign-in');
//   }
// });

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isPublicRoute = createRouteMatcher(['auth/sign-in']);

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/auth(.*)', '/']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
