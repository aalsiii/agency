"use client";

import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminNavActions({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="flex items-center justify-between pt-2">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
          <User className="w-3.5 h-3.5" />
        </div>
        <div className="truncate text-xs">
          <p className="font-medium text-neutral-200 truncate">{adminEmail}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        title="Sign Out"
        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
