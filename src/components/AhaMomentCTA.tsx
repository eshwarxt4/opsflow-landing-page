import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface AhaMomentCTAProps {
  onRequestAccess: () => void;
}

export function AhaMomentCTA({ onRequestAccess }: AhaMomentCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Early Preview</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            This is how OpsFlow would work for your business
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            No more chasing updates. No more spreadsheet chaos. Just clear visibility into what's happening across your outlets, every day.
          </p>

          <Button variant="hero" size="xl" onClick={onRequestAccess}>
            I Want This for My Business
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            We're validating demand before building fully. Join the waitlist to get early access.
          </p>
        </div>
      </div>
    </section>
  );
}
