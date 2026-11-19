import { ReactNode } from "react";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  FileSearch,
  Layers,
  FolderGit2,
  Settings,
  ExternalLink,
  Shield,
  MessageSquare,
  Briefcase,
  Star,
} from "lucide-react";
import AdminNavActions from "./AdminNavActions";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  // If unauthenticated (e.g. on /admin/login), render children without admin sidebar
  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-white flex flex-col md:flex-row antialiased admin-mode">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--background-layer-1)] border-b md:border-b-0 md:border-r border-white/10 shrink-0 flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center font-bold text-primary font-serif text-xs">
              NC
            </span>
            <div>
              <span className="font-serif font-bold text-sm tracking-tight block text-white">
                NextCurrent
              </span>
              <span className="font-mono text-[10px] text-primary/80 flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" /> Backstage Console
              </span>
            </div>
          </Link>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-1 flex-1 font-mono text-xs">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <LayoutDashboard className="w-4 h-4 text-primary group-hover:scale-105 transition-transform" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/leads"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-primary/80 group-hover:scale-105 transition-transform" />
              <span>Leads CRM</span>
            </div>
          </Link>

          <Link
            href="/admin/audits"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <div className="flex items-center gap-3">
              <FileSearch className="w-4 h-4 text-primary/80 group-hover:scale-105 transition-transform" />
              <span>Audit Requests</span>
            </div>
          </Link>

          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <Layers className="w-4 h-4 text-primary/80 group-hover:scale-105 transition-transform" />
            <span>Services & Pricing</span>
          </Link>

          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <FolderGit2 className="w-4 h-4 text-primary/80 group-hover:scale-105 transition-transform" />
            <span>Work & Case Studies</span>
          </Link>

          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <Star className="w-4 h-4 text-primary/80 group-hover:scale-105 transition-transform" />
            <span>Testimonials</span>
          </Link>

          <Link
            href="/admin/careers"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <Briefcase className="w-4 h-4 text-primary/80 group-hover:scale-105 transition-transform" />
            <span>Careers & Jobs</span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition group"
          >
            <Settings className="w-4 h-4 text-muted group-hover:scale-105 transition-transform" />
            <span>Site Settings</span>
          </Link>
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-muted hover:text-white hover:border-primary/40 transition"
          >
            <span className="flex items-center gap-1.5 text-primary">
              Public Website
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </Link>

          <AdminNavActions adminEmail={admin?.email || "bijalwanakshat@gmail.com"} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-[var(--background)]">
        {children}
      </main>
    </div>
  );
}
