import { useState } from "react";
import { ModuleType } from "@/components/ModuleSelector";
import { getSimulationConfig, Task } from "./SimulationData";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Building2, 
  BarChart3, 
  X, 
  ChevronRight,
  Camera,
  FileText,
  Clock,
  User,
  Check,
  AlertCircle,
  XCircle
} from "lucide-react";

interface SimulationViewProps {
  moduleType: ModuleType;
  onClose: () => void;
  onRequestAccess: () => void;
}

type ViewType = "dashboard" | "tasks" | "outlets" | "reports";

export function SimulationView({ moduleType, onClose, onRequestAccess }: SimulationViewProps) {
  const config = getSimulationConfig(moduleType);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState(config.tasks);

  const today = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === "done").length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const missedTasks = tasks.filter(t => t.status === "missed").length;

  const handleToggleStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === "done" ? "pending" : "done";
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const navItems = [
    { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks" as ViewType, label: "Daily Tasks", icon: CheckSquare },
    { id: "outlets" as ViewType, label: "Outlets", icon: Building2 },
    { id: "reports" as ViewType, label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">O</span>
            </div>
            <span className="font-semibold">OpsFlow</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-sidebar-accent rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 border-b border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 mb-1">Business</p>
          <p className="font-medium text-sm">{config.businessName}</p>
          <p className="text-xs text-sidebar-foreground/60 mt-2 mb-1">Role</p>
          <p className="font-medium text-sm">{config.role}</p>
        </div>

        <nav className="flex-1 p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentView === item.id 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "hover:bg-sidebar-accent text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="p-3 bg-sidebar-accent rounded-lg">
            <p className="text-xs text-sidebar-foreground/80 mb-2">This is a preview simulation</p>
            <Button 
              size="sm" 
              variant="default" 
              className="w-full text-xs"
              onClick={onRequestAccess}
            >
              Request Early Access
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card px-6 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-foreground">
              {navItems.find(n => n.id === currentView)?.label}
            </h1>
            <p className="text-xs text-muted-foreground">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{config.outlets.length} outlets</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-muted/30">
          {currentView === "dashboard" && (
            <DashboardView 
              config={config} 
              tasks={tasks}
              doneTasks={doneTasks}
              pendingTasks={pendingTasks}
              missedTasks={missedTasks}
              totalTasks={totalTasks}
            />
          )}
          {currentView === "tasks" && (
            <TasksView 
              tasks={tasks} 
              onSelectTask={setSelectedTask}
              onToggleStatus={handleToggleStatus}
            />
          )}
          {currentView === "outlets" && (
            <OutletsView config={config} />
          )}
          {currentView === "reports" && (
            <ReportsView />
          )}
        </main>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}

function DashboardView({ config, tasks, doneTasks, pendingTasks, missedTasks, totalTasks }: {
  config: ReturnType<typeof getSimulationConfig>;
  tasks: Task[];
  doneTasks: number;
  pendingTasks: number;
  missedTasks: number;
  totalTasks: number;
}) {
  const completionRate = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-xl border border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Tasks</p>
          <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <p className="text-xs text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-bold text-status-done">{doneTasks}</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-status-pending">{pendingTasks}</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <p className="text-xs text-muted-foreground mb-1">Missed</p>
          <p className="text-2xl font-bold text-status-missed">{missedTasks}</p>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="p-6 bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Today's Progress</h3>
          <span className="text-2xl font-bold text-primary">{completionRate}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Outlet Status */}
      <div className="p-6 bg-card rounded-xl border border-border">
        <h3 className="font-medium text-foreground mb-4">Outlet Status</h3>
        <div className="space-y-3">
          {config.outlets.map((outlet) => (
            <div key={outlet.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  outlet.completionRate >= 90 ? 'bg-status-done' : 
                  outlet.completionRate >= 70 ? 'bg-status-pending' : 'bg-status-missed'
                }`} />
                <span className="font-medium text-sm text-foreground">{outlet.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {outlet.pendingTasks} pending
                </span>
                <span className={`text-sm font-medium ${
                  outlet.completionRate >= 90 ? 'text-status-done' : 
                  outlet.completionRate >= 70 ? 'text-status-pending' : 'text-status-missed'
                }`}>
                  {outlet.completionRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="p-6 bg-card rounded-xl border border-border">
        <h3 className="font-medium text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <StatusIcon status={task.status} />
                <div>
                  <p className="text-sm font-medium text-foreground">{task.name}</p>
                  <p className="text-xs text-muted-foreground">{task.outlet}</p>
                </div>
              </div>
              {task.time && (
                <span className="text-xs text-muted-foreground">{task.time}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksView({ tasks, onSelectTask, onToggleStatus }: {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onToggleStatus: (taskId: string) => void;
}) {
  const outlets = [...new Set(tasks.map(t => t.outlet))];
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);

  const filteredTasks = selectedOutlet 
    ? tasks.filter(t => t.outlet === selectedOutlet)
    : tasks;

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedOutlet === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedOutlet(null)}
        >
          All Outlets
        </Button>
        {outlets.map((outlet) => (
          <Button
            key={outlet}
            variant={selectedOutlet === outlet ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedOutlet(outlet)}
          >
            {outlet}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div 
            key={task.id}
            className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer group"
            onClick={() => onSelectTask(task)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(task.id);
              }}
              className="flex-shrink-0"
            >
              <StatusIcon status={task.status} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{task.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {task.outlet}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" /> {task.assignee}
                </span>
                {task.time && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.time}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {task.hasProof && (
                <div className="p-1.5 bg-primary/10 rounded">
                  {task.proofType === "photo" ? (
                    <Camera className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
              )}
              <StatusBadge status={task.status} />
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutletsView({ config }: { config: ReturnType<typeof getSimulationConfig> }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {config.outlets.map((outlet) => (
        <div key={outlet.id} className="p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">{outlet.name}</h3>
            <span className={`text-lg font-bold ${
              outlet.completionRate >= 90 ? 'text-status-done' : 
              outlet.completionRate >= 70 ? 'text-status-pending' : 'text-status-missed'
            }`}>
              {outlet.completionRate}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full rounded-full ${
                outlet.completionRate >= 90 ? 'bg-status-done' : 
                outlet.completionRate >= 70 ? 'bg-status-pending' : 'bg-status-missed'
              }`}
              style={{ width: `${outlet.completionRate}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {outlet.totalTasks - outlet.pendingTasks} of {outlet.totalTasks} tasks done
            </span>
            {outlet.pendingTasks > 0 && (
              <span className="text-status-pending font-medium">
                {outlet.pendingTasks} pending
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportsView() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <BarChart3 className="w-12 h-12 text-muted-foreground/50 mb-4" />
      <h3 className="font-medium text-foreground mb-2">Reports Coming Soon</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Weekly and monthly reports will show trends, patterns, and insights across all your outlets.
      </p>
    </div>
  );
}

function TaskDetailModal({ task, onClose, onToggleStatus }: {
  task: Task;
  onClose: () => void;
  onToggleStatus: (taskId: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] bg-foreground/50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-card rounded-xl border border-border w-full max-w-md shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Task Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Task</p>
            <p className="font-medium text-foreground">{task.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Outlet</p>
              <p className="text-sm text-foreground">{task.outlet}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Assigned to</p>
              <p className="text-sm text-foreground">{task.assignee}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <StatusBadge status={task.status} />
            </div>
            {task.time && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Completed at</p>
                <p className="text-sm text-foreground">{task.time}</p>
              </div>
            )}
          </div>
          
          {task.hasProof && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Proof Submitted</p>
              {task.proofType === "photo" ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Photo proof attached</p>
                    <p className="text-xs text-primary mt-1">(Sample simulation)</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-foreground">{task.proofNote}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-border">
          <Button 
            variant={task.status === "done" ? "outline" : "default"}
            className="w-full"
            onClick={() => {
              onToggleStatus(task.id);
              onClose();
            }}
          >
            {task.status === "done" ? "Mark as Pending" : "Mark as Done"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: Task["status"] }) {
  if (status === "done") {
    return (
      <div className="w-5 h-5 rounded-full bg-status-done flex items-center justify-center">
        <Check className="w-3 h-3 text-white" />
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="w-5 h-5 rounded-full bg-status-pending flex items-center justify-center">
        <AlertCircle className="w-3 h-3 text-white" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full bg-status-missed flex items-center justify-center">
      <XCircle className="w-3 h-3 text-white" />
    </div>
  );
}

function StatusBadge({ status }: { status: Task["status"] }) {
  const styles = {
    done: "bg-status-done/10 text-status-done",
    pending: "bg-status-pending/10 text-status-pending",
    missed: "bg-status-missed/10 text-status-missed",
  };

  const labels = {
    done: "Done",
    pending: "Pending",
    missed: "Missed",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
