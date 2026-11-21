import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "nextcurrent_secret_key_change_in_production_2026_xyz"
);

const CLIENT_SECRET_KEY = new TextEncoder().encode(
  process.env.CLIENT_JWT_SECRET || "nextcurrent_client_portal_guard_secret_2026_xyz_unique"
);

const REGISTERED_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com").toLowerCase().trim();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ==========================================
  // 1. Protect /admin routes (Strict Admin Enclave)
  // ==========================================
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("nc_admin_token")?.value;

    // Route: /admin/login
    if (pathname === "/admin/login") {
      if (token) {
        try {
          const { payload } = await jwtVerify(token, ADMIN_SECRET_KEY);
          if (
            payload &&
            (payload.email as string)?.toLowerCase().trim() === REGISTERED_ADMIN_EMAIL &&
            payload.role === "ADMIN"
          ) {
            return NextResponse.redirect(new URL("/admin", req.url));
          }
        } catch {
          // Invalid admin token, allow login page
        }
      }
      return NextResponse.next();
    }

    // All other /admin paths require valid authenticated admin session
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, ADMIN_SECRET_KEY);
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

  // ==========================================
  // 2. Protect /portal routes (Strict Client Enclave)
  // Admins cannot access client accounts; clients cannot access admin routes
  // ==========================================
  if (pathname.startsWith("/portal")) {
    const clientToken = req.cookies.get("nc_client_token")?.value;

    // Route: /portal/login
    if (pathname === "/portal/login") {
      if (clientToken) {
        try {
          const { payload } = await jwtVerify(clientToken, CLIENT_SECRET_KEY);
          if (payload && payload.role === "CLIENT") {
            return NextResponse.redirect(new URL("/portal", req.url));
          }
        } catch {
          // Invalid client token, allow /portal/login
        }
      }
      return NextResponse.next();
    }

    // All other /portal paths require valid authenticated client session
    if (!clientToken) {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(clientToken, CLIENT_SECRET_KEY);
      if (!payload || payload.role !== "CLIENT") {
        const res = NextResponse.redirect(new URL("/portal/login", req.url));
        res.cookies.delete("nc_client_token");
        return res;
      }
    } catch {
      const res = NextResponse.redirect(new URL("/portal/login", req.url));
      res.cookies.delete("nc_client_token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
