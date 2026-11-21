import { getCurrentClient } from "@/lib/client-auth";
import { redirect } from "next/navigation";
import ClientPortalDashboard from "./ClientPortalDashboard";

export const dynamic = "force-dynamic";

export default async function ClientPortalPage() {
  const client = await getCurrentClient();

  if (!client) {
    redirect("/portal/login");
  }

  return <ClientPortalDashboard client={client} />;
}
