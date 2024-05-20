import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const cspHeader = `
    //default-src 'self';
    // script-src 'self' 'nonce-${nonce}';
    // style-src 'self' 'nonce-${nonce}';
    // img-src 'self' data:;
    // connect-src 'self';
    // font-src 'self';
    // object-src 'none';
    // frame-ancestors 'none';
    // base-uri 'self';
    // form-action 'self';
  `
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim()

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  )
  // const cspHeader = ``
  // const contentSecurityPolicyHeaderValue = cspHeader
  //   .replace(/\s{2,}/g, " ")
  //   .trim()

  // const requestHeaders = new Headers(req.headers)
  // requestHeaders.set("x-nonce", nonce)
  // requestHeaders.set(
  //   "Content-Security-Policy",
  //   contentSecurityPolicyHeaderValue
  // )

  const pathname = req.nextUrl.pathname
  const protectedPaths = [
    "/dashboard/client",
    "/dashboard/project",
    "/dashboard/employee",
    "/dashboard/attendance",
    "/dashboard/attendance/new",
    "/ponto",
  ]
  const isPathProtected = protectedPaths?.some((path) => pathname === path)
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  res.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue)
  if (isPathProtected) {
    const token = await getToken({ req })

    if (!token) {
      const url = new URL(`/`, req.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // if (pathname === "/") {
    //   return NextResponse.redirect(new URL("/examples", req.url))
    // }
  }
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
