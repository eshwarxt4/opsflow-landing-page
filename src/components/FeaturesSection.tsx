import {
    LayoutDashboard,
    CheckSquare,
    Camera,
    Users,
    Activity,
    BarChart3,
    ArrowRight
} from "lucide-react";

const features = [
    {
        icon: LayoutDashboard,
        title: "Multi-Outlet Dashboard",
        description: "See all your outlets in one calm view. Know what's done, what's pending, and what needs attention — at a glance.",
        highlight: true,
    },
    {
        icon: CheckSquare,
        title: "Smart Task Assignments",
        description: "Assign daily checklists, inspections, and procedures to specific staff members with deadlines.",
    },
    {
        icon: Camera,
        title: "Photo Proof Capture",
        description: "Staff submit photo evidence of task completion. No more guessing if work was actually done.",
    },
    {
        icon: Users,
        title: "Role-Based Access",
        description: "Owners see everything. Managers see their outlet. Staff see their tasks. Everyone gets the right view.",
    },
    {
        icon: Activity,
        title: "Real-Time Tracking",
        description: "Watch tasks get completed in real-time. Get instant visibility without making a single phone call.",
    },
    {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Weekly trends, outlet rankings, and staff leaderboards. Know who's performing and who needs help.",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 relative section-cool overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-40" />
            <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-[80px] animate-float" />
            <div className="absolute bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '3s' }} />

            <div className="container mx-auto px-4 relative">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
                        <span className="text-sm font-medium text-primary">Core Features</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                        Everything you need to run{" "}
                        <span className="text-gradient">calm operations</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        From task assignment to proof verification — all in one simple platform your team will actually use.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto stagger-children">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={`group p-6 rounded-2xl border transition-all duration-300 cursor-default ${feature.highlight
                                ? "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-glow"
                                : "bg-card border-border hover:border-primary/20 hover:shadow-md"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${feature.highlight
                                ? "bg-gradient-to-br from-primary to-accent text-white"
                                : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                }`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            {feature.highlight && (
                                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                                    <span>Explore in demo</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
