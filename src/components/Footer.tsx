import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";

interface FooterProps {
  onRequestAccess?: () => void;
}

export function Footer({ onRequestAccess }: FooterProps) {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Secondary CTA */}
        {onRequestAccess && (
          <div className="max-w-xl mx-auto text-center mb-12 p-6 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">
              Ready to bring calm to your operations?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join the OpsFlow early access waitlist and be among the first to try it.
            </p>
            <Button onClick={onRequestAccess}>
              Request Early Access
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Transparency notice */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Transparency Notice
              </p>
              <p className="text-sm text-muted-foreground">
                This is a fake-door experiment to validate demand. OpsFlow is in early development. 
                What you see here is how the product would work. Your interest helps us decide what to build. 
                Thank you for being part of this journey.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-foreground">OpsFlow</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Early Preview
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            A calm operating system for multi-outlet businesses
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpsFlow
          </p>
        </div>
      </div>
    </footer>
  );
}
