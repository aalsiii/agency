import { ReactNode } from "react";

export default function ClientPortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059] selection:text-black">
      {children}
    </div>
  );
}

