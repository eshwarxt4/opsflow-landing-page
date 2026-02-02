import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onOpenEarlyAccess: () => void;
}

export function Header({ onOpenEarlyAccess }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">O</span>
          </div>
          <span className="font-semibold text-lg text-foreground">OpsFlow</span>
          <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full ml-2">
            Early Preview
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            For Your Business
          </a>
          <Button variant="default" size="sm" onClick={onOpenEarlyAccess}>
            Request Early Access
          </Button>
        </nav>

        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#how-it-works" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#modules" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Your Business
            </a>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => {
                onOpenEarlyAccess();
                setMobileMenuOpen(false);
              }}
            >
              Request Early Access
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
