import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  onTryDemo: () => void;
  onOpenEarlyAccess: () => void;
}

export function HeroSection({ onTryDemo, onOpenEarlyAccess }: HeroSectionProps) {
  // Animated counters
  const [stats, setStats] = useState({
    completed: 18,
    pending: 4,
    missed: 2,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const shouldComplete = prev.pending > 1 && Math.random() > 0.5;
        if (shouldComplete) {
          return {
            completed: prev.completed + 1,
            pending: prev.pending - 1,
            missed: prev.missed,
          };
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalTasks = stats.completed + stats.pending + stats.missed;
  const completionRate = Math.round((stats.completed / totalTasks) * 100);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
            <span className="text-sm text-muted-foreground">Now accepting early access requests</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance animate-slide-up">
            Run daily operations across outlets{" "}
            <span className="text-primary">without chasing people</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Stop chasing updates on WhatsApp. Get clear visibility into what's done and what's not — across every outlet, every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" onClick={onTryDemo}>
              Explore Live Simulation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' })}>
              <Play className="w-4 h-4" />
              See How It Works
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            No signup required · Sample data · Early preview
          </p>
        </div>

        {/* Animated Dashboard Preview */}
        <div className="mt-16 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="relative rounded-xl overflow-hidden shadow-elevated border border-border bg-card">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-status-done/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground">OpsFlow Dashboard — SpiceRoute Foods</span>
              </div>
              <div className="px-2 py-0.5 bg-primary/10 rounded text-xs text-primary">
                Live Preview
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 bg-gradient-to-br from-background to-muted/30">
              {/* Live Stats with animation */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-card border border-border group hover:border-status-done/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-status-done" />
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <p className="text-3xl font-bold text-status-done transition-all">
                    {stats.completed}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {completionRate}% done today
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border group hover:border-status-pending/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-status-pending" />
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <p className="text-3xl font-bold text-status-pending transition-all">
                    {stats.pending}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Awaiting completion
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border group hover:border-status-missed/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-status-missed" />
                    <p className="text-xs text-muted-foreground">Missed</p>
                  </div>
                  <p className="text-3xl font-bold text-status-missed">
                    {stats.missed}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Need attention
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground font-medium">Today's Progress</span>
                  <span className="text-sm font-bold text-primary">{completionRate}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              {/* Outlet list */}
              <div className="space-y-2">
                {[
                  { outlet: "Indiranagar", tasks: "6/6", rate: 100, status: "done" },
                  { outlet: "Koramangala", tasks: "5/6", rate: 83, status: "pending" },
                  { outlet: "Whitefield", tasks: "4/6", rate: 67, status: "pending" },
                  { outlet: "HSR Layout", tasks: "3/6", rate: 50, status: "missed" },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/20 transition-all cursor-pointer group"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'done' ? 'bg-status-done' : 
                      item.status === 'pending' ? 'bg-status-pending' : 'bg-status-missed'
                    }`} />
                    <span className="text-sm font-medium text-foreground flex-1">{item.outlet}</span>
                    <span className="text-xs text-muted-foreground">{item.tasks} tasks</span>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.status === 'done' ? 'bg-status-done' : 
                          item.status === 'pending' ? 'bg-status-pending' : 'bg-status-missed'
                        }`}
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      item.status === 'done' ? 'text-status-done' : 
                      item.status === 'pending' ? 'text-status-pending' : 'text-status-missed'
                    }`}>
                      {item.rate}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating indicator */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-lg animate-pulse-subtle">
              ↻ Live updating
            </div>
          </div>

          {/* Trust elements */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-done" />
              4 outlets tracked
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-done" />
              24 tasks today
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-done" />
              Real-time updates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
