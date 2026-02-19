import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { OpsFlowLogo } from "@/components/OpsFlowLogo";

interface HeaderProps {
  onOpenEarlyAccess: () => void;
}

export function Header({ onOpenEarlyAccess }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#industries", label: "Industries" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#modules", label: "Live Demo" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm"
      : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-glow group-hover:shadow-glow-lg transition-shadow">
            <OpsFlowLogo size={36} />
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight">
            Ops<span className="text-gradient">Flow</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium"
          >
            Try Demo
          </Button>
          <Button
            size="sm"
            onClick={onOpenEarlyAccess}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white border-0 shadow-glow"
          >
            Request Access
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-xl animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="my-2 border-border" />
            <Button
              size="sm"
              onClick={() => {
                onOpenEarlyAccess();
                setMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 w-full mt-1"
            >
              Request Early Access
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
