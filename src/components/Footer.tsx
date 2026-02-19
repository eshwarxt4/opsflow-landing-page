import { ArrowRight, Twitter, Linkedin, Mail } from "lucide-react";
import { OpsFlowLogo } from "@/components/OpsFlowLogo";

interface FooterProps {
  onRequestAccess?: () => void;
}

export function Footer({ onRequestAccess }: FooterProps) {
  return (
    <footer className="py-16 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <OpsFlowLogo size={36} />
              <span className="font-display font-bold text-xl text-foreground">OpsFlow</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A calm operating system for multi-outlet businesses. Run daily operations without chasing people.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors group">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {["Features", "Industries", "Live Demo", "Pricing", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Contact", "Press Kit"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Get Started</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join the early access waitlist and be among the first to try OpsFlow.
            </p>
            {onRequestAccess && (
              <button
                onClick={onRequestAccess}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-glow"
              >
                Request Access
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpsFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
