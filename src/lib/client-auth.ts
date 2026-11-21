import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

// Separate secret key exclusively for client tokens to guarantee mutual isolation with admin tokens
const CLIENT_SECRET_KEY = new TextEncoder().encode(
  process.env.CLIENT_JWT_SECRET || "nextcurrent_client_portal_guard_secret_2026_xyz_unique"
);

export const CLIENT_COOKIE_NAME = "nc_client_token";

export interface ClientSessionPayload {
  clientId: string;
  email: string;
  name: string;
  companyName: string;
  plan: string;
  role: "CLIENT";
}

export interface ClientAccount {
  id: string;
  email: string;
  name: string;
  companyName: string;
  plan: string;
  passwordHash: string;
  strategistName: string;
  strategistEmail: string;
  strategistPhone: string;
}

// Built-in initial client registry with pre-hashed credentials
export const DEFAULT_CLIENTS: ClientAccount[] = [
  {
    id: "client-yogamani",
    email: "client@yogamani.com",
    name: "Swami Prem & Yogamani Team",
    companyName: "Yogamani Himalayan Yoga",
    plan: "Organic SEO & Meta Growth Engine Retainer",
    passwordHash: "$2b$10$butOrS61t837VKVazrtIgO75gOrit3CqzTDAXkc4RwPo7HNJeY5Fa", // yogamani2026
    strategistName: "Akshat Bijalwan",
    strategistEmail: "bijalwanakshat@gmail.com",
    strategistPhone: "+91 93894 03190",
  },
  {
    id: "client-horizon",
    email: "client@horizon.com",
    name: "Marcus Vance",
    companyName: "Horizon Escapes",
    plan: "Luxury Performance Acquisition Engine",
    passwordHash: "$2b$10$z9H/1W8ATDiR8D9lhlTiLubgUJFPgjItYvu0k1cZeQ2qqjN.8uG6C", // horizon2026
    strategistName: "Akshat Bijalwan",
    strategistEmail: "bijalwanakshat@gmail.com",
    strategistPhone: "+91 93894 03190",
  },
];

export async function findClientByEmail(email: string): Promise<ClientAccount | null> {
  const normalized = email.toLowerCase().trim();

  // 1. Check default registered accounts
  const defaultClient = DEFAULT_CLIENTS.find((c) => c.email.toLowerCase() === normalized);
  if (defaultClient) return defaultClient;

  // 2. Check dynamic clients stored in SiteSetting
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: `client_account_${normalized}` },
    });
    if (setting?.value) {
      return JSON.parse(setting.value) as ClientAccount;
    }
  } catch (error) {
    console.error("Error reading client account from siteSetting:", error);
  }

  return null;
}

export async function createClientSessionToken(payload: ClientSessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(CLIENT_SECRET_KEY);
}

export async function verifyClientSessionToken(token: string): Promise<ClientSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, CLIENT_SECRET_KEY);
    if (!payload || payload.role !== "CLIENT") {
      return null;
    }
    return payload as unknown as ClientSessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentClient(): Promise<ClientSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyClientSessionToken(token);
}
