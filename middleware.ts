import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default clerkMiddleware(async (_auth, req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|static|.*\\..*).*)",
  ],
};
