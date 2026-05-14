import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/staff") {
    return NextResponse.redirect(new URL("/staff/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff"]
};
