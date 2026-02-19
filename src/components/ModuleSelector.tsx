import { ArrowRight, Utensils, Scissors, ShoppingBag, Stethoscope, Hotel, Building, GraduationCap, Package, Settings, CheckCircle2 } from "lucide-react";

export type ModuleType = "restaurant" | "salon" | "retail" | "clinic" | "hotel" | "facility" | "coaching" | "warehouse" | "custom";

interface ModuleSelectorProps {
  onSelectModule: (module: ModuleType) => void;
}

const modules: {
  type: ModuleType;
  label: string;
  icon: React.ElementType;
  description: string;
  gradient: string;
  iconBg: string;
  tasks: string[];
}[] = [
    {
      type: "restaurant",
      label: "Restaurants & QSR",
      icon: Utensils,
      description: "Kitchen hygiene, inventory, opening/closing checklists",
      gradient: "from-orange-500 to-red-500",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      tasks: ["Morning hygiene checklist", "Cold storage temperature log", "Inventory count"],
    },
    {
      type: "salon",
      label: "Salons & Spas",
      icon: Scissors,
      description: "Station setup, equipment checks, appointment prep",
      gradient: "from-pink-500 to-rose-500",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
      tasks: ["Station sanitization", "Equipment sterilization", "Product inventory check"],
    },
    {
      type: "retail",
      label: "Retail Stores",
      icon: ShoppingBag,
      description: "Stock counts, display setup, cash reconciliation",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      tasks: ["Morning stock count", "Display arrangement", "Cash float verification"],
    },
    {
      type: "clinic",
      label: "Clinics & Diagnostics",
      icon: Stethoscope,
      description: "Equipment calibration, patient prep, compliance tracking",
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
      tasks: ["Equipment calibration", "Sample area prep", "Reagent stock check"],
    },
    {
      type: "hotel",
      label: "Hotels & Hostels",
      icon: Hotel,
      description: "Room turnover, amenity checks, front desk procedures",
      gradient: "from-violet-500 to-purple-500",
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
      tasks: ["Room turnover check", "Common area cleaning", "Breakfast service"],
    },
    {
      type: "facility",
      label: "Facility Management",
      icon: Building,
      description: "Maintenance rounds, security checks, HVAC monitoring",
      gradient: "from-slate-500 to-zinc-600",
      iconBg: "bg-gradient-to-br from-slate-500 to-zinc-600",
      tasks: ["Security round", "HVAC system check", "Elevator inspection"],
    },
    {
      type: "coaching",
      label: "Coaching Centers",
      icon: GraduationCap,
      description: "Classroom setup, attendance, study material distribution",
      gradient: "from-amber-500 to-yellow-500",
      iconBg: "bg-gradient-to-br from-amber-500 to-yellow-500",
      tasks: ["Classroom setup", "Attendance system", "Material distribution"],
    },
    {
      type: "warehouse",
      label: "Warehouses & Logistics",
      icon: Package,
      description: "Receiving docks, safety checks, inventory management",
      gradient: "from-indigo-500 to-blue-600",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
      tasks: ["Receiving dock prep", "Forklift safety check", "Inventory scan"],
    },
    {
      type: "custom",
      label: "Custom Setup",
      icon: Settings,
      description: "Configure OpsFlow for any industry or workflow",
      gradient: "from-primary to-accent",
      iconBg: "bg-gradient-to-br from-primary to-accent",
      tasks: ["Custom checklist", "Team assignments", "Compliance tracking"],
    },
  ];

export function ModuleSelector({ onSelectModule }: ModuleSelectorProps) {
  return (
    <section id="modules" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-10 -left-20 w-72 h-72 bg-accent/4 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Interactive Simulations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            See how OpsFlow works for{" "}
            <span className="text-gradient italic">your</span>{" "}
            <span className="text-gradient">business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your industry to explore a live simulation with realistic sample data.<br className="hidden sm:block" />
            Switch between Owner, Manager, and Staff views.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto stagger-children">
          {modules.map((module) => (
            <div
              key={module.type}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-elevated"
              onClick={() => onSelectModule(module.type)}
            >
              {/* Infographic header */}
              <div className={`relative h-28 bg-gradient-to-br ${module.gradient} overflow-hidden flex items-center justify-center`}>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <pattern id={`grid-${module.type}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grid-${module.type})`} />
                  </svg>
                </div>
                {/* Large icon */}
                <div className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <module.icon className="w-7 h-7 text-white" />
                </div>
                {/* Label overlay */}
                <div className="absolute bottom-2 left-3">
                  <h3 className="font-display font-bold text-white text-sm drop-shadow-sm">{module.label}</h3>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full" />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-3">{module.description}</p>
                <div className="space-y-1.5 mb-4">
                  {module.tasks.map((task, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-foreground/60">
                      <CheckCircle2 className="w-3 h-3 text-primary/40 flex-shrink-0" />
                      {task}
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-1.5 text-primary text-xs font-semibold group-hover:gap-2.5 transition-all">
                  Try Live Simulation
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
