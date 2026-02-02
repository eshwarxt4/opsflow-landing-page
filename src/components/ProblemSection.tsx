import { MessageCircle, Users, Eye, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const problems = [
  {
    icon: MessageCircle,
    title: "Tasks buried in WhatsApp",
    description: "Important updates get lost in endless group messages. Finding what's done vs what's pending takes forever.",
    stat: "47+ messages/day",
  },
  {
    icon: Users,
    title: "Constant follow-ups",
    description: "Owners spend hours calling outlet managers just to check if basic tasks are complete.",
    stat: "2+ hours wasted",
  },
  {
    icon: Eye,
    title: "No single view",
    description: "Spreadsheets, notes, and messages everywhere. No way to see all outlets at once.",
    stat: "5+ apps to check",
  },
  {
    icon: TrendingUp,
    title: "Breaks as you grow",
    description: "What works for 3 outlets completely falls apart at 8. Scaling becomes a nightmare.",
    stat: "Chaos at scale",
  },
];

interface ProblemSectionProps {
  onTryDemo?: () => void;
}

export function ProblemSection({ onTryDemo }: ProblemSectionProps) {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sound familiar?
          </h2>
          <p className="text-lg text-muted-foreground">
            These are the daily struggles of running operations across multiple outlets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <problem.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{problem.title}</h3>
                    <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded-full">
                      {problem.stat}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-medium mb-6">
            OpsFlow gives you <span className="text-primary">one calm dashboard</span> to see everything, everyday.
          </p>
          {onTryDemo && (
            <Button variant="outline" onClick={onTryDemo}>
              See it in action
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
