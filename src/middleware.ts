import { NextResponse, type NextRequest } from "next/server";
import { i18n, isLocale } from "./lib/i18n-config";

function detectLocale(req: NextRequest) {
  const al = (req.headers.get("accept-language") ?? "").toLowerCase();
  if (al.startsWith("ar")) return "ar";
  return i18n.defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) return;

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
