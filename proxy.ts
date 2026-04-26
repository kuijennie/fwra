import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

// I set up next-intl to handle language routing automatically.
// It detects the locale from the URL (e.g. /sw/... for Swahili) and sets
// the right language for all translations across the app.
const intlMiddleware = createIntlMiddleware(routing);

// Every request goes through Clerk first (for auth), then next-intl (for locale).
// I'm not protecting any routes here — all pages are publicly accessible.
// Auth checks happen inside individual pages and Convex functions instead.
export default clerkMiddleware(async (_auth, req) => {
  return intlMiddleware(req);
});

// This tells Next.js which URLs the middleware should run on.
// I exclude API routes, Next.js internals, static files, and files with extensions
// (images, fonts, etc.) so the middleware only runs on actual app pages.
export const config = {
  matcher: [
    "/((?!api|_next|_vercel|static|.*\\..*).*)",
  ],
};
