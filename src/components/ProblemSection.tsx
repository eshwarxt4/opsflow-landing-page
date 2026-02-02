import { MessageCircle, Users, Eye, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: MessageCircle,
    title: "Tasks buried in WhatsApp",
    description: "Important updates get lost in endless group messages. Finding what's done vs what's pending takes forever.",
  },
  {
    icon: Users,
    title: "Constant follow-ups",
    description: "Owners spend hours calling outlet managers just to check if basic tasks are complete.",
  },
  {
    icon: Eye,
    title: "No single view",
    description: "Spreadsheets, notes, and messages everywhere. No way to see all outlets at once.",
  },
  {
    icon: TrendingUp,
    title: "Breaks as you grow",
    description: "What works for 3 outlets completely falls apart at 8. Scaling becomes a nightmare.",
  },
];

export function ProblemSection() {
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
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-medium">
            OpsFlow gives you <span className="text-primary">one calm dashboard</span> to see everything, everyday.
          </p>
        </div>
      </div>
    </section>
  );
}
