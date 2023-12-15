import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-hashes' 'unsafe-inline' 'sha256-joC7reiv/dIkR+09K78mednkCl5Rmm2WBT7APoyLY+g=' 'sha256-9HyNyG0GZyabMBeQyib5LJELLQE2s41lRmpcThEwjzI=' 'sha256-HYnfXErrk8ReZ9R550ygLloQTX5CHk8kFeSiBMmBaws=' 'sha256-EPYEwfJvupPVNF/iwOzS5GWMK70IilwW5QTaUSQkmlY=' 'sha256-kxw+nAOdsyc2OQqWGaIkyqUGiOlaOUv+NMwcul31b7k=' 'sha256-L9SK8yiPu7TwmThptvArJosC6bLnfLhlCtMgqrQFgf8=' 'sha256-8//zSBdstORCAlBMo1/Cig3gKc7QlPCh9QfWbRu0OjU=' 'sha256-yhd6PwjoWYTBnndhpLUkTn5EsNHml/N9we///jSYsCE=' 'sha256-PxpWULeDrIdov0YQWrt6Bmg9TT+/+g5UjThNitFT2ic=' 'sha256-iRcQj5aZEFZkb4uNJVwwlURvMo2Gl2O7fKWfIqkjFuQ=' 'sha256-dWJBTUYIehWQeYz1GvwRaTkI+KDGjUWEnQesSIcAEZE=' 'sha256-65CE2FOJFBHue4CcyglEEakRkPVPm79q3605/6psvkk=' 'sha256-qDN2Dgpn1iTKNi4q10wUSPuFz4bAS+HBxZG6P3wPUIE=' 'sha256-r2AApiRY3FiAayRD1cK5mE6UuyRo6G6GcULnM0cT16A=' 'sha256-uwZD9meGcYf1wTTgVLoyRAttv2fUnJt53zHY9SLkfXU=' 'sha256-r9zonY/0EBur45sTRD/qPtjrpc82Cy+rd5UsKL16ylc=' 'sha256-Gcc6z51/N6sU4HeTUwpMo8kmHIxYkUqHiFYCW5Y4Ghc=' 'sha256-9IhiZWL6sk7lRp5pcjkkVpTeNxZ5cYjy3ExyRjoy+as=' snap.licdn.com *.tripletech.com *.tripletech.com.br *.googlesyndication.com *.googleapis.com *.g.doubleclick.net *.doubleclick.net *.googleapis.com *.googletagmanager.com cdn.jsdelivr.net cdnjs.cloudflare.com 'sha256-${nonce}' 'strict-dynamic';
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

  const pathname = req.nextUrl.pathname
  const protectedPaths = [
    "/dashboard/client",
    "/dashboard/project",
    "/dashboard/employee",
    "/dashboard/attendance",
    "/dashboard/attendance/new",
  ]
  const isPathProtected = protectedPaths?.some((path) => pathname == path)
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
