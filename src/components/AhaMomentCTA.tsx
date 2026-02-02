import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Users, Building2, Clock } from "lucide-react";

interface AhaMomentCTAProps {
  onRequestAccess: () => void;
}

export function AhaMomentCTA({ onRequestAccess }: AhaMomentCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Early Preview</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            This is how OpsFlow would work for your business
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            No more chasing updates on WhatsApp. No more spreadsheet chaos. Just clear visibility into what's happening across your outlets, every day.
          </p>

          {/* Value props */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="p-4 bg-card rounded-xl border border-border">
              <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Clear task ownership</p>
              <p className="text-xs text-muted-foreground mt-1">Every task has an owner</p>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">All outlets in one view</p>
              <p className="text-xs text-muted-foreground mt-1">See everything at a glance</p>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Save 2+ hours daily</p>
              <p className="text-xs text-muted-foreground mt-1">No more follow-up calls</p>
            </div>
          </div>

          <Button variant="hero" size="xl" onClick={onRequestAccess} data-early-access-trigger>
            I Want This for My Business
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            We're validating demand before building fully. Join the waitlist to get early access + founding rates.
          </p>
        </div>

        {/* Social proof section */}
        <div className="max-w-2xl mx-auto mt-16 p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center"
                >
                  <Users className="w-3 h-3 text-primary" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Join 50+ business owners</p>
              <p className="text-xs text-muted-foreground">Already on the early access waitlist</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Finally, something simpler than WhatsApp groups for tracking daily ops. Can't wait for this to launch."
            <span className="text-foreground font-medium"> — Restaurant owner, Bangalore</span>
          </p>
        </div>
      </div>
    </section>
  );
}
