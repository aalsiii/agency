import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  findClientByEmail,
  createClientSessionToken,
  CLIENT_COOKIE_NAME,
} from "@/lib/client-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const client = await findClientByEmail(email);
    if (!client) {
      return NextResponse.json(
        { error: "Invalid client credentials. Please check your email or contact your agency strategist." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, client.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid client credentials. Please check your password or contact your agency strategist." },
        { status: 401 }
      );
    }

    const token = await createClientSessionToken({
      clientId: client.id,
      email: client.email,
      name: client.name,
      companyName: client.companyName,
      plan: client.plan,
      role: "CLIENT",
    });

    const response = NextResponse.json({
      success: true,
      client: {
        id: client.id,
        email: client.email,
        name: client.name,
        companyName: client.companyName,
        plan: client.plan,
      },
    });

    response.cookies.set(CLIENT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Client login error:", error);
    return NextResponse.json(
      { error: "Authentication system error. Please try again." },
      { status: 500 }
    );
  }
}
