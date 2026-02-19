import {
  MessageSquare,
  Phone,
  FileSpreadsheet,
  LayoutDashboard,
  CheckCircle2,
  Camera,
  TrendingUp,
  X,
  Check,
  Zap,
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "before" ? "after" : "before"));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === "before") {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 5);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setAnimationStep(0);
    }
  }, [activeTab]);

  return (
    <section id="before-after" className="py-24 section-warm relative overflow-hidden">
      <div className="absolute -top-10 right-[10%] w-80 h-80 bg-accent/4 rounded-full blur-[100px] animate-float" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Before & After</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            From chaos to <span className="text-gradient">calm</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what changes when you have OpsFlow managing your daily operations.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("before")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm ${activeTab === "before"
              ? "bg-destructive text-white shadow-md"
              : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
          >
            <span className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Before OpsFlow
            </span>
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm ${activeTab === "after"
              ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow"
              : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
          >
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              With OpsFlow
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "before" ? (
            <BeforeView animationStep={animationStep} />
          ) : (
            <AfterView />
          )}
        </div>

        {/* Bottom comparison cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14">
          {[
            { before: "Messages buried in groups", after: "Tasks with clear owners", icon: MessageSquare },
            { before: "Constant follow-up calls", after: "Real-time status updates", icon: Phone },
            { before: "Spreadsheets everywhere", after: "One calm dashboard", icon: FileSpreadsheet },
            { before: "No proof of completion", after: "Photo & note evidence", icon: Camera },
          ].map((item, i) => (
            <div key={i} className="p-5 bg-card rounded-2xl border border-border hover:border-primary/20 transition-all hover:shadow-sm">
              <item.icon className="w-5 h-5 text-primary mb-3" />
              <div className="space-y-2">
                <p className="text-sm text-destructive/60 line-through">{item.before}</p>
                <p className="text-sm text-foreground font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-status-done flex-shrink-0" />
                  {item.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeView({ animationStep }: { animationStep: number }) {
  const messages = [
    { from: "Owner", text: "HSR outlet ne morning checklist kiya kya?", time: "8:32 AM" },
    { from: "Manager", text: "Sir checking", time: "8:45 AM" },
    { from: "Owner", text: "Koramangala ka inventory count?", time: "9:15 AM" },
    { from: "Manager", text: "Thoda late ho gaya sir", time: "9:30 AM" },
    { from: "Owner", text: "Temperature log bheja kisine?", time: "10:00 AM" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
      {/* WhatsApp mockup */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-elevated">
        <div className="bg-emerald-600 px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">🏪 Outlets Ops Group</p>
            <p className="text-white/70 text-xs">47 messages</p>
          </div>
          <div className="flex gap-4 text-white/70">
            <Phone className="w-4 h-4" />
          </div>
        </div>
        <div className="p-4 bg-[#ECE5DD] space-y-3 min-h-[320px]">
          {messages.slice(0, animationStep + 1).map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] p-3 rounded-xl text-sm animate-scale-in ${msg.from === "Owner" ? "bg-[#DCF8C6] ml-auto rounded-tr-none" : "bg-white rounded-tl-none"
                }`}
            >
              <p className="font-medium text-xs text-emerald-700 mb-1">{msg.from}</p>
              <p className="text-gray-800">{msg.text}</p>
              <p className="text-[10px] text-gray-500 text-right mt-1">{msg.time}</p>
            </div>
          ))}
          {animationStep >= 4 && (
            <div className="text-center py-3 animate-fade-in">
              <p className="text-xs text-gray-500">... 42 more messages below ...</p>
            </div>
          )}
        </div>
      </div>

      {/* Pain points */}
      <div className="space-y-4">
        <h3 className="text-2xl font-display font-bold text-foreground mb-6">
          The daily chaos of WhatsApp ops
        </h3>
        {[
          { icon: MessageSquare, title: "Tasks buried in messages", desc: "Important updates get lost in endless group chats" },
          { icon: Phone, title: "Constant follow-ups", desc: "Hours spent calling managers to check task status" },
          { icon: Clock, title: "No clear ownership", desc: "Nobody knows who's responsible for what" },
          { icon: FileSpreadsheet, title: "Scattered tracking", desc: "Spreadsheets, notes, and messages everywhere" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive flex-shrink-0">
              <item.icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AfterView() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
      {/* OpsFlow dashboard mockup */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-elevated">
        <div className="bg-gradient-to-r from-[hsl(232,33%,13%)] to-[hsl(232,25%,18%)] px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">OpsFlow</p>
            <p className="text-white/60 text-xs">SpiceRoute Foods</p>
          </div>
          <div className="px-2 py-0.5 bg-status-done/20 rounded text-xs text-status-done font-medium">
            ● Live
          </div>
        </div>
        <div className="p-5 bg-background space-y-4 min-h-[320px]">
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white text-center">
              <p className="text-xl font-display font-bold">18</p>
              <p className="text-[10px] uppercase tracking-wider opacity-80">Done</p>
            </div>
            <div className="p-3 rounded-xl bg-status-pending/10 text-center border border-status-pending/20">
              <p className="text-xl font-display font-bold text-status-pending">4</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pending</p>
            </div>
            <div className="p-3 rounded-xl bg-status-missed/10 text-center border border-status-missed/20">
              <p className="text-xl font-display font-bold text-status-missed">2</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Missed</p>
            </div>
          </div>
          {/* Task list */}
          <div className="space-y-2">
            {[
              { task: "Morning hygiene checklist", outlet: "Indiranagar", status: "done", proof: true },
              { task: "Cold storage temp log", outlet: "Koramangala", status: "done", proof: true },
              { task: "Inventory count", outlet: "HSR Layout", status: "pending", proof: false },
              { task: "Opening checklist", outlet: "Whitefield", status: "pending", proof: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 border border-border/50">
                <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'done' ? 'bg-status-done' : 'bg-status-pending'
                  }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{item.task}</p>
                  <p className="text-[10px] text-muted-foreground">{item.outlet}</p>
                </div>
                {item.proof && <Camera className="w-3.5 h-3.5 text-primary" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <h3 className="text-2xl font-display font-bold text-foreground mb-6">
          One calm dashboard for everything
        </h3>
        {[
          { icon: LayoutDashboard, title: "Single view of all outlets", desc: "See what's done and what's pending at a glance" },
          { icon: CheckCircle2, title: "Clear task ownership", desc: "Every task has an owner and a deadline" },
          { icon: Camera, title: "Photo & note proofs", desc: "Verified completion with evidence attached" },
          { icon: TrendingUp, title: "Track improvements", desc: "See trends and patterns over time" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <item.icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
