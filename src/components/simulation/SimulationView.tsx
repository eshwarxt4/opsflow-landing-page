import { useState, useEffect, useMemo } from "react";
import { ModuleType } from "@/components/ModuleSelector";
import { getSimulationConfig, Task } from "./SimulationData";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, CheckSquare, BarChart3, X, ChevronRight,
  Camera, FileText, Clock, User, Check, AlertCircle, XCircle,
  Users, Briefcase, ArrowRight, MapPin, Zap, TrendingUp,
  MoreVertical, Eye, Menu, ChevronDown, Info, Sparkles,
  Building2, Shield, Bell, ArrowUpRight, Bot, Lightbulb,
  MessageSquare, Target, Activity, BrainCircuit
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

interface SimulationViewProps {
  moduleType: ModuleType;
  onClose: () => void;
  onRequestAccess: () => void;
}

type ViewType = "dashboard" | "tasks" | "performance" | "ai-insights" | "notifications";
type RoleType = "owner" | "manager" | "staff";

const moduleLabels: Record<ModuleType, string> = {
  restaurant: "Restaurants & QSR",
  salon: "Salons & Spas",
  retail: "Retail Stores",
  clinic: "Clinics & Diagnostics",
  hotel: "Hotels & Hostels",
  facility: "Facility Management",
  coaching: "Coaching Centers",
  warehouse: "Warehouses & Logistics",
  custom: "Custom Setup",
};

const roleDescriptions: Record<RoleType, string> = {
  owner: "See all outlets, tasks, and performance across your entire business.",
  manager: "Manage tasks and staff for your assigned outlet only.",
  staff: "View and complete your assigned tasks with photo proof.",
};

export function SimulationView({ moduleType, onClose, onRequestAccess }: SimulationViewProps) {
  const config = getSimulationConfig(moduleType);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState(config.tasks);
  const [currentRole, setCurrentRole] = useState<RoleType>("owner");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showAhaMoment, setShowAhaMoment] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const filteredTasks = useMemo(() => getFilteredTasks(), [tasks, currentRole, selectedOutlet]);
  const totalTasks = filteredTasks.length;
  const doneTasks = filteredTasks.filter(t => t.status === "done").length;
  const pendingTasks = filteredTasks.filter(t => t.status === "pending").length;
  const missedTasks = filteredTasks.filter(t => t.status === "missed").length;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Show aha moment after 3 interactions
  useEffect(() => {
    if (interactionCount >= 3 && !showAhaMoment) {
      const timer = setTimeout(() => setShowAhaMoment(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [interactionCount, showAhaMoment]);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  function showNotification(message: string, type: "success" | "info" = "success") {
    setNotification({ message, type });
  }

  function handleToggleStatus(taskId: string) {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === "done" ? "pending" : "done";
        showNotification(
          newStatus === "done" ? `✅ "${task.name}" marked as done` : `↩️ "${task.name}" marked as pending`,
          newStatus === "done" ? "success" : "info"
        );
        return {
          ...task,
          status: newStatus,
          time: newStatus === "done" ? new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }) : undefined,
          hasProof: newStatus === "done" ? true : task.hasProof,
          proofType: newStatus === "done" ? "photo" as const : task.proofType,
        };
      }
      return task;
    }));
    setInteractionCount(prev => prev + 1);
  }

  function getFilteredTasks(): Task[] {
    try {
      let filtered = [...tasks];
      if (currentRole === "manager" && config.outlets.length > 0) {
        const managerOutlet = config.outlets[0]?.name;
        if (managerOutlet) filtered = filtered.filter(t => t.outlet === managerOutlet);
      } else if (currentRole === "staff" && config.tasks.length > 0) {
        const staffAssignee = config.tasks[0]?.assignee;
        if (staffAssignee) filtered = filtered.filter(t => t.assignee === staffAssignee).slice(0, 5);
      }
      if (selectedOutlet) {
        filtered = filtered.filter(t => t.outlet === selectedOutlet);
      }
      return filtered;
    } catch {
      return tasks;
    }
  }

  const allNavItems = [
    { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard, description: "Overview & metrics", roles: ["owner", "manager", "staff"] },
    { id: "tasks" as ViewType, label: currentRole === "staff" ? "My Tasks" : "Daily Tasks", icon: CheckSquare, description: currentRole === "staff" ? "Your assigned tasks" : "Task management", roles: ["owner", "manager", "staff"] },
    { id: "performance" as ViewType, label: "Performance", icon: BarChart3, description: currentRole === "owner" ? "Fleet analytics" : "Outlet analytics", roles: ["owner", "manager"] },
    { id: "ai-insights" as ViewType, label: "AI Insights", icon: BrainCircuit, description: currentRole === "owner" ? "Fleet intelligence" : "Outlet intelligence", roles: ["owner", "manager"] },
    { id: "notifications" as ViewType, label: "Notifications", icon: Bell, description: "Alerts & reminders", roles: ["owner", "manager", "staff"] },
  ];
  const navItems = allNavItems.filter(item => item.roles.includes(currentRole));

  const roleConfig: Record<RoleType, { label: string; fullLabel: string; icon: React.ElementType; color: string }> = {
    owner: { label: "OWNER", fullLabel: "Business Owner", icon: Briefcase, color: "from-indigo-500 to-purple-500" },
    manager: { label: "MANAGER", fullLabel: "Outlet Manager", icon: Building2, color: "from-blue-500 to-cyan-500" },
    staff: { label: "STAFF", fullLabel: "Staff Member", icon: Shield, color: "from-emerald-500 to-green-500" },
  };

  const topOutlet = [...config.outlets].sort((a, b) => b.completionRate - a.completionRate)[0];

  function handleRoleSwitch(role: RoleType) {
    setCurrentRole(role);
    setSelectedOutlet(null);
    // Reset to dashboard when switching roles to avoid landing on a view the role can't see
    const validViews: ViewType[] = role === "staff" ? ["dashboard", "tasks", "notifications"] : ["dashboard", "tasks", "performance", "ai-insights", "notifications"];
    if (!validViews.includes(currentView)) {
      setCurrentView("dashboard");
    }
    setInteractionCount(prev => prev + 1);
    showNotification(`👁️ Now viewing as ${roleConfig[role].fullLabel}`, "info");
  }

  function handleOutletClick(outletName: string) {
    if (selectedOutlet === outletName) {
      setSelectedOutlet(null);
      showNotification(`📍 Showing all outlets`, "info");
    } else {
      setSelectedOutlet(outletName);
      showNotification(`📍 Filtered to ${outletName}`, "info");
      setCurrentView("tasks");
    }
    setInteractionCount(prev => prev + 1);
  }

  // AI insights generation based on current state AND current role
  function getAiInsights() {
    const insights: { text: string; type: "insight" | "reminder" | "suggestion"; icon: React.ElementType; priority: "high" | "medium" | "low" }[] = [];
    const roleOutlets = currentRole === "owner" ? config.outlets : [config.outlets[0]].filter(Boolean);
    const worstOutlet = [...roleOutlets].sort((a: any, b: any) => a.completionRate - b.completionRate)[0];
    const bestOutlet = [...roleOutlets].sort((a: any, b: any) => b.completionRate - a.completionRate)[0];
    const missedCount = filteredTasks.filter(t => t.status === "missed").length;
    const pendingCount = filteredTasks.filter(t => t.status === "pending").length;
    const doneCount = filteredTasks.filter(t => t.status === "done").length;
    const proofRate = Math.round((filteredTasks.filter(t => t.hasProof).length / Math.max(filteredTasks.length, 1)) * 100);

    if (currentRole === "owner") {
      // Owner: fleet-wide insights
      if (missedCount > 0) {
        insights.push({ text: `⚠️ ${missedCount} task${missedCount > 1 ? 's' : ''} missed across your fleet today. ${worstOutlet?.name || 'One outlet'} needs immediate attention — consider sending a reminder to the team.`, type: "reminder", icon: AlertCircle, priority: "high" });
      }
      if (worstOutlet && worstOutlet.completionRate < 70) {
        insights.push({ text: `📊 ${worstOutlet.name} is at ${worstOutlet.completionRate}% — significantly below your fleet average. Historical pattern shows this outlet tends to lag on mornings.`, type: "insight", icon: TrendingUp, priority: "high" });
      }
      if (bestOutlet && bestOutlet.completionRate >= 95) {
        insights.push({ text: `🏆 ${bestOutlet.name} is your top performer at ${bestOutlet.completionRate}%. ${bestOutlet.manager ? bestOutlet.manager + "'s" : "Their"} team completes tasks 23% faster than average.`, type: "insight", icon: Target, priority: "low" });
      }
      insights.push({ text: `🔍 Fleet-wide photo proof compliance is at ${proofRate}%. Tasks with photo proof have 3x higher audit pass rates.`, type: "insight", icon: Camera, priority: "medium" });
      if (doneCount > 0 && completionRate >= 80) {
        insights.push({ text: `✨ Great momentum! Fleet is at ${completionRate}% completion. At this rate, you'll hit 100% by 11:30 AM.`, type: "suggestion", icon: Sparkles, priority: "low" });
      }
    } else if (currentRole === "manager") {
      // Manager: outlet-specific insights
      const outlet = config.outlets[0];
      if (missedCount > 0) {
        insights.push({ text: `⚠️ ${missedCount} task${missedCount > 1 ? 's' : ''} missed at ${outlet?.name || 'your outlet'}. Follow up with your staff immediately to prevent escalation.`, type: "reminder", icon: AlertCircle, priority: "high" });
      }
      if (pendingCount > 0) {
        insights.push({ text: `⏰ ${pendingCount} task${pendingCount > 1 ? 's' : ''} still pending at ${outlet?.name || 'your outlet'}. Deadline approaching — auto-reminders will fire in 15 minutes.`, type: "reminder", icon: Clock, priority: "medium" });
      }
      insights.push({ text: `📸 Your outlet's photo proof rate is ${proofRate}%. Ensure staff upload proof for all hygiene and safety tasks.`, type: "insight", icon: Camera, priority: "medium" });
      if (completionRate >= 90) {
        insights.push({ text: `⭐ ${outlet?.name || 'Your outlet'} is performing above average at ${completionRate}%! Keep up the great work.`, type: "suggestion", icon: Sparkles, priority: "low" });
      }
      if (completionRate < 70) {
        insights.push({ text: `📊 ${outlet?.name || 'Your outlet'} is at ${completionRate}% — below the target. Prioritize pending tasks to avoid escalation to the owner.`, type: "insight", icon: TrendingUp, priority: "high" });
      }
    }
    // Staff doesn't see AI Insights page (nav is hidden), so no staff insights needed here
    return insights;
  }

  // Generate personalized notifications based on current role
  function getNotifications() {
    const notifications: { id: string; title: string; message: string; type: "alert" | "reminder" | "success" | "ai"; time: string; read: boolean; outlet?: string }[] = [];

    if (currentRole === "owner") {
      // Owner: fleet-wide notifications
      filteredTasks.filter(t => t.status === "missed").forEach((task) => {
        notifications.push({
          id: `missed-${task.id}`,
          title: "Task Missed",
          message: `"${task.name}" at ${task.outlet} was not completed by ${task.deadline || 'deadline'}. ${task.assignee} has been notified.`,
          type: "alert", time: "8 min ago", read: false, outlet: task.outlet
        });
      });
      const worstOutlet = [...config.outlets].sort((a, b) => a.completionRate - b.completionRate)[0];
      const bestOutlet = [...config.outlets].sort((a, b) => b.completionRate - a.completionRate)[0];
      if (worstOutlet && worstOutlet.completionRate < 70) {
        notifications.push({ id: 'ai-worst', title: "AI Alert: Underperforming Outlet", message: `${worstOutlet.name} is at ${worstOutlet.completionRate}% — below fleet average. Schedule a call with ${worstOutlet.manager || 'the manager'}.`, type: "ai", time: "12 min ago", read: false, outlet: worstOutlet.name });
      }
      if (bestOutlet && bestOutlet.completionRate >= 95) {
        notifications.push({ id: 'best-outlet', title: "Outlet Milestone 🎉", message: `${bestOutlet.name} hit ${bestOutlet.completionRate}%! ${bestOutlet.manager || 'The team'} is leading the fleet.`, type: "success", time: "35 min ago", read: true, outlet: bestOutlet.name });
      }
      notifications.push({ id: 'fleet-digest', title: "Fleet Digest", message: `${totalTasks} tasks across ${config.outlets.length} outlets. ${doneTasks} completed, ${completionRate}% on track.`, type: "reminder", time: "7:00 AM", read: true });
      notifications.push({ id: 'owner-ai', title: "AI Recommendation", message: "Tasks assigned before 8 AM have a 95% on-time completion rate across all outlets. Consider standardising early schedules.", type: "ai", time: "Yesterday", read: true });

    } else if (currentRole === "manager") {
      // Manager: outlet-specific notifications
      const outlet = config.outlets[0];
      filteredTasks.filter(t => t.status === "missed").forEach((task) => {
        notifications.push({
          id: `missed-${task.id}`, title: "Task Missed at Your Outlet",
          message: `"${task.name}" was not done by ${task.deadline || 'deadline'}. You need to follow up with ${task.assignee}.`,
          type: "alert", time: "10 min ago", read: false, outlet: outlet?.name
        });
      });
      const pendingTasks = filteredTasks.filter(t => t.status === "pending");
      if (pendingTasks.length > 0) {
        notifications.push({ id: 'mgr-pending', title: "Pending Tasks", message: `${pendingTasks.length} task${pendingTasks.length > 1 ? 's' : ''} still pending at ${outlet?.name || 'your outlet'}. Complete before deadline to avoid escalation to the owner.`, type: "reminder", time: "15 min ago", read: false });
      }
      notifications.push({ id: 'mgr-digest', title: "Daily Outlet Summary", message: `${totalTasks} tasks assigned at ${outlet?.name || 'your outlet'} today. ${doneTasks} done, ${completionRate}% completion.`, type: "reminder", time: "7:00 AM", read: true });
      notifications.push({ id: 'mgr-proof', title: "Photo Proof Reminder", message: `Ensure all staff upload photo proof for hygiene tasks. Current compliance: ${Math.round((filteredTasks.filter(t => t.hasProof).length / Math.max(filteredTasks.length, 1)) * 100)}%.`, type: "ai", time: "1 hr ago", read: true });

    } else {
      // Staff: personal task notifications
      filteredTasks.filter(t => t.status === "missed").forEach((task) => {
        notifications.push({
          id: `missed-${task.id}`, title: "You Missed a Task",
          message: `"${task.name}" was due by ${task.deadline || 'deadline'} and has been marked as missed. Please complete it ASAP or contact your manager.`,
          type: "alert", time: "5 min ago", read: false
        });
      });
      const myPending = filteredTasks.filter(t => t.status === "pending");
      if (myPending.length > 0) {
        notifications.push({ id: 'staff-pending', title: "Tasks Due Soon", message: `You have ${myPending.length} task${myPending.length > 1 ? 's' : ''} still pending. Complete them before the deadline to stay on track.`, type: "reminder", time: "20 min ago", read: false });
      }
      const myDone = filteredTasks.filter(t => t.status === "done");
      if (myDone.length > 0) {
        notifications.push({ id: 'staff-done', title: "Nice Work! ✅", message: `You've completed ${myDone.length} of ${totalTasks} tasks today. ${completionRate >= 100 ? "All done!" : "Keep going!"}`, type: "success", time: "30 min ago", read: true });
      }
      notifications.push({ id: 'staff-reminder', title: "Daily Reminder", message: `You have ${totalTasks} tasks assigned today. Don't forget to upload photo proof for each completed task.`, type: "reminder", time: "7:00 AM", read: true });
    }

    return notifications;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      {/* ─── Top Simulation Header ─── */}
      <div className="h-12 bg-gradient-to-r from-[hsl(241,60%,48%)] to-[hsl(262,83%,52%)] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <span className="px-2.5 py-0.5 bg-white/20 rounded text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Live Simulation
          </span>
          <span className="text-white/80 text-sm font-medium hidden sm:block">{moduleLabels[moduleType]}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRequestAccess}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get OpsFlow
          </button>
          <button onClick={onClose} className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors p-1.5 hover:bg-white/10 rounded-lg">
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* ─── Welcome Guide Tooltip ─── */}
      {showGuide && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20 px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Welcome to the OpsFlow Simulation!</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Explore a realistic demo of <strong>{config.businessName}</strong>.
                Try switching roles (Owner → Manager → Staff), click tasks to toggle them, and filter by outlet.
                Everything is interactive — play around to see how OpsFlow works.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowGuide(false)}
            className="p-1 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* ─── Mobile overlay ─── */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ─── Sidebar ─── */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 md:z-auto w-64 bg-[hsl(232,33%,13%)] text-white flex flex-col flex-shrink-0 transition-transform duration-300 ease-out`}>
          {/* Business info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{config.businessName[0]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">{config.businessName}</p>
                <p className="text-[11px] text-white/50">{config.businessSubtitle}</p>
                <p className="text-[10px] text-white/30 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5" /> {config.location}
                </p>
              </div>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="p-3 border-b border-white/10">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium px-1 mb-2">Switch Perspective</p>
            <div className="space-y-1">
              {(Object.keys(roleConfig) as RoleType[]).map((role) => {
                const rc = roleConfig[role];
                return (
                  <button
                    key={role}
                    onClick={() => { handleRoleSwitch(role); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${currentRole === role
                      ? `bg-gradient-to-r ${rc.color} text-white shadow-sm`
                      : "text-white/60 hover:bg-white/5 hover:text-white/90"
                      }`}
                  >
                    <rc.icon className="w-4 h-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold">{rc.fullLabel}</p>
                      {currentRole === role && (
                        <p className="text-[9px] text-white/70 mt-0.5">{roleDescriptions[role]}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="p-2 flex-shrink-0">
            <p className="text-[10px] text-white/30 uppercase tracking-widest px-3 py-2 font-medium">Navigation</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${currentView === item.id
                  ? "bg-gradient-to-r from-primary/30 to-accent/20 text-white font-medium"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <div className="flex-1 text-left">
                  <p className="text-sm">{item.label}</p>
                  {currentView === item.id && (
                    <p className="text-[9px] text-white/50">{item.description}</p>
                  )}
                </div>
                {item.id === "notifications" && filteredTasks.filter(t => t.status === "missed").length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-[10px] text-white font-bold flex items-center justify-center">
                    {filteredTasks.filter(t => t.status === "missed").length}
                  </span>
                )}
                {item.id === "ai-insights" && (
                  <span className="px-1.5 py-0.5 rounded-full bg-violet-500/30 text-[8px] text-violet-300 font-bold uppercase">AI</span>
                )}
                {currentView === item.id && !(item.id === "notifications" || item.id === "ai-insights") && <ChevronRight className="w-3 h-3 text-white/40" />}
              </button>
            ))}
          </div>

          {/* Live Outlets */}
          <div className="p-2 flex-1 overflow-auto custom-scrollbar">
            <p className="text-[10px] text-white/30 uppercase tracking-widest px-3 py-2 font-medium">
              Outlets {currentRole !== "staff" && `(${config.outlets.length})`}
            </p>
            {(currentRole === "staff" ? [config.outlets[0]] : currentRole === "manager" ? [config.outlets[0]] : config.outlets).filter(Boolean).map((outlet) => (
              <button
                key={outlet.id}
                onClick={() => { handleOutletClick(outlet.name); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm ${selectedOutlet === outlet.name
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/80"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${outlet.completionRate >= 90 ? 'bg-green-400' :
                    outlet.completionRate >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                    } ${selectedOutlet === outlet.name ? 'ring-2 ring-white/20' : ''}`} />
                  <span className="truncate">{outlet.name}</span>
                </div>
                <span className={`text-xs font-semibold ${outlet.completionRate >= 90 ? 'text-green-400' :
                  outlet.completionRate >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                  {outlet.completionRate}%
                </span>
              </button>
            ))}
            {selectedOutlet && (
              <button
                onClick={() => { setSelectedOutlet(null); showNotification("📍 Showing all outlets", "info"); }}
                className="w-full mt-1 px-3 py-1.5 text-[10px] text-primary font-semibold uppercase tracking-wider hover:bg-white/5 rounded-lg transition-colors"
              >
                ✕ Clear Filter
              </button>
            )}
          </div>



          {/* Bottom CTA */}
          <div className="p-3 border-t border-white/10">
            <Button
              size="sm"
              onClick={onRequestAccess}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              I Want This for My Business
            </Button>
          </div>
        </div>

        {/* ─── Main Content ─── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[hsl(220,14%,96%)]">
          {/* Content Header */}
          <header className="h-14 border-b border-border bg-white px-4 md:px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${roleConfig[currentRole].color} flex items-center justify-center`}>
                  {(() => { const Icon = roleConfig[currentRole].icon; return <Icon className="w-4 h-4 text-white" />; })()}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Viewing as <span className="text-primary font-semibold">{roleConfig[currentRole].fullLabel}</span></p>
                  <h1 className="font-display font-bold text-foreground text-sm md:text-base leading-tight">
                    {currentView === "dashboard" ? "Dashboard" : currentView === "tasks" ? "Daily Tasks" : currentView === "performance" ? "Performance" : currentView === "ai-insights" ? "AI Insights" : "Notifications"}
                    {selectedOutlet && <span className="text-primary ml-1">— {selectedOutlet}</span>}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-xl">
                <span className="text-xs text-muted-foreground">Completion</span>
                <span className={`text-lg font-display font-bold ${completionRate >= 80 ? 'text-green-600' : completionRate >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {completionRate}%
                </span>
              </div>
              {/* Mobile tab nav */}
              <div className="flex md:hidden items-center gap-1 bg-muted rounded-xl p-0.5">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`p-2 rounded-lg transition-all ${currentView === item.id ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}
                  >
                    <item.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* View Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 custom-scrollbar">
            {currentView === "dashboard" && (
              <DashboardView
                config={config}
                tasks={filteredTasks}
                doneTasks={doneTasks}
                pendingTasks={pendingTasks}
                missedTasks={missedTasks}
                totalTasks={totalTasks}
                completionRate={completionRate}
                currentRole={currentRole}
                topOutlet={topOutlet}
                selectedOutlet={selectedOutlet}
                onSelectTask={setSelectedTask}
                onToggleStatus={handleToggleStatus}
                onViewTasks={() => setCurrentView("tasks")}
              />
            )}
            {currentView === "tasks" && (
              <TasksView
                tasks={filteredTasks}
                config={config}
                onSelectTask={setSelectedTask}
                onToggleStatus={handleToggleStatus}
                currentRole={currentRole}
                selectedOutlet={selectedOutlet}
                onSelectOutlet={setSelectedOutlet}
              />
            )}
            {currentView === "performance" && (
              <PerformanceView config={config} currentRole={currentRole} tasks={tasks} />
            )}
            {currentView === "ai-insights" && (
              <AiInsightsView
                insights={getAiInsights()}
                config={config}
                tasks={filteredTasks}
                completionRate={completionRate}
                currentRole={currentRole}
              />
            )}
            {currentView === "notifications" && (
              <NotificationsView
                notifications={getNotifications()}
                config={config}
                currentRole={currentRole}
              />
            )}
          </main>

          {/* Bottom role bar */}
          <div className="border-t border-border bg-white px-4 md:px-6 py-2 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${roleConfig[currentRole].color} flex items-center justify-center`}>
                <Eye className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {roleDescriptions[currentRole]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {(Object.keys(roleConfig) as RoleType[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentRole === role
                    ? `bg-gradient-to-r ${roleConfig[role].color} text-white`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {roleConfig[role].fullLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Task Detail Modal ─── */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          config={config}
          onClose={() => setSelectedTask(null)}
          onToggleStatus={(id: string) => { handleToggleStatus(id); setSelectedTask(null); }}
        />
      )}


      {/* ─── Notification Toast ─── */}
      {notification && (
        <div className={`fixed top-16 right-4 z-[70] px-4 py-3 rounded-xl shadow-elevated border animate-slide-up max-w-xs ${notification.type === "success"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-blue-50 border-blue-200 text-blue-800"
          }`}>
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* ─── Aha Moment CTA ─── */}
      {showAhaMoment && (
        <div className="fixed bottom-20 right-4 z-[70] max-w-sm animate-slide-up">
          <div className="bg-white rounded-2xl shadow-elevated border border-primary/20 p-4 relative">
            <button
              onClick={() => setShowAhaMoment(false)}
              className="absolute top-2 right-2 p-1 hover:bg-muted rounded-lg"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm">Liking what you see?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This is just a simulation. Get the real OpsFlow for your business — set up in under 10 minutes.
                </p>
                <Button
                  size="sm"
                  onClick={onRequestAccess}
                  className="mt-3 bg-gradient-to-r from-primary to-accent text-white border-0 text-xs"
                >
                  Get Early Access <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──── Dashboard View ────────────────────────────────────────────────
function DashboardView({ config, tasks, doneTasks, pendingTasks, missedTasks, totalTasks, completionRate, currentRole, topOutlet, selectedOutlet, onSelectTask, onToggleStatus, onViewTasks }: any) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="metric-card-primary p-4 md:p-5 relative overflow-hidden col-span-2 md:col-span-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
          <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">Completion</p>
          <p className="text-3xl md:text-4xl font-display font-bold text-white mt-1">{completionRate}%</p>
          <p className="text-[10px] text-white/50 mt-1.5 flex items-center gap-1">
            <Zap className="w-3 h-3" /> {doneTasks}/{totalTasks} tasks done
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Done</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-green-600 mt-1">{doneTasks}</p>
          <p className="text-[10px] text-green-600/70 mt-1 flex items-center gap-1">
            <Check className="w-3 h-3" /> Verified
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Pending</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-yellow-600 mt-1">{pendingTasks}</p>
          <p className="text-[10px] text-yellow-600/70 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Awaiting
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Missed</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-red-600 mt-1">{missedTasks}</p>
          <p className="text-[10px] text-red-600/70 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Needs attention
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Today's Tasks</h3>
              <p className="text-xs text-muted-foreground">
                {selectedOutlet ? `Filtered: ${selectedOutlet}` : currentRole === "staff" ? "Your assigned tasks" : "All outlets"}
                {" · "}{doneTasks} of {totalTasks} complete
              </p>
            </div>
          </div>
          <button
            onClick={onViewTasks}
            className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline"
          >
            View All <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {tasks.slice(0, 6).map((task: Task) => (
            <div key={task.id} className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 hover:bg-muted/30 transition-colors cursor-pointer group" onClick={() => onSelectTask(task)}>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleStatus(task.id); }}
                className="flex-shrink-0 group/check"
                title={task.status === "done" ? "Mark as pending" : "Mark as done"}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.status === "done" ? "bg-green-500 border-green-500" :
                  task.status === "missed" ? "bg-red-500 border-red-500" :
                    "border-gray-300 hover:border-primary group-hover/check:border-primary group-hover/check:bg-primary/5"
                  }`}>
                  {task.status === "done" && <Check className="w-3.5 h-3.5 text-white" />}
                  {task.status === "missed" && <X className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${task.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {task.name}
                </p>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {task.outlet}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                    <User className="w-2.5 h-2.5" /> {task.assignee}
                  </span>
                  {task.deadline && (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" /> {task.deadline}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {task.hasProof && (
                  <div className="p-1.5 bg-primary/10 rounded-lg" title="Proof submitted">
                    <Camera className="w-3 h-3 text-primary" />
                  </div>
                )}
                <button onClick={(e) => { e.stopPropagation(); onToggleStatus(task.id); }}>
                  <StatusBadge status={task.status} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {tasks.length > 6 && (
          <button onClick={onViewTasks} className="w-full py-3 text-sm text-primary font-semibold hover:bg-primary/5 transition-colors border-t border-border flex items-center justify-center gap-1">
            View all {tasks.length} tasks <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Outlet Status (Owner/Manager only) */}
      {currentRole !== "staff" && (
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Outlet Performance
          </h3>
          <div className="space-y-2.5">
            {(currentRole === "manager" ? [config.outlets[0]] : config.outlets).filter(Boolean).map((outlet: any) => (
              <div
                key={outlet.id}
                className={`flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${selectedOutlet === outlet.name ? "bg-primary/5 border border-primary/20" : "bg-muted/30 hover:bg-muted/50 border border-transparent"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${outlet.completionRate >= 90 ? 'bg-green-500' :
                    outlet.completionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  <div>
                    <span className="font-medium text-sm text-foreground">{outlet.name}</span>
                    {outlet.manager && <span className="text-xs text-muted-foreground ml-2">Mgr: {outlet.manager}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${outlet.completionRate >= 90 ? 'bg-green-500' :
                      outlet.completionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} style={{ width: `${outlet.completionRate}%` }} />
                  </div>
                  <span className={`text-sm font-bold min-w-[40px] text-right ${outlet.completionRate >= 90 ? 'text-green-600' :
                    outlet.completionRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {outlet.completionRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ──── Tasks View ────────────────────────────────────────────────────
function TasksView({ tasks, config, onSelectTask, onToggleStatus, currentRole, selectedOutlet, onSelectOutlet }: any) {
  const outlets = [...new Set(tasks.map((t: Task) => t.outlet))];

  const statusGroups = [
    { key: "pending", label: "Pending", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", count: tasks.filter((t: Task) => t.status === "pending").length },
    { key: "missed", label: "Missed", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", count: tasks.filter((t: Task) => t.status === "missed").length },
    { key: "done", label: "Completed", icon: Check, color: "text-green-600", bg: "bg-green-50", count: tasks.filter((t: Task) => t.status === "done").length },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Status summary */}
      <div className="flex gap-3 flex-wrap">
        {statusGroups.map(group => (
          <div key={group.key} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${group.bg}`}>
            <group.icon className={`w-3.5 h-3.5 ${group.color}`} />
            <span className={`text-xs font-semibold ${group.color}`}>{group.count} {group.label}</span>
          </div>
        ))}
      </div>

      {/* Outlet Filter */}
      {currentRole !== "staff" && outlets.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onSelectOutlet(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${!selectedOutlet ? "bg-gradient-to-r from-primary to-accent text-white shadow-sm" : "bg-white border border-border text-muted-foreground hover:border-primary/30"
              }`}
          >
            All Outlets ({tasks.length})
          </button>
          {outlets.map((outlet: string) => {
            const count = tasks.filter((t: Task) => t.outlet === outlet).length;
            return (
              <button
                key={outlet}
                onClick={() => onSelectOutlet(selectedOutlet === outlet ? null : outlet)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedOutlet === outlet ? "bg-gradient-to-r from-primary to-accent text-white shadow-sm" : "bg-white border border-border text-muted-foreground hover:border-primary/30"
                  }`}
              >
                {outlet} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Task Cards grouped by outlet */}
      <div className="space-y-2">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 md:gap-4 p-3.5 md:p-4 bg-white rounded-2xl border border-border hover:border-primary/20 transition-all cursor-pointer group"
            onClick={() => onSelectTask(task)}
          >
            <button onClick={(e) => { e.stopPropagation(); onToggleStatus(task.id); }} className="flex-shrink-0" title="Toggle task status">
              <StatusIcon status={task.status} />
            </button>
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm ${task.status === "done" ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.name}</p>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5" /> {task.outlet}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                  <User className="w-2.5 h-2.5" /> {task.assignee}
                </span>
                {task.deadline && (
                  <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" /> {task.deadline}
                  </span>
                )}
                {task.time && (
                  <span className="text-[11px] text-green-600 font-medium flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5" /> {task.time}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {task.hasProof && (
                <div className="p-1.5 bg-primary/10 rounded-lg" title="Proof submitted">
                  {task.proofType === "photo" ? <Camera className="w-3.5 h-3.5 text-primary" /> : <FileText className="w-3.5 h-3.5 text-primary" />}
                </div>
              )}
              <button onClick={(e) => { e.stopPropagation(); onToggleStatus(task.id); }}>
                <StatusBadge status={task.status} />
              </button>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-border">
          <CheckSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">No tasks match this filter</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Try selecting a different outlet or role</p>
        </div>
      )}
    </div>
  );
}

// ──── Performance View ────────────────────────────────────────────
function PerformanceView({ config, currentRole, tasks }: any) {
  const outletData = config.outlets.map((o: any) => ({
    name: o.name,
    completion: o.completionRate,
    tasks: o.totalTasks,
  }));

  const allDone = tasks.filter((t: Task) => t.status === "done").length;
  const allTotal = tasks.length;
  const avgCompletion = Math.round(config.outlets.reduce((sum: number, o: any) => sum + o.completionRate, 0) / config.outlets.length);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Avg Completion</p>
          <p className="text-3xl font-display font-bold text-primary mt-1">{avgCompletion}%</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Total Tasks</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{allTotal}</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Completed</p>
          <p className="text-3xl font-display font-bold text-green-600 mt-1">{allDone}</p>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
        <h3 className="font-display font-semibold text-foreground mb-1">Weekly Completion Trend</h3>
        <p className="text-sm text-muted-foreground mb-5">Average completion rate over the past 7 days</p>
        <div className="h-56 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={config.performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="day" stroke="hsl(220 10% 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(220 10% 46%)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid hsl(220 13% 91%)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
              />
              <Line type="monotone" dataKey="completion" stroke="hsl(241 70% 55%)" strokeWidth={3} dot={{ r: 5, fill: 'hsl(241 70% 55%)' }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Outlet Rankings */}
      {currentRole !== "staff" && (
        <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">Outlet Rankings</h3>
          <p className="text-sm text-muted-foreground mb-5">Performance comparison across outlets</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outletData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="hsl(220 10% 46%)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="hsl(220 10% 46%)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsl(220 13% 91%)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="completion" fill="hsl(241 70% 55%)" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Staff Leaderboard */}
      <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Staff Leaderboard
        </h3>
        <div className="space-y-2.5">
          {config.outlets.sort((a: any, b: any) => b.completionRate - a.completionRate).slice(0, 5).map((outlet: any, i: number) => (
            <div key={outlet.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-yellow-100 text-yellow-700' :
                i === 1 ? 'bg-gray-100 text-gray-600' :
                  i === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-muted text-muted-foreground'
                }`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">{outlet.manager || outlet.name}</p>
                <p className="text-xs text-muted-foreground">{outlet.name} · {outlet.totalTasks} tasks</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${outlet.completionRate >= 90 ? 'bg-green-500' : outlet.completionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${outlet.completionRate}%` }} />
                </div>
                <span className={`text-sm font-bold min-w-[36px] text-right ${outlet.completionRate >= 90 ? 'text-green-600' :
                  outlet.completionRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                  {outlet.completionRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──── AI Insights View ──────────────────────────────────────────────
function AiInsightsView({ insights, config, tasks, completionRate, currentRole }: any) {
  const highPriority = insights.filter((i: any) => i.priority === "high");
  const medPriority = insights.filter((i: any) => i.priority === "medium");
  const lowPriority = insights.filter((i: any) => i.priority === "low");
  const proofRate = Math.round((tasks.filter((t: Task) => t.hasProof).length / Math.max(tasks.length, 1)) * 100);
  const worstOutlet = [...config.outlets].sort((a: any, b: any) => a.completionRate - b.completionRate)[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI Summary Header */}
      <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">OpsFlow AI</h2>
              <p className="text-white/60 text-sm">Real-time operational intelligence for {config.businessName}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Health Score</p>
              <p className="text-2xl font-bold mt-1">{completionRate >= 80 ? "A" : completionRate >= 60 ? "B" : "C"}</p>
              <p className="text-[10px] text-white/40">{completionRate}% completion</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Insights</p>
              <p className="text-2xl font-bold mt-1">{insights.length}</p>
              <p className="text-[10px] text-white/40">Active recommendations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Proof Rate</p>
              <p className="text-2xl font-bold mt-1">{proofRate}%</p>
              <p className="text-[10px] text-white/40">Photo compliance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Risk Level</p>
              <p className="text-2xl font-bold mt-1">{highPriority.length > 0 ? "⚠️" : "✅"}</p>
              <p className="text-[10px] text-white/40">{highPriority.length} high priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {highPriority.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Critical Alerts
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">{highPriority.length}</span>
          </h3>
          {highPriority.map((insight: any, i: number) => (
            <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <insight.icon className="w-4.5 h-4.5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1 flex items-center gap-1.5">
                  {insight.type === "reminder" ? "Reminder" : "Alert"}
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                </p>
                <p className="text-sm text-red-800 leading-relaxed">{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Insights Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {medPriority.concat(lowPriority).map((insight: any, i: number) => (
          <div
            key={i}
            className={`bg-white rounded-xl border p-4 hover:shadow-sm transition-all ${insight.priority === "medium" ? "border-amber-100" : "border-border"
              }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${insight.type === "suggestion" ? "bg-green-100" : insight.priority === "medium" ? "bg-amber-100" : "bg-violet-100"
                }`}>
                <insight.icon className={`w-4 h-4 ${insight.type === "suggestion" ? "text-green-600" : insight.priority === "medium" ? "text-amber-600" : "text-violet-600"
                  }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  {insight.type === "reminder" && <span className="text-amber-500">Reminder</span>}
                  {insight.type === "insight" && <span className="text-violet-500">Insight</span>}
                  {insight.type === "suggestion" && <span className="text-green-500">Suggestion</span>}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">{insight.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-violet-500" />
          AI Recommendations
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 bg-violet-50/50 rounded-xl border border-violet-100/50">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Optimize Task Scheduling</p>
              <p className="text-xs text-muted-foreground mt-0.5">Tasks scheduled before 9 AM show 95% on-time completion. Consider shifting morning checklists 30 minutes earlier.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Share Best Practices</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your top-performing outlet completes tasks 23% faster. Export their checklist template to underperforming locations.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-amber-50/50 rounded-xl border border-amber-100/50">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Increase Photo Proof Adoption</p>
              <p className="text-xs text-muted-foreground mt-0.5">Currently at {proofRate}% compliance. Enable mandatory photo proof for hygiene and safety tasks to improve audit scores by 3x.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──── Notifications View ────────────────────────────────────────────
function NotificationsView({ notifications, config, currentRole }: any) {
  const [filter, setFilter] = useState<"all" | "unread" | "ai" | "alerts">("all");

  const filtered = notifications.filter((n: any) => {
    if (filter === "unread") return !n.read;
    if (filter === "ai") return n.type === "ai";
    if (filter === "alerts") return n.type === "alert";
    return true;
  });

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string; border: string; label: string }> = {
    alert: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100", border: "border-l-red-500", label: "Alert" },
    reminder: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", border: "border-l-amber-500", label: "Reminder" },
    success: { icon: Check, color: "text-green-600", bg: "bg-green-100", border: "border-l-green-500", label: "Success" },
    ai: { icon: BrainCircuit, color: "text-violet-600", bg: "bg-violet-100", border: "border-l-violet-500", label: "AI Insight" },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">{unreadCount}</span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Personalised alerts and AI-powered recommendations</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {([
          { id: "all", label: "All", count: notifications.length },
          { id: "unread", label: "Unread", count: unreadCount },
          { id: "ai", label: "AI", count: notifications.filter((n: any) => n.type === "ai").length },
          { id: "alerts", label: "Alerts", count: notifications.filter((n: any) => n.type === "alert").length },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${filter === tab.id
              ? "bg-primary text-white shadow-sm"
              : "bg-white border border-border text-muted-foreground hover:bg-muted/50"
              }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filter === tab.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
          </div>
        ) : (
          filtered.map((notif: any) => {
            const tc = typeConfig[notif.type] || typeConfig.reminder;
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-xl border border-border border-l-4 ${tc.border} p-4 hover:shadow-sm transition-all ${!notif.read ? "bg-white" : "bg-muted/20"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl ${tc.bg} flex items-center justify-center flex-shrink-0`}>
                    <tc.icon className={`w-4 h-4 ${tc.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                          {notif.title}
                        </h4>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${tc.bg} ${tc.color}`}>
                          {tc.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground flex-shrink-0">{notif.time}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${!notif.read ? "text-foreground/80" : "text-muted-foreground"}`}>
                      {notif.message}
                    </p>
                    {notif.outlet && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-muted rounded-full text-[10px] text-muted-foreground">
                        <MapPin className="w-2.5 h-2.5" /> {notif.outlet}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ──── Task Detail Modal ───────────────────────────────────────────
function TaskDetailModal({ task, config, onClose, onToggleStatus }: {
  task: Task; config: any; onClose: () => void; onToggleStatus: (taskId: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl border border-border w-full max-w-md shadow-elevated animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <StatusBadge status={task.status} />
            <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-xl transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-display font-bold text-foreground text-lg">{task.name}</h3>
        </div>

        {/* Details */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-xl">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" /> Outlet
              </p>
              <p className="text-sm font-medium text-foreground">{task.outlet}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-xl">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                <User className="w-2.5 h-2.5" /> Assigned to
              </p>
              <p className="text-sm font-medium text-foreground">{task.assignee}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {task.deadline && (
              <div className="p-3 bg-muted/30 rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> Deadline
                </p>
                <p className="text-sm font-medium text-foreground">{task.deadline}</p>
              </div>
            )}
            {task.time && (
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-[10px] text-green-600 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> Completed at
                </p>
                <p className="text-sm font-medium text-green-700">{task.time}</p>
              </div>
            )}
          </div>

          {/* Photo Proof */}
          {task.hasProof && (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Proof Submitted</p>
              {task.proofType === "photo" ? (
                <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center border border-green-100 relative overflow-hidden">
                  {/* SVG proof illustration */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
                      <Camera className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-green-700">Photo Proof Verified ✓</p>
                    <p className="text-[10px] text-green-600/60 mt-1">
                      {task.time || "Submitted"} · GPS: {config.location || "Verified"}
                    </p>
                  </div>
                  {/* Corner checkmark */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Note Submitted</p>
                      <p className="text-sm text-blue-700 mt-1">{task.proofNote}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="p-5 border-t border-border flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className={`flex-1 ${task.status !== "done" ? "bg-gradient-to-r from-primary to-accent text-white border-0" : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"}`}
            onClick={() => onToggleStatus(task.id)}
          >
            {task.status === "done" ? "↩ Mark Pending" : "✓ Mark as Done"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ──── Utility Components ─────────────────────────────────────────
function StatusIcon({ status }: { status: Task["status"] }) {
  if (status === "done") return <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>;
  if (status === "pending") return <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center"><AlertCircle className="w-3.5 h-3.5 text-white" /></div>;
  return <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"><XCircle className="w-3.5 h-3.5 text-white" /></div>;
}

function StatusBadge({ status }: { status: Task["status"] }) {
  const styles = { done: "bg-green-100 text-green-700", pending: "bg-yellow-100 text-yellow-700", missed: "bg-red-100 text-red-700" };
  const labels = { done: "Done ✓", pending: "Pending", missed: "Missed !" };
  return <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer hover:opacity-80 transition-opacity ${styles[status]}`}>{labels[status]}</span>;
}
