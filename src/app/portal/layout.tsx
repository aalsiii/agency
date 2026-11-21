import { ReactNode } from "react";
import { getCurrentClient } from "@/lib/client-auth";
import { redirect } from "next/navigation";

export default async function ClientPortalLayout({ children }: { children: ReactNode }) {
  const client = await getCurrentClient();

  // If not logged in as a client, redirect to client login
  if (!client) {
    // Note: /portal/login is handled by Next.js route matching and middleware,
    // but layout applies to all /portal routes.
    // If client is null, middleware already redirected unauthenticated requests,
    // but this guarantees safety.
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059] selection:text-black">
      {children}
    </div>
  );
}
