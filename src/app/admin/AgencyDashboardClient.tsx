"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowRight,
  Search,
  CheckCircle2,
  Calendar,
  CreditCard,
  Clock,
  Target,
  Sparkles,
  User,
  Receipt,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  X,
  Send,
  Loader2,
  Check,
} from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  createdAt: string;
}

interface AuditItem {
  id: string;
  businessName: string;
  email: string;
  primaryGoal: string;
  status: string;
  createdAt: string;
}

interface TaskItem {
  id: string;
  title: string;
  client: "yogamani" | "internal";
  clientName: string;
  service: "SEO" | "Admin" | "Ads" | "Social" | "Websites";
  priority: "High" | "Medium" | "Low";
  status: "overdue" | "today" | "completed";
  dueText: string;
  completed: boolean;
}

const initialTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "Crawl the site (Screaming Frog / Sitebulb) and export issues",
    client: "yogamani",
    clientName: "Yogamani Himalayan Yoga",
    service: "SEO",
    priority: "High",
    status: "overdue",
    dueText: "Overdue · 26 days ago",
    completed: false,
  },
  {
    id: "task-2",
    title: "Collect signed agreement and advance payment",
    client: "yogamani",
    clientName: "Yogamani Himalayan Yoga",
    service: "Admin",
    priority: "High",
    status: "overdue",
    dueText: "Overdue · 25 days ago",
    completed: false,
  },
  {
    id: "task-3",
    title: "Configure Google Search Console & XML sitemap verification",
    client: "yogamani",
    clientName: "Yogamani Himalayan Yoga",
    service: "SEO",
    priority: "High",
    status: "overdue",
    dueText: "Overdue · 20 days ago",
    completed: false,
  },
  {
    id: "task-4",
    title: "Set up Meta Pixel & conversion tracking for retreat bookings",
    client: "yogamani",
    clientName: "Yogamani Himalayan Yoga",
    service: "Ads",
    priority: "Medium",
    status: "overdue",
    dueText: "Overdue · 14 days ago",
    completed: false,
  },
  {
    id: "task-5",
    title: "Review monthly ad creative roster and 5 short-form Reel hooks",
    client: "internal",
    clientName: "NextCurrent Media",
    service: "Social",
    priority: "High",
    status: "today",
    dueText: "Due today",
    completed: false,
  },
  {
    id: "task-6",
    title: "Publish Q4 case study teardown for luxury hospitality client",
    client: "internal",
    clientName: "NextCurrent Media",
    service: "Websites",
    priority: "Medium",
    status: "today",
    dueText: "Due today",
    completed: false,
  },
];

export default function AgencyDashboardClient({
  adminName = "Akshat",
  totalLeads = 0,
  recentLeads = [],
  totalAudits = 0,
  recentAudits = [],
}: {
  adminName?: string;
  totalLeads?: number;
  recentLeads?: LeadItem[];
  totalAudits?: number;
  recentAudits?: AuditItem[];
}) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [clientFilter, setClientFilter] = useState<"all" | "yogamani" | "internal">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "overdue" | "today">("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Modals
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskClient, setNewTaskClient] = useState<"yogamani" | "internal">("yogamani");
  const [newTaskService, setNewTaskService] = useState<"SEO" | "Admin" | "Ads" | "Social" | "Websites">("SEO");
  const [newTaskPriority, setNewTaskPriority] = useState<"High" | "Medium" | "Low">("High");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Toggle Task Completion
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      client: newTaskClient,
      clientName: newTaskClient === "yogamani" ? "Yogamani Himalayan Yoga" : "NextCurrent Media",
      service: newTaskService,
      priority: newTaskPriority,
      status: "today",
      dueText: "Due today",
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle("");
    setShowNewTaskModal(false);
  };

  // AI Assistant Query
  const handleAskAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    // Simulate AI response for quick agency assistance
    setTimeout(() => {
      setAiResponse(
        `AI Strategic Recommendation for "${aiPrompt}":\n\n1. Prioritize Yogamani's technical audit to resolve 404 indexing errors.\n2. Schedule 3 high-retention reel scripts focusing on student transformations.\n3. Send payment reminder invoice for October retainer with UPI / Wire breakdown.`
      );
      setIsAiLoading(false);
    }, 700);
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((t) => {
    if (clientFilter !== "all" && t.client !== clientFilter) return false;
    if (statusFilter === "overdue" && (t.status !== "overdue" || t.completed)) return false;
    if (statusFilter === "today" && (t.status !== "today" || t.completed)) return false;
    if (serviceFilter !== "all" && t.service.toLowerCase() !== serviceFilter.toLowerCase()) return false;
    return true;
  });

  const overdueCount = tasks.filter((t) => t.status === "overdue" && !t.completed).length + 46; // Matches the reference counter
  const dueTodayCount = tasks.filter((t) => t.status === "today" && !t.completed).length;

  // Format current date
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  // Dynamic greeting
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-full bg-[#F4F5FA] text-slate-900 font-sans p-6 md:p-8 space-y-6">
      {/* Top Banner Actions & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setShowReportModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200/90 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm cursor-pointer w-fit"
        >
          <FileText className="w-3.5 h-3.5 text-purple-600" />
          <span>Generate prospect report</span>
        </button>
      </div>

      {/* Main Greeting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
            <span>{dateFormatted}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {greeting}, {adminName.toLowerCase()}.
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-normal">
            <span className="font-semibold text-slate-800">{dueTodayCount} tasks due today</span>,{" "}
            <span className="font-semibold text-red-600">{overdueCount} overdue</span> and{" "}
            <span className="font-semibold text-slate-800">33 posts</span> going out this week.
          </p>
        </div>

        <button
          onClick={() => setShowNewTaskModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs tracking-wide transition shadow-sm shadow-purple-600/20 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New task</span>
        </button>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monthly recurring revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Monthly recurring revenue</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold tracking-tight text-slate-900">₹0</div>
            <div className="text-xs text-slate-500 font-medium mt-1">2 active clients</div>
          </div>
        </div>

        {/* Card 2: Due today / overdue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Due today / overdue</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold tracking-tight text-slate-900">
              {dueTodayCount} / <span className="text-slate-800">{overdueCount}</span>
            </div>
            <div className="text-xs text-red-600 font-semibold mt-1">Clear the overdue first</div>
          </div>
        </div>

        {/* Card 3: Posts this week */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Posts this week</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold tracking-tight text-slate-900">33</div>
            <div className="text-xs text-slate-500 font-medium mt-1">21 scheduled · 0 in review</div>
          </div>
        </div>

        {/* Card 4: Ad spend this month */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Ad spend this month</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="pt-4">
            <div className="text-3xl font-bold tracking-tight text-slate-900">₹0</div>
            <div className="text-xs text-slate-500 font-medium mt-1">1 campaign running · no budget set</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Today's agenda (approx 65%) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Today&apos;s agenda</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-normal leading-relaxed">
                Overdue and due today, by client, most urgent first. Tick to complete; repeating tasks reschedule themselves.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition shrink-0"
            >
              <span>All tasks</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Client Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-100 pb-4">
            <button
              onClick={() => setClientFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                clientFilter === "all"
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              All clients <span className="opacity-70 ml-1">52</span>
            </button>
            <button
              onClick={() => setClientFilter("yogamani")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                clientFilter === "yogamani"
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
              <span>Yogamani Himalayan Yoga</span>
              <span className="opacity-70 ml-0.5">33</span>
            </button>
            <button
              onClick={() => setClientFilter("internal")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                clientFilter === "internal"
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0"></span>
              <span>NextCurrent Media</span>
              <span className="opacity-70 ml-0.5">19</span>
            </button>
            <button
              onClick={() => {
                setClientFilter("all");
                setStatusFilter("all");
                setServiceFilter("all");
              }}
              className="px-2.5 py-1 rounded-full text-xs text-slate-400 hover:text-slate-700 transition ml-auto"
            >
              All
            </button>
          </div>

          {/* Sub-Filters: Overdue, Today, Service Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatusFilter(statusFilter === "overdue" ? "all" : "overdue")}
                className={`px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                  statusFilter === "overdue"
                    ? "bg-red-50 border-red-200 text-red-700 font-semibold"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Overdue <span className="font-semibold ml-0.5">50</span>
              </button>
              <button
                onClick={() => setStatusFilter(statusFilter === "today" ? "all" : "today")}
                className={`px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                  statusFilter === "today"
                    ? "bg-purple-50 border-purple-200 text-purple-700 font-semibold"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Today <span className="font-semibold ml-0.5">{dueTodayCount}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="all">All services</option>
                <option value="seo">SEO</option>
                <option value="admin">Admin</option>
                <option value="ads">Performance ads</option>
                <option value="social">Social</option>
                <option value="websites">Websites</option>
              </select>
            </div>
          </div>

          {/* Grouped Task List */}
          <div className="space-y-6 pt-2">
            {/* Group 1: Yogamani Himalayan Yoga */}
            {(clientFilter === "all" || clientFilter === "yogamani") && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">
                      Y
                    </span>
                    <span className="font-bold text-slate-900">Yogamani Himalayan Yoga</span>
                  </div>
                  <span className="text-slate-400 font-medium">
                    33 tasks · <span className="text-red-600 font-semibold">33 overdue</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {filteredTasks
                    .filter((t) => t.client === "yogamani")
                    .map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          task.completed
                            ? "bg-slate-50 border-slate-200 opacity-60"
                            : "bg-white border-slate-200/80 hover:border-purple-200 hover:shadow-sm"
                        }`}
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition cursor-pointer ${
                            task.completed
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "border-slate-300 hover:border-purple-500"
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs font-medium text-slate-900 leading-snug ${
                              task.completed ? "line-through text-slate-400" : ""
                            }`}
                          >
                            {task.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-semibold text-red-600">
                              {task.dueText}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            {task.service}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Group 2: NextCurrent Media / Internal */}
            {(clientFilter === "all" || clientFilter === "internal") && (
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">
                      NC
                    </span>
                    <span className="font-bold text-slate-900">NextCurrent Media</span>
                  </div>
                  <span className="text-slate-400 font-medium">
                    19 tasks · <span className="text-red-600 font-semibold">17 overdue</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {filteredTasks
                    .filter((t) => t.client === "internal")
                    .map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          task.completed
                            ? "bg-slate-50 border-slate-200 opacity-60"
                            : "bg-white border-slate-200/80 hover:border-purple-200 hover:shadow-sm"
                        }`}
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition cursor-pointer ${
                            task.completed
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "border-slate-300 hover:border-purple-500"
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs font-medium text-slate-900 leading-snug ${
                              task.completed ? "line-through text-slate-400" : ""
                            }`}
                          >
                            {task.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-semibold text-purple-700">
                              {task.dueText}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            {task.service}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (approx 35%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Needs Attention Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Needs attention</h3>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition">
                <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 leading-snug truncate">
                    Payment for October sent
                  </p>
                  <p className="text-slate-500 mt-0.5 text-[11px]">
                    Yogamani Himalayan Yoga · 2d ago
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 leading-snug truncate">
                    Follow up: Joanna Riggs
                  </p>
                  <p className="text-slate-500 mt-0.5 text-[11px]">
                    4 days ago · ₹0/mo
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 leading-snug truncate">
                    Follow up: AnalyticOwl
                  </p>
                  <p className="text-slate-500 mt-0.5 text-[11px]">
                    4 days ago · ₹0/mo
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 leading-snug truncate">
                    Follow up: Gemma Marshall
                  </p>
                  <p className="text-slate-500 mt-0.5 text-[11px]">
                    Yesterday · ₹0/mo
                  </p>
                </div>
              </div>

              {/* Dynamic Leads from DB */}
              {recentLeads.slice(0, 2).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 leading-snug truncate">
                      New Lead: {lead.name}
                    </p>
                    <p className="text-slate-500 mt-0.5 text-[11px]">
                      {lead.company || lead.email} · {lead.budget || "₹0/mo"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collected Revenue Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Collected revenue</h3>
              <span className="text-xs text-purple-600 font-semibold">November</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500">Target: ₹2,50,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-purple-600 h-2 rounded-full w-[8%]"></div>
                </div>
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Yogamani Himalayan Yoga</span>
                  <span className="font-semibold text-amber-600">Invoice Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Retainer Renewals</span>
                  <span className="font-semibold text-slate-800">2 Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Ask AI Button (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowAiModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs shadow-lg shadow-purple-600/30 transition transform hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Create New Task</h3>
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit Core Web Vitals and optimize hero assets"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-purple-600 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Client</label>
                  <select
                    value={newTaskClient}
                    onChange={(e) => setNewTaskClient(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-purple-600 text-xs"
                  >
                    <option value="yogamani">Yogamani Himalayan Yoga</option>
                    <option value="internal">NextCurrent Media</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Service</label>
                  <select
                    value={newTaskService}
                    onChange={(e) => setNewTaskService(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-purple-600 text-xs"
                  >
                    <option value="SEO">SEO</option>
                    <option value="Admin">Admin</option>
                    <option value="Ads">Ads</option>
                    <option value="Social">Social</option>
                    <option value="Websites">Websites</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-purple-600 text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Prospect Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Generate Prospect Report</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Run automated website speed, funnel conversion audit, and SEO benchmark for a prospect URL.
            </p>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="https://prospectwebsite.com"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-purple-600"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Prospect report generated successfully for review.");
                    setShowReportModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition cursor-pointer"
                >
                  Generate PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ask AI Assistant Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Agency AI Copilot</h3>
              </div>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setAiResponse(null);
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Draft client email updates, prioritize today&apos;s tasks, generate reel hooks, or summarize overdue deliverables.
            </p>

            <div className="space-y-3">
              <textarea
                rows={3}
                placeholder="e.g. Write a polite email to Yogamani requesting their signed agreement and advance payment..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-purple-600 text-xs"
              />

              {aiResponse && (
                <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-100 text-slate-800 text-xs whitespace-pre-wrap leading-relaxed">
                  {aiResponse}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={handleAskAi}
                  disabled={isAiLoading || !aiPrompt.trim()}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition flex items-center gap-1.5 text-xs disabled:opacity-50 cursor-pointer"
                >
                  {isAiLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Ask Copilot</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
