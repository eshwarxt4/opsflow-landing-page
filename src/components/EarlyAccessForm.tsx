import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, Building2, Users, Mail, Phone, MessageSquare, ArrowRight, Sparkles, Zap } from "lucide-react";

interface EarlyAccessFormProps {
  onClose: () => void;
}

const businessTypes = [
  { label: "Restaurant / QSR", icon: "🍽️" },
  { label: "Salon / Spa", icon: "✂️" },
  { label: "Retail Store", icon: "🛍️" },
  { label: "Clinic / Diagnostics", icon: "🏥" },
  { label: "Hotel / Hostel", icon: "🏨" },
  { label: "Facility Management", icon: "🏢" },
  { label: "Coaching Center", icon: "🎓" },
  { label: "Warehouse / Logistics", icon: "📦" },
  { label: "Other", icon: "⚙️" },
];

const outletRanges = [
  { label: "1-3 outlets", desc: "Starting up" },
  { label: "4-10 outlets", desc: "Growing" },
  { label: "11-30 outlets", desc: "Scaling" },
  { label: "30+ outlets", desc: "Enterprise" },
];

const roles = [
  { label: "Owner / Founder", icon: "👤" },
  { label: "Operations Manager", icon: "👥" },
  { label: "Store Manager", icon: "🏪" },
  { label: "Other", icon: "💼" },
];

export function EarlyAccessForm({ onClose }: EarlyAccessFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessType: "",
    outlets: "",
    role: "",
    contact: "",
    problem: "",
  });

  const handleSubmit = () => {
    console.log("Early access form submitted:", formData);
    setSubmitted(true);
  };

  const isStep1Valid = formData.businessType && formData.outlets && formData.role;
  const isStep2Valid = formData.contact.length > 5;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-3xl border border-border w-full max-w-md shadow-elevated animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-10 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-status-done to-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">You're on the list! 🎉</h3>
            <p className="text-muted-foreground mb-2">
              We'll reach out soon with early access details.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Thank you for your interest in OpsFlow.
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary to-accent text-white border-0 h-12 font-semibold text-base"
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl border border-border/50 w-full max-w-lg shadow-elevated max-h-[90vh] overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient accent */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-t-3xl" />
          <div className="p-5 pt-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">Request Early Access</h3>
              </div>
              <p className="text-xs text-muted-foreground ml-9">Step {step} of 2 · Takes 30 seconds</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mx-5 mb-1">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="p-5 pt-4 space-y-6 overflow-auto flex-1 custom-scrollbar">
          {step === 1 ? (
            <>
              {/* Business Type */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  What type of business do you run?
                </label>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {businessTypes.map((type) => (
                    <button
                      key={type.label}
                      onClick={() => setFormData({ ...formData, businessType: type.label })}
                      className={`p-3 text-xs rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-1.5 hover:shadow-sm ${formData.businessType === type.label
                          ? "border-primary bg-primary/8 text-foreground shadow-sm ring-1 ring-primary/20"
                          : "border-border/60 hover:border-primary/30 text-muted-foreground bg-muted/20"
                        }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <span className="font-medium leading-tight">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Outlets */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  How many outlets do you manage?
                </label>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {outletRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setFormData({ ...formData, outlets: range.label })}
                      className={`p-3.5 rounded-2xl border-2 transition-all text-left hover:shadow-sm ${formData.outlets === range.label
                          ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20"
                          : "border-border/60 hover:border-primary/30 bg-muted/20"
                        }`}
                    >
                      <p className={`text-sm font-semibold ${formData.outlets === range.label ? "text-foreground" : "text-foreground/80"}`}>
                        {range.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{range.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-primary">👤</span>
                  What's your role?
                </label>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {roles.map((role) => (
                    <button
                      key={role.label}
                      onClick={() => setFormData({ ...formData, role: role.label })}
                      className={`p-3 rounded-2xl border-2 transition-all text-left flex items-center gap-2.5 hover:shadow-sm ${formData.role === role.label
                          ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20"
                          : "border-border/60 hover:border-primary/30 bg-muted/20"
                        }`}
                    >
                      <span className="text-base">{role.icon}</span>
                      <span className={`text-sm font-medium ${formData.role === role.label ? "text-foreground" : "text-muted-foreground"}`}>
                        {role.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Contact */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  How should we reach you?
                </label>
                <input
                  type="text"
                  placeholder="your@email.com or +91 98765 43210"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full mt-3 p-4 rounded-2xl border-2 border-border/60 bg-muted/20 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  autoFocus
                />
              </div>

              {/* Problem */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  What's your biggest daily ops headache? <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  placeholder="e.g., I spend 2 hours daily just checking if outlets completed their tasks..."
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  rows={3}
                  className="w-full mt-3 p-4 rounded-2xl border-2 border-border/60 bg-muted/20 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all text-sm"
                />
              </div>

              {/* Trust message */}
              <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-foreground font-medium mb-1">You're joining 50+ business owners</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      We're building OpsFlow based on real problems. Your input shapes what we build.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 pt-3 border-t border-border/50 bg-muted/20 flex gap-3">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 h-12 rounded-2xl border-2 font-semibold"
            >
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-primary to-accent text-white border-0 font-semibold text-sm disabled:opacity-40 shadow-glow"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStep2Valid}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-primary to-accent text-white border-0 font-semibold text-sm disabled:opacity-40 shadow-glow"
            >
              Request Early Access
              <Sparkles className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
