"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Clock,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronDown,
  Building,
  Check,
  X,
  UserPlus,
  FileCheck,
  Briefcase,
  Play,
  Square,
} from "lucide-react";
import Link from "next/link";

export default function AdminTopNav() {
  const [clientDropdown, setClientDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState("All clients 2");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Time tracking effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left: Client Filter Dropdown & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        {/* Client Selector */}
        <div className="relative">
          <button
            onClick={() => setClientDropdown((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition cursor-pointer"
          >
            <span className="w-4 h-4 rounded bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
              ●
            </span>
            <span>{selectedClient}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {clientDropdown && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  setSelectedClient("All clients 2");
                  setClientDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center justify-between text-slate-800 font-medium"
              >
                <span>All clients (2)</span>
                {selectedClient.includes("All") && <Check className="w-3.5 h-3.5 text-purple-600" />}
              </button>
              <button
                onClick={() => {
                  setSelectedClient("Yogamani Himalayan Yoga");
                  setClientDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center justify-between text-slate-800 font-medium"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <span>Yogamani Himalayan Yoga</span>
                </div>
                {selectedClient.includes("Yogamani") && <Check className="w-3.5 h-3.5 text-purple-600" />}
              </button>
              <button
                onClick={() => {
                  setSelectedClient("NextCurrent Media");
                  setClientDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center justify-between text-slate-800 font-medium"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span>NextCurrent Media (Internal)</span>
                </div>
                {selectedClient.includes("NextCurrent") && <Check className="w-3.5 h-3.5 text-purple-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-500 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search or jump to...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">
              Ctrl K
            </kbd>
          </button>
        </div>
      </div>

      {/* Right Actions: Track time, Bell, Theme, + New */}
      <div className="flex items-center gap-3">
        {/* Track Time Button */}
        <button
          onClick={() => setIsTimerRunning((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
            isTimerRunning
              ? "bg-purple-50 border-purple-200 text-purple-700 animate-pulse"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Clock className={`w-3.5 h-3.5 ${isTimerRunning ? "text-purple-600" : "text-slate-400"}`} />
          <span>{isTimerRunning ? `Tracking ${formatTime(seconds)}` : "Track time"}</span>
          {isTimerRunning && (
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          )}
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-bold text-[9px] px-1 rounded-full border border-white">
              54
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-red-600 font-semibold">50 overdue tasks</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-[11px]">
                  <p className="font-semibold text-red-800">Yogamani Agreement Overdue</p>
                  <p className="text-slate-600 mt-0.5">Collect signed agreement and advance payment (25 days ago)</p>
                </div>
                <div className="p-2 rounded-lg bg-purple-50/70 border border-purple-100 text-[11px]">
                  <p className="font-semibold text-purple-800">SEO Crawl Pending</p>
                  <p className="text-slate-600 mt-0.5">Sitebulb crawl export ready for review.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => {}}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          title="Toggle light / dark mode"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* + New Button */}
        <div className="relative">
          <button
            onClick={() => setNewDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs tracking-wide transition shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New</span>
          </button>

          {newDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
              <Link
                href="/admin"
                onClick={() => setNewDropdownOpen(false)}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center gap-2 text-slate-800 font-medium"
              >
                <Plus className="w-3.5 h-3.5 text-purple-600" />
                <span>New Task</span>
              </Link>
              <Link
                href="/admin/leads"
                onClick={() => setNewDropdownOpen(false)}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center gap-2 text-slate-800 font-medium"
              >
                <UserPlus className="w-3.5 h-3.5 text-purple-600" />
                <span>New Lead</span>
              </Link>
              <Link
                href="/admin/audits"
                onClick={() => setNewDropdownOpen(false)}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center gap-2 text-slate-800 font-medium"
              >
                <FileCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>New Audit</span>
              </Link>
              <Link
                href="/admin/projects"
                onClick={() => setNewDropdownOpen(false)}
                className="w-full text-left px-3.5 py-2 hover:bg-purple-50 flex items-center gap-2 text-slate-800 font-medium"
              >
                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                <span>New Project</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 pt-20">
          <div className="bg-white rounded-2xl p-4 max-w-lg w-full border border-slate-200 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search leads, tasks, clients, or services..."
                className="w-full text-xs outline-none text-slate-800 placeholder-slate-400"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <Link
                href="/admin"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 text-slate-700"
              >
                <span>Dashboard Agenda & Tasks</span>
                <span className="text-[10px] text-purple-600 font-mono">Workspace</span>
              </Link>
              <Link
                href="/admin/leads"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 text-slate-700"
              >
                <span>Lead Pipeline CRM</span>
                <span className="text-[10px] text-purple-600 font-mono">Grow</span>
              </Link>
              <Link
                href="/admin/audits"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 text-slate-700"
              >
                <span>Audit Requests</span>
                <span className="text-[10px] text-purple-600 font-mono">Services</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
