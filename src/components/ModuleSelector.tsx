import { Button } from "@/components/ui/button";
import { 
  UtensilsCrossed, 
  Scissors, 
  ShoppingBag, 
  Stethoscope, 
  Building2, 
  HardHat, 
  GraduationCap, 
  Warehouse,
  Settings2,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export type ModuleType = 
  | "restaurant"
  | "salon"
  | "retail"
  | "clinic"
  | "hotel"
  | "facility"
  | "coaching"
  | "warehouse"
  | "custom";

interface Module {
  id: ModuleType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  sampleTasks: string[];
  available: boolean;
}

const modules: Module[] = [
  {
    id: "restaurant",
    title: "Restaurants & QSR",
    description: "Kitchen hygiene, inventory, opening/closing checklists",
    icon: UtensilsCrossed,
    sampleTasks: [
      "Morning hygiene checklist",
      "Cold storage temperature log",
      "Inventory count",
      "Opening checklist",
    ],
    available: true,
  },
  {
    id: "salon",
    title: "Salons & Personal Care",
    description: "Station setup, equipment checks, appointment prep",
    icon: Scissors,
    sampleTasks: [
      "Station sanitization",
      "Equipment sterilization",
      "Product inventory check",
      "Appointment list review",
    ],
    available: true,
  },
  {
    id: "retail",
    title: "Retail Stores",
    description: "Stock counts, display setup, cash reconciliation",
    icon: ShoppingBag,
    sampleTasks: [
      "Morning stock count",
      "Display arrangement",
      "Cash float verification",
      "End-of-day reconciliation",
    ],
    available: true,
  },
  {
    id: "clinic",
    title: "Clinics & Diagnostics",
    description: "Equipment calibration, patient prep, compliance",
    icon: Stethoscope,
    sampleTasks: [
      "Equipment calibration",
      "Sample collection area prep",
      "Reagent stock check",
      "Waste disposal log",
    ],
    available: true,
  },
  {
    id: "hotel",
    title: "Hotels & Hostels",
    description: "Room turnover, amenity checks, front desk ops",
    icon: Building2,
    sampleTasks: [
      "Room turnover check",
      "Common area cleaning",
      "Breakfast service check",
      "Amenity restocking",
    ],
    available: true,
  },
  {
    id: "facility",
    title: "Facility Management",
    description: "Maintenance rounds, security checks, cleaning logs",
    icon: HardHat,
    sampleTasks: [
      "Security round - morning",
      "HVAC system check",
      "Fire safety inspection",
      "Cleaning verification",
    ],
    available: true,
  },
  {
    id: "coaching",
    title: "Coaching Centers",
    description: "Class prep, attendance, resource management",
    icon: GraduationCap,
    sampleTasks: [
      "Classroom setup",
      "Attendance system ready",
      "Study material check",
      "Lab equipment prep",
    ],
    available: true,
  },
  {
    id: "warehouse",
    title: "Warehouses & Logistics",
    description: "Receiving, dispatch, safety checks, inventory",
    icon: Warehouse,
    sampleTasks: [
      "Receiving dock prep",
      "Forklift safety check",
      "Inventory verification",
      "Dispatch documentation",
    ],
    available: true,
  },
  {
    id: "custom",
    title: "Custom Setup",
    description: "Configure OpsFlow for your specific business type",
    icon: Settings2,
    sampleTasks: [
      "Opening checklist",
      "Daily inspection",
      "Inventory check",
      "Closing procedures",
    ],
    available: true,
  },
];

interface ModuleSelectorProps {
  onSelectModule: (moduleId: ModuleType) => void;
}

export function ModuleSelector({ onSelectModule }: ModuleSelectorProps) {
  return (
    <section id="modules" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See how OpsFlow works for your business
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your industry to explore a live simulation with realistic sample data.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {modules.map((module) => (
            <div
              key={module.id}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => onSelectModule(module.id)}
            >
              <div className="flex flex-col h-full">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <module.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                
                {/* Sample tasks preview */}
                <div className="space-y-1.5 mb-4 flex-1">
                  {module.sampleTasks.slice(0, 3).map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-primary/50" />
                      <span className="truncate">{task}</span>
                    </div>
                  ))}
                  {module.sampleTasks.length > 3 && (
                    <p className="text-xs text-primary/70 pl-5">
                      +{module.sampleTasks.length - 3} more tasks
                    </p>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary"
                >
                  View Live Simulation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Scaling message */}
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                Works from 3 outlets to 30+
              </h4>
              <p className="text-sm text-muted-foreground">
                What starts as a simple checklist system grows with your business. Same calm interface, whether you're running 3 outlets or 30.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
