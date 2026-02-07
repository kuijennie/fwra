import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /static (public static files)
    // - .*\\..*  (files with extensions like .js, .css, .ico)
    "/((?!api|_next|_vercel|static|.*\\..*).*)",
  ],
};
