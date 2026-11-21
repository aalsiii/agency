import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "nextcurrent_secret_key_change_in_production_2026_xyz"
);

const REGISTERED_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com").toLowerCase().trim();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("nc_admin_token")?.value;

    // Route: /admin/login
    if (pathname === "/admin/login") {
      if (token) {
        try {
          const { payload } = await jwtVerify(token, SECRET_KEY);
          if (
            payload &&
            (payload.email as string)?.toLowerCase().trim() === REGISTERED_ADMIN_EMAIL &&
            payload.role === "ADMIN"
          ) {
            return NextResponse.redirect(new URL("/admin", req.url));
          }
        } catch {
          // Token invalid, allow /admin/login
        }
      }
      return NextResponse.next();
    }

    // All other /admin paths require valid authenticated admin session
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      if (
        !payload ||
        (payload.email as string)?.toLowerCase().trim() !== REGISTERED_ADMIN_EMAIL ||
        payload.role !== "ADMIN"
      ) {
        const res = NextResponse.redirect(new URL("/admin/login", req.url));
        res.cookies.delete("nc_admin_token");
        return res;
      }
    } catch {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("nc_admin_token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
