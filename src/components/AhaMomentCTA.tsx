import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";

interface AhaMomentCTAProps {
  onRequestAccess: () => void;
}

export function AhaMomentCTA({ onRequestAccess }: AhaMomentCTAProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cta-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">Join Early Access</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-5 leading-tight">
            Ready to bring calm to your operations?
          </h2>

          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            No more chasing updates. No more spreadsheet chaos. Just clear visibility into what's happening across your outlets, every day.
          </p>

          <Button
            size="lg"
            onClick={onRequestAccess}
            className="bg-white text-primary hover:bg-white/90 px-8 h-14 text-base font-bold shadow-elevated"
            data-early-access-trigger
          >
            I Want This for My Business
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="mt-6 text-sm text-white/60">
            Free early access · No credit card · Get founding rates
          </p>
        </div>

        {/* Social proof */}
        <div className="max-w-md mx-auto mt-14 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex -space-x-2">
              {["PS", "RK", "AR", "SM", "DT"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/10 flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="text-[10px] font-bold text-white">{initials}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">50+ business owners</p>
              <p className="text-xs text-white/60">Already on the waitlist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
