import { ReactNode } from "react";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Inbox,
  Calendar,
  Search,
  FileSearch,
  Target,
  Globe,
  Folder,
  TrendingUp,
  FileText,
  DollarSign,
  PanelLeftClose,
  ExternalLink,
  Shield,
  Settings,
} from "lucide-react";
import AdminNavActions from "./AdminNavActions";
import AdminTopNav from "./AdminTopNav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  // If unauthenticated (e.g. on /admin/login), render children without admin sidebar
  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4F5FA] text-slate-900 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-60 bg-white border-b md:border-b-0 md:border-r border-slate-200/90 shrink-0 flex flex-col shadow-[1px_0_3px_rgba(0,0,0,0.02)]">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <span className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-purple-600/30">
              NC
            </span>
            <div>
              <span className="font-bold text-xs text-slate-900 tracking-tight block">
                NextCurrent
              </span>
              <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase block">
                Agency Works OS
              </span>
            </div>
          </Link>

          <button
            title="Collapse Sidebar"
            className="p-1 rounded text-slate-400 hover:text-slate-600 transition"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links Navigation */}
        <nav className="p-3 space-y-4 flex-1 text-xs overflow-y-auto">
          {/* WORKSPACE */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold transition group"
            >
              <LayoutDashboard className="w-4 h-4 text-purple-600" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Clients & projects</span>
              </div>
            </Link>
            <Link
              href="/admin"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4 text-slate-400" />
                <span>Tasks</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700 font-mono">
                52
              </span>
            </Link>
            <Link
              href="/admin/audits"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-slate-400" />
                <span>Requests</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700 font-mono">
                1
              </span>
            </Link>
          </div>

          {/* SERVICES */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Services
            </div>
            <Link
              href="/admin/blog"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Social calendar</span>
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>SEO</span>
            </Link>
            <Link
              href="/admin/audits"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <FileSearch className="w-4 h-4 text-slate-400" />
              <span>Audits</span>
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <Target className="w-4 h-4 text-slate-400" />
              <span>Performance ads</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span>Websites</span>
            </Link>
          </div>

          {/* DELIVER */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Deliver
            </div>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <Folder className="w-4 h-4 text-slate-400" />
              <span>Assets & files</span>
            </Link>
          </div>

          {/* GROW */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Grow
            </div>
            <Link
              href="/admin/leads"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span>Lead pipeline</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700 font-mono">
                3
              </span>
            </Link>
            <Link
              href="/admin/audits"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Prospect reports</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <DollarSign className="w-4 h-4 text-slate-400" />
              <span>Finance</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 hover:text-purple-700 hover:border-purple-200 transition"
          >
            <span className="flex items-center gap-1.5">Public Website</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <AdminNavActions adminEmail={admin?.email || "bijalwanakshat@gmail.com"} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <AdminTopNav />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
