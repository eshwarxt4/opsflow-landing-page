import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Building2, Users, BarChart3, Shield, Clock, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface HeroSectionProps {
  onTryDemo: () => void;
  onOpenEarlyAccess: () => void;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function HeroSection({ onTryDemo, onOpenEarlyAccess }: HeroSectionProps) {
  const [activeOutlet, setActiveOutlet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOutlet((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const outlets = [
    { name: "Indiranagar", tasks: "12/12", rate: 100, status: "done" },
    { name: "Koramangala", tasks: "9/12", rate: 75, status: "pending" },
    { name: "Whitefield", tasks: "12/12", rate: 100, status: "done" },
    { name: "HSR Layout", tasks: "7/12", rate: 58, status: "missed" },
  ];

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden hero-gradient">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Floating orbs */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-10 left-[5%] w-[300px] h-[300px] bg-accent/6 rounded-full blur-[80px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
              <span className="text-sm font-medium text-primary">Now accepting early access</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-foreground leading-[1.1] mb-6 animate-slide-up">
              Run daily operations across outlets{" "}
              <span className="text-gradient">without chasing people</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-slide-up max-w-md" style={{ animationDelay: "0.1s" }}>
              Stop chasing updates on WhatsApp. Get clear visibility into what's done and what's not — across every outlet, every day.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button
                size="lg"
                onClick={onTryDemo}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-white border-0 shadow-glow px-6 h-12 text-base font-semibold"
              >
                Explore Live Demo
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 px-6 text-base"
              >
                <Play className="w-4 h-4 mr-1" />
                See How It Works
              </Button>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  <AnimatedCounter end={500} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">Outlets Managed</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  <AnimatedCounter end={10} suffix="K+" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">Tasks Daily</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  <AnimatedCounter end={98} suffix="%" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">On-Time Rate</p>
              </div>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border/80 bg-card">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-1 bg-white rounded-md text-xs text-muted-foreground font-mono">
                    app.opsflow.io/dashboard
                  </div>
                </div>
                <div className="px-2 py-0.5 bg-primary/10 rounded text-xs text-primary font-medium">
                  ● Live
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 bg-gradient-to-br from-background to-muted/20">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">SpiceRoute Foods</p>
                    <h3 className="font-display font-bold text-foreground text-lg">Operational Insights</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Daily Completion</p>
                    <p className="text-2xl font-display font-bold text-primary">83%</p>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="metric-card-primary p-3.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 rounded-2xl" />
                    <p className="text-xs uppercase tracking-wider text-white/70 font-medium relative">Fleet Execution</p>
                    <p className="text-2xl font-display font-bold text-white relative mt-1">83%</p>
                    <p className="text-xs text-white/60 relative mt-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> +12% from yesterday
                    </p>
                  </div>
                  <div className="metric-card-secondary p-3.5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Exceptions</p>
                    <p className="text-2xl font-display font-bold text-status-pending mt-1">02</p>
                    <p className="text-xs text-status-missed mt-1">⚠ Action required</p>
                  </div>
                  <div className="metric-card-secondary p-3.5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Top Performer</p>
                    <p className="text-lg font-display font-bold text-foreground mt-1">Whitefield</p>
                    <p className="text-xs text-status-done mt-1">✓ 100% On-Time</p>
                  </div>
                </div>

                {/* Outlet list */}
                <div className="space-y-2">
                  {outlets.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${activeOutlet === i ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent hover:border-border"
                        }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'done' ? 'bg-status-done' :
                          item.status === 'pending' ? 'bg-status-pending' : 'bg-status-missed'
                        }`} />
                      <span className="text-sm font-medium text-foreground flex-1">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.tasks}</span>
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${item.status === 'done' ? 'bg-status-done' :
                              item.status === 'pending' ? 'bg-status-pending' : 'bg-status-missed'
                            }`}
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold min-w-[36px] text-right ${item.status === 'done' ? 'text-status-done' :
                          item.status === 'pending' ? 'text-status-pending' : 'text-status-missed'
                        }`}>
                        {item.rate}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live indicator */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-medium shadow-glow animate-pulse-subtle">
                ↻ Live updating
              </div>
            </div>

            {/* Decorative floating card */}
            <div className="absolute -bottom-4 -left-4 p-3 bg-white rounded-xl shadow-elevated border border-border animate-float hidden lg:flex items-center gap-2.5" style={{ animationDelay: "1s" }}>
              <div className="w-8 h-8 rounded-lg bg-status-done/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-status-done" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Task Completed</p>
                <p className="text-[10px] text-muted-foreground">Morning checklist — Indiranagar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry trust bar */}
        <div className="mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-center text-sm font-medium text-muted-foreground mb-5">Designed for multi-outlet businesses</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/60">
            {[
              { icon: Building2, label: "Restaurants" },
              { icon: Users, label: "Salons" },
              { icon: Shield, label: "Clinics" },
              { icon: BarChart3, label: "Retail" },
              { icon: Clock, label: "Hotels" },
              { icon: Zap, label: "Warehouses" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors">
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
