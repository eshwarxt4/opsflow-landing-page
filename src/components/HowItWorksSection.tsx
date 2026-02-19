import { Settings, Smartphone, BarChart3, CheckCircle2, Camera, TrendingUp, Users, Zap, ArrowRight, Star } from "lucide-react";

/* ── Infographic illustrations ────────────────────────────────── */

function SetupIllustration() {
    return (
        <div className="relative w-full h-72 md:h-80 flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-100/50 group-hover:border-indigo-200/80 transition-all duration-500">
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'radial-gradient(circle, hsl(241,70%,55%) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />
            {/* Floating glow orbs */}
            <div className="absolute top-8 left-8 w-24 h-24 bg-indigo-400/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-violet-400/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

            {/* Main laptop mockup */}
            <div className="relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="w-56 h-36 bg-white rounded-xl border-2 border-gray-200/80 shadow-xl overflow-hidden">
                    <div className="h-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center px-2.5 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="flex-1 ml-2 h-2.5 bg-gray-100 rounded-full flex items-center px-1.5">
                            <span className="text-[5px] text-gray-400">app.opsflow.io/setup</span>
                        </div>
                    </div>
                    <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[8px] font-bold text-indigo-600">Create Daily Checklist</span>
                            <span className="text-[6px] px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-semibold">New</span>
                        </div>
                        {["Morning hygiene check", "Cold storage temp log", "Inventory count"].map((task, i) => (
                            <div key={i} className="flex items-center gap-2 py-0.5">
                                <div className="w-3.5 h-3.5 rounded-md border-2 border-green-400 bg-green-50 flex items-center justify-center">
                                    <span className="text-[7px] text-green-600 font-bold">✓</span>
                                </div>
                                <span className="text-[7px] text-gray-700 font-medium">{task}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 py-0.5">
                            <div className="w-3.5 h-3.5 rounded-md border-2 border-dashed border-indigo-300 bg-indigo-50/50 flex items-center justify-center">
                                <span className="text-[8px] text-indigo-400 font-bold">+</span>
                            </div>
                            <span className="text-[7px] text-indigo-400 italic">Add new task...</span>
                        </div>
                    </div>
                </div>
                <div className="w-64 h-2.5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-xl mx-auto -mt-0.5 shadow-sm" />
            </div>

            {/* Floating badge - outlets */}
            <div className="absolute top-5 right-5 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-indigo-100/50" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-foreground block">4 Outlets</span>
                        <span className="text-[7px] text-muted-foreground">Connected</span>
                    </div>
                </div>
            </div>

            {/* Floating badge - tasks */}
            <div className="absolute bottom-6 left-5 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-green-100/50" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-foreground block">12 Tasks</span>
                        <span className="text-[7px] text-muted-foreground">Created</span>
                    </div>
                </div>
            </div>

            {/* Floating badge - roles */}
            <div className="absolute top-16 left-8 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-violet-100/50" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-foreground block">3 Roles</span>
                        <span className="text-[7px] text-muted-foreground">Assigned</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StaffExecutionIllustration() {
    return (
        <div className="relative w-full h-72 md:h-80 flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-green-50 border border-emerald-100/50 group-hover:border-emerald-200/80 transition-all duration-500">
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'radial-gradient(circle, hsl(152,70%,45%) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />
            <div className="absolute top-10 right-10 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-400/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />

            {/* Phone mockup */}
            <div className="relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="w-36 h-60 bg-white rounded-[28px] border-2 border-gray-200/80 shadow-xl overflow-hidden">
                    {/* Status bar */}
                    <div className="h-5 bg-gray-900 flex items-center justify-between px-3">
                        <span className="text-[5px] text-white font-medium">9:41</span>
                        <div className="w-14 h-3 bg-gray-800 rounded-full" />
                        <div className="flex gap-0.5">
                            <div className="w-2 h-2 text-white">
                                <svg viewBox="0 0 10 10"><rect x="0" y="6" width="2" height="4" fill="white" /><rect x="3" y="3" width="2" height="7" fill="white" /><rect x="6" y="0" width="2" height="10" fill="white" /></svg>
                            </div>
                        </div>
                    </div>
                    {/* App header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-2.5">
                        <span className="text-[7px] text-white font-bold block">Today's Tasks</span>
                        <span className="text-[5px] text-white/70">Indiranagar Outlet</span>
                        <div className="flex items-center gap-1 mt-1.5">
                            <div className="flex-1 h-1.5 bg-white/20 rounded-full">
                                <div className="w-[75%] h-full bg-white rounded-full" />
                            </div>
                            <span className="text-[6px] text-white font-bold">75%</span>
                        </div>
                    </div>
                    {/* Task list */}
                    <div className="p-2 space-y-1.5">
                        {[
                            { name: "Hygiene check", done: true },
                            { name: "Temp log", done: true },
                            { name: "Opening checklist", done: true },
                            { name: "Deep clean fryer", done: false },
                            { name: "Inventory count", done: false },
                        ].map((task, i) => (
                            <div key={i} className={`flex items-center gap-1.5 p-1.5 rounded-lg ${task.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${task.done ? 'bg-green-500' : 'border-2 border-gray-300'}`}>
                                    {task.done && <span className="text-[6px] text-white font-bold">✓</span>}
                                </div>
                                <span className={`text-[6px] flex-1 ${task.done ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>{task.name}</span>
                                {task.done && <Camera className="w-2.5 h-2.5 text-green-500" />}
                            </div>
                        ))}
                    </div>
                    {/* Bottom action */}
                    <div className="absolute bottom-3 left-2 right-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl py-1.5 text-center">
                            <span className="text-[7px] text-white font-bold flex items-center justify-center gap-1">
                                <Camera className="w-2.5 h-2.5" /> Capture Photo Proof
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo proof floating card */}
            <div className="absolute top-5 left-5 bg-white rounded-2xl shadow-lg p-2.5 animate-float border border-green-100/50" style={{ animationDelay: '0.5s' }}>
                <div className="w-20 h-14 bg-gradient-to-br from-green-100 to-emerald-50 rounded-xl flex flex-col items-center justify-center">
                    <Camera className="w-5 h-5 text-green-600 mb-0.5" />
                    <span className="text-[6px] text-green-600 font-bold">Photo Attached</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-[5px] text-white">✓</span>
                    </div>
                    <span className="text-[7px] font-semibold text-green-700">Verified</span>
                </div>
            </div>

            {/* GPS verified badge */}
            <div className="absolute bottom-8 right-5 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-emerald-100/50" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <div>
                        <span className="text-[9px] font-bold text-foreground block">GPS Verified</span>
                        <span className="text-[7px] text-muted-foreground">12.97°N, 77.59°E</span>
                    </div>
                </div>
            </div>

            {/* Time stamp badge */}
            <div className="absolute top-16 right-8 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-blue-100/50" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-foreground block">9:15 AM</span>
                        <span className="text-[7px] text-muted-foreground">Submitted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrackingIllustration() {
    return (
        <div className="relative w-full h-72 md:h-80 flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 via-white to-indigo-50 border border-violet-100/50 group-hover:border-violet-200/80 transition-all duration-500">
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'radial-gradient(circle, hsl(262,70%,55%) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />
            <div className="absolute top-10 left-10 w-28 h-28 bg-violet-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-400/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

            {/* Dashboard card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-4 w-56 space-y-3 transform group-hover:scale-[1.02] transition-transform duration-500 border border-violet-100/50">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[8px] font-bold text-foreground block">Fleet Performance</span>
                        <span className="text-[6px] text-muted-foreground">All outlets · Today</span>
                    </div>
                    <div className="px-2 py-0.5 bg-green-100 rounded-full">
                        <span className="text-[8px] font-bold text-green-700">87%</span>
                    </div>
                </div>
                {/* Mini chart */}
                <svg viewBox="0 0 200 50" className="w-full h-10">
                    <defs>
                        <linearGradient id="chart-grad-hiw" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(241, 70%, 55%)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="hsl(241, 70%, 55%)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0 40 L28 32 L56 35 L84 24 L112 20 L140 14 L168 10 L200 6 L200 50 L0 50 Z" fill="url(#chart-grad-hiw)" />
                    <path d="M0 40 L28 32 L56 35 L84 24 L112 20 L140 14 L168 10 L200 6" fill="none" stroke="hsl(241, 70%, 55%)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="200" cy="6" r="3" fill="hsl(241, 70%, 55%)" />
                    <circle cx="200" cy="6" r="5" fill="none" stroke="hsl(241, 70%, 55%)" strokeWidth="1" opacity="0.3" />
                </svg>
                {/* Outlet rows */}
                <div className="space-y-2">
                    {[
                        { name: "Indiranagar", rate: 100, color: "bg-green-500" },
                        { name: "Koramangala", rate: 82, color: "bg-indigo-500" },
                        { name: "Whitefield", rate: 95, color: "bg-green-500" },
                        { name: "HSR Layout", rate: 70, color: "bg-amber-500" },
                    ].map((outlet, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${outlet.color}`} />
                            <span className="text-[7px] text-gray-600 w-14 truncate">{outlet.name}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                                <div className={`h-full ${outlet.color} rounded-full transition-all duration-1000`} style={{ width: `${outlet.rate}%` }} />
                            </div>
                            <span className={`text-[7px] font-bold min-w-[24px] text-right ${outlet.rate >= 90 ? 'text-green-600' : outlet.rate >= 75 ? 'text-indigo-600' : 'text-amber-600'}`}>
                                {outlet.rate}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-5 right-5 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-green-100/50" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-green-700 block">+12%</span>
                        <span className="text-[7px] text-muted-foreground">This week</span>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-6 left-5 bg-white rounded-2xl shadow-lg px-3 py-2 animate-float border border-amber-100/50" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-foreground block">2 Alerts</span>
                        <span className="text-[7px] text-muted-foreground">Need action</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Data ────────────────────────────────────────────────────────── */

const steps = [
    {
        number: "01",
        icon: Settings,
        title: "Set Up in Minutes",
        subtitle: "Configuration",
        description: "Create task checklists, assign roles, and configure outlets. Your team gets instant access via the app — no training needed.",
        illustration: SetupIllustration,
        features: ["Custom checklists", "Role-based access", "Multi-outlet support"],
        accentColor: "from-indigo-500 to-violet-500",
        bgAccent: "bg-indigo-500",
    },
    {
        number: "02",
        icon: Smartphone,
        title: "Staff Executes Daily",
        subtitle: "Execution",
        description: "Staff opens the app, sees assigned tasks, completes them with photo proof, and submits in real-time. No WhatsApp, no calls.",
        illustration: StaffExecutionIllustration,
        features: ["Photo proof capture", "GPS timestamps", "Real-time updates"],
        accentColor: "from-emerald-500 to-green-500",
        bgAccent: "bg-emerald-500",
    },
    {
        number: "03",
        icon: BarChart3,
        title: "You Track Everything",
        subtitle: "Visibility",
        description: "See completion rates, outlet rankings, and staff leaderboards. Know exactly who's performing and who needs help — all in one place.",
        illustration: TrackingIllustration,
        features: ["Performance analytics", "Outlet rankings", "Exception alerts"],
        accentColor: "from-violet-500 to-purple-500",
        bgAccent: "bg-violet-500",
    },
];

/* ── Component ───────────────────────────────────────────────────── */

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-24 md:py-32 section-gradient relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-[5%] w-72 h-72 bg-primary/4 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 right-[5%] w-64 h-64 bg-accent/4 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />

            <div className="container mx-auto px-4 relative">
                {/* Section header */}
                <div className="max-w-2xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-5">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-medium text-primary">How It Works</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-5">
                        Three steps to{" "}
                        <span className="text-gradient">calm operations</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        From chaos to clarity. Get your entire team aligned and accountable in under 10 minutes.
                    </p>
                </div>

                {/* Steps */}
                <div className="max-w-6xl mx-auto">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            {/* Connector line between steps */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full w-px h-16 z-10">
                                    <div className="w-px h-full bg-gradient-to-b from-primary/20 to-transparent mx-auto" />
                                    <div className="w-2 h-2 rounded-full bg-primary/20 mx-auto -mt-0.5" />
                                </div>
                            )}

                            <div
                                className={`group flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center ${i < steps.length - 1 ? 'mb-20 md:mb-24' : ''}`}
                            >
                                {/* Illustration */}
                                <div className="flex-1 w-full">
                                    <step.illustration />
                                </div>

                                {/* Content */}
                                <div className="flex-1 w-full max-w-lg">
                                    {/* Step number + badge */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accentColor} flex items-center justify-center shadow-lg shadow-primary/15 group-hover:shadow-primary/25 transition-shadow duration-500`}>
                                            <step.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-primary font-bold uppercase tracking-[0.2em]">Step {step.number} <span className="text-muted-foreground/50 font-normal">/ {step.subtitle}</span></p>
                                            <h3 className="font-display font-bold text-2xl md:text-[28px] text-foreground leading-tight">{step.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed mb-6 text-[15px] md:text-base">
                                        {step.description}
                                    </p>

                                    {/* Feature pills */}
                                    <div className="flex flex-wrap gap-2.5">
                                        {step.features.map((feature, j) => (
                                            <div key={j} className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Explore CTA for last step */}
                                    {i === steps.length - 1 && (
                                        <a href="#industries" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                                            Try the Live Demo <ArrowRight className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
