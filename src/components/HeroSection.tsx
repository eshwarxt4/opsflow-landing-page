import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface HeroSectionProps {
  onTryDemo: () => void;
  onOpenEarlyAccess: () => void;
}

export function HeroSection({ onTryDemo, onOpenEarlyAccess }: HeroSectionProps) {
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
            <span className="text-primary">without chaos</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Stop chasing updates on WhatsApp. Get clear visibility into what's done and what's not — across every outlet, every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" onClick={onTryDemo}>
              Try OpsFlow for Your Business
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              <Play className="w-4 h-4" />
              See How It Works
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            No signup required. Explore with sample data.
          </p>
        </div>

        {/* Preview mockup */}
        <div className="mt-16 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="relative rounded-xl overflow-hidden shadow-elevated border border-border bg-card">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-status-done/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground">OpsFlow Dashboard</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-background to-muted/30">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Tasks Today", value: "24", change: "+3 pending" },
                  { label: "Outlets Active", value: "5", change: "All reporting" },
                  { label: "Completion Rate", value: "87%", change: "↑ from yesterday" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-primary mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { outlet: "Indiranagar", task: "Morning hygiene checklist", status: "done" },
                  { outlet: "Koramangala", task: "Cold storage temperature log", status: "pending" },
                  { outlet: "Whitefield", task: "Inventory count", status: "done" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-status-done' : 'bg-status-pending'}`} />
                    <span className="text-sm font-medium text-foreground flex-1">{task.task}</span>
                    <span className="text-xs text-muted-foreground">{task.outlet}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${task.status === 'done' ? 'bg-status-done/10 text-status-done' : 'bg-status-pending/10 text-status-pending'}`}>
                      {task.status === 'done' ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
