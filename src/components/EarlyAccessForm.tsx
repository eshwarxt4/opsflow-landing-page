import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, Building2, Users, Mail, Phone, MessageSquare } from "lucide-react";

interface EarlyAccessFormProps {
  onClose: () => void;
}

const businessTypes = [
  "Restaurant / QSR",
  "Salon / Spa",
  "Retail Store",
  "Clinic / Diagnostics",
  "Hotel / Hostel",
  "Facility Management",
  "Coaching Center",
  "Warehouse / Logistics",
  "Other",
];

const outletRanges = [
  "1-3 outlets",
  "4-10 outlets",
  "11-30 outlets",
  "30+ outlets",
];

const roles = [
  "Owner / Founder",
  "Operations Manager",
  "Store Manager",
  "Other",
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
    // Simulate submission (no actual backend)
    console.log("Early access form submitted:", formData);
    setSubmitted(true);
  };

  const isStep1Valid = formData.businessType && formData.outlets && formData.role;
  const isStep2Valid = formData.contact.length > 5;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-card rounded-xl border border-border w-full max-w-md shadow-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-status-done/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-status-done" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You're on the list!</h3>
            <p className="text-muted-foreground mb-6">
              We'll reach out soon with early access details. Thank you for your interest in OpsFlow.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              This is an early preview — we're validating demand before building fully.
            </p>
            <Button variant="default" onClick={onClose} className="w-full">
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-card rounded-xl border border-border w-full max-w-md shadow-elevated max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <div>
            <h3 className="font-semibold text-foreground">Request Early Access</h3>
            <p className="text-xs text-muted-foreground">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {step === 1 ? (
            <>
              {/* Business Type */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  Business Type
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, businessType: type })}
                      className={`p-2 text-sm rounded-lg border transition-all text-left ${
                        formData.businessType === type
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/50 text-muted-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outlets */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  Number of Outlets
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {outletRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setFormData({ ...formData, outlets: range })}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        formData.outlets === range
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/50 text-muted-foreground"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Your Role</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setFormData({ ...formData, role: role })}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        formData.role === role
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/50 text-muted-foreground"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Contact */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email or Phone
                </label>
                <input
                  type="text"
                  placeholder="your@email.com or +91 98765 43210"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full mt-2 p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Problem (Optional) */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  Biggest daily ops problem (optional)
                </label>
                <textarea
                  placeholder="e.g., I spend 2 hours daily just checking if outlets completed their tasks..."
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  rows={3}
                  className="w-full mt-2 p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  This is an early preview. We're validating demand before building fully. Your details help us understand if OpsFlow solves real problems.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-border flex gap-3 sticky bottom-0 bg-card">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button 
              variant="default" 
              onClick={() => setStep(2)} 
              disabled={!isStep1Valid}
              className="flex-1"
            >
              Continue
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={handleSubmit} 
              disabled={!isStep2Valid}
              className="flex-1"
            >
              Request Early Access
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
