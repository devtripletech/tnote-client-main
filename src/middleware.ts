import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protectedPaths = [
    "/dashboard/client",
    "/dashboard/project",
    "/dashboard/employee",
    "/dashboard/attendance",
    "/dashboard/attendance/new",
  ]
  const isPathProtected = protectedPaths?.some((path) => pathname == path)
  const res = NextResponse.next()
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
