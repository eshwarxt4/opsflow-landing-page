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
  ArrowRight
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
  available: boolean;
}

const modules: Module[] = [
  {
    id: "restaurant",
    title: "Restaurants & QSR",
    description: "Kitchen hygiene, inventory, opening/closing checklists",
    icon: UtensilsCrossed,
    available: true,
  },
  {
    id: "salon",
    title: "Salons & Personal Care",
    description: "Station setup, equipment checks, appointment prep",
    icon: Scissors,
    available: true,
  },
  {
    id: "retail",
    title: "Retail Stores",
    description: "Stock counts, display setup, cash reconciliation",
    icon: ShoppingBag,
    available: true,
  },
  {
    id: "clinic",
    title: "Clinics & Diagnostics",
    description: "Equipment calibration, patient prep, compliance",
    icon: Stethoscope,
    available: true,
  },
  {
    id: "hotel",
    title: "Hotels & Hostels",
    description: "Room turnover, amenity checks, front desk ops",
    icon: Building2,
    available: true,
  },
  {
    id: "facility",
    title: "Facility Management",
    description: "Maintenance rounds, security checks, cleaning logs",
    icon: HardHat,
    available: true,
  },
  {
    id: "coaching",
    title: "Coaching Centers",
    description: "Class prep, attendance, resource management",
    icon: GraduationCap,
    available: true,
  },
  {
    id: "warehouse",
    title: "Warehouses & Logistics",
    description: "Receiving, dispatch, safety checks, inventory",
    icon: Warehouse,
    available: true,
  },
  {
    id: "custom",
    title: "Custom Setup",
    description: "Configure OpsFlow for your specific business type",
    icon: Settings2,
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
                <p className="text-sm text-muted-foreground mb-4 flex-1">{module.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary"
                >
                  View Live Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
