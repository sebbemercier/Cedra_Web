import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en", "nl"];
const defaultLocale = "fr";

/**
 * Next.js 16 Proxy function
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip if it's an internal Next.js request or a static file
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. Check if the pathname already has a valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 3. Simple detection
  const cookieLocale = request.cookies.get("cedra-locale")?.value;
  const locale = (cookieLocale && locales.includes(cookieLocale)) ? cookieLocale : defaultLocale;

  // 4. Redirect
  const url = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  return NextResponse.redirect(url);
}

// Also export as named for safety
export { proxy as proxyExport };

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg|images|payment-icons).*)",
  ],
};