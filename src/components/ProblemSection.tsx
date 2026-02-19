import { AlertTriangle, Clock, MessageSquare, TrendingDown, ArrowDown, Phone, BellRing, X } from "lucide-react";

/* ── Inline SVG infographic illustrations ────────────────────────── */

function WhatsAppChaosIllustration() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-orange-50">
      {/* Phone outline */}
      <div className="relative w-20 h-32 bg-white rounded-2xl border-2 border-gray-200 shadow-lg flex flex-col overflow-hidden">
        {/* Status bar */}
        <div className="h-3 bg-green-500 flex items-center justify-center">
          <span className="text-[4px] text-white font-bold">Group Chat</span>
        </div>
        {/* Messages */}
        <div className="flex-1 p-1.5 space-y-1">
          <div className="bg-green-100 rounded-md px-1 py-0.5 text-[4px] text-gray-700 w-3/4">done sir 👍</div>
          <div className="bg-green-100 rounded-md px-1 py-0.5 text-[4px] text-gray-700 w-2/3 ml-auto">which outlet?</div>
          <div className="bg-green-100 rounded-md px-1 py-0.5 text-[4px] text-gray-700 w-3/4">sending photo...</div>
          <div className="bg-green-100 rounded-md px-1 py-0.5 text-[4px] text-gray-700 w-1/2 ml-auto">not my shift</div>
          <div className="bg-green-100 rounded-md px-1 py-0.5 text-[4px] text-gray-700 w-3/4">hello??</div>
          <div className="bg-green-100 rounded-md px-1 py-0.5 text-[4px] text-gray-700 w-2/3">ok sir</div>
        </div>
      </div>
      {/* Notification badges */}
      <div className="absolute top-3 right-6 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
        47+
      </div>
      <div className="absolute top-12 right-14 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[7px] font-bold shadow-md animate-bounce" style={{ animationDelay: '1s' }}>
        12
      </div>
      {/* Floating notification icons */}
      <div className="absolute top-6 left-5 animate-float">
        <BellRing className="w-5 h-5 text-red-400" />
      </div>
      <div className="absolute bottom-6 right-8 animate-float" style={{ animationDelay: '2s' }}>
        <Phone className="w-4 h-4 text-orange-400" />
      </div>
    </div>
  );
}

function TimeWastedIllustration() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Clock */}
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Clock face */}
          <circle cx="50" cy="50" r="45" fill="white" stroke="#e2e8f0" strokeWidth="3" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round" className="animate-spin" style={{ animationDuration: '8s', transformOrigin: 'center' }} />
          {/* Hour markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line key={i} x1="50" y1="10" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" transform={`rotate(${angle} 50 50)`} />
          ))}
          {/* Hands */}
          <line x1="50" y1="50" x2="50" y2="22" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="68" y2="38" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="#1e293b" />
          {/* 3h text */}
          <text x="50" y="72" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">3 hrs</text>
          <text x="50" y="82" textAnchor="middle" fill="#94a3b8" fontSize="6">wasted daily</text>
        </svg>
      </div>
      {/* Call icons floating */}
      <div className="absolute top-4 left-6 flex flex-col gap-1.5 animate-float" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
          <Phone className="w-2.5 h-2.5 text-orange-500" />
          <span className="text-[7px] text-orange-600 font-medium">Outlet 1</span>
        </div>
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
          <Phone className="w-2.5 h-2.5 text-orange-500" />
          <span className="text-[7px] text-orange-600 font-medium">Outlet 2</span>
        </div>
      </div>
      <div className="absolute bottom-4 right-5 flex flex-col gap-1.5 animate-float" style={{ animationDelay: '2s' }}>
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
          <Phone className="w-2.5 h-2.5 text-orange-500" />
          <span className="text-[7px] text-orange-600 font-medium">Outlet 3</span>
        </div>
      </div>
    </div>
  );
}

function RevenueLossIllustration() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-pink-50">
      {/* Bar chart going down */}
      <svg viewBox="0 0 120 80" className="w-32 h-20">
        {/* Grid lines */}
        <line x1="20" y1="10" x2="20" y2="70" stroke="#e2e8f0" strokeWidth="0.5" />
        <line x1="20" y1="70" x2="110" y2="70" stroke="#e2e8f0" strokeWidth="0.5" />
        {/* Bars */}
        <rect x="28" y="20" width="12" height="50" rx="2" fill="#c4b5fd" opacity="0.6" />
        <rect x="46" y="30" width="12" height="40" rx="2" fill="#c4b5fd" opacity="0.6" />
        <rect x="64" y="38" width="12" height="32" rx="2" fill="#f97316" opacity="0.7" />
        <rect x="82" y="48" width="12" height="22" rx="2" fill="#ef4444" opacity="0.8" />
        {/* Trend line */}
        <path d="M34 22 L52 32 L70 40 L88 50" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
        {/* Arrow down */}
        <path d="M95 42 L100 52 L90 52 Z" fill="#ef4444" />
        {/* 30% text */}
        <text x="100" y="62" fill="#ef4444" fontSize="8" fontWeight="bold">-30%</text>
      </svg>
      {/* Floating labels */}
      <div className="absolute top-3 right-4 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="bg-red-100 text-red-600 text-[7px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <TrendingDown className="w-2.5 h-2.5" />
          Revenue leak
        </div>
      </div>
      <div className="absolute bottom-5 left-4 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="bg-orange-100 text-orange-600 text-[7px] font-bold px-2 py-0.5 rounded-full">
          Missed checks
        </div>
      </div>
    </div>
  );
}

function NoAccountabilityIllustration() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50">
      {/* Checklist with X marks */}
      <div className="bg-white rounded-xl shadow-md p-3 w-36 space-y-2">
        <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-500 border-b border-gray-100 pb-1">
          <div className="w-3 h-3 rounded bg-gray-100" />
          Daily Checklist
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded border border-gray-300 flex items-center justify-center bg-yellow-50">
            <span className="text-[6px] text-yellow-600">?</span>
          </div>
          <span className="text-[7px] text-gray-500">Hygiene check</span>
          <span className="text-[6px] text-gray-400 ml-auto">no proof</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded border border-gray-300 flex items-center justify-center bg-red-50">
            <X className="w-2 h-2 text-red-400" />
          </div>
          <span className="text-[7px] text-gray-500 line-through">Inventory</span>
          <span className="text-[6px] text-red-400 ml-auto">skipped</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded border border-gray-300 flex items-center justify-center bg-yellow-50">
            <span className="text-[6px] text-yellow-600">?</span>
          </div>
          <span className="text-[7px] text-gray-500">Temp log</span>
          <span className="text-[6px] text-gray-400 ml-auto">no photo</span>
        </div>
      </div>
      {/* "trust me" speech bubble */}
      <div className="absolute top-3 right-4 bg-yellow-100 text-yellow-700 text-[8px] font-medium px-2 py-1 rounded-lg rounded-br-none shadow-sm animate-float">
        "Done sir 👍"
      </div>
      <div className="absolute bottom-4 left-3 bg-red-100 text-red-600 text-[7px] font-medium px-2 py-1 rounded-lg rounded-bl-none shadow-sm animate-float" style={{ animationDelay: '1.5s' }}>
        Zero proof 🤷
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */

const problems = [
  {
    icon: MessageSquare,
    stat: "47+",
    title: "WhatsApp chaos",
    description: "Important task updates buried under 47+ daily messages in messy group chats.",
    color: "text-red-500",
    bgColor: "bg-red-50",
    illustration: WhatsAppChaosIllustration,
  },
  {
    icon: Clock,
    stat: "3 hrs",
    title: "Wasted daily follow-ups",
    description: "Owners spend 2-3 hours every day calling managers just to check if basic tasks were done.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    illustration: TimeWastedIllustration,
  },
  {
    icon: TrendingDown,
    stat: "30%",
    title: "Revenue leakage",
    description: "Missed hygiene checks, skipped inventory counts, and unverified tasks cost up to 30% in losses.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    illustration: RevenueLossIllustration,
  },
  {
    icon: AlertTriangle,
    stat: "Zero",
    title: "No accountability",
    description: 'Staff says "done" but there\'s no proof. No timestamps, no photos, no trail of compliance.',
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    illustration: NoAccountabilityIllustration,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 section-gradient relative overflow-hidden">
      <div className="absolute top-10 right-[5%] w-72 h-72 bg-red-500/3 rounded-full blur-[100px] animate-float" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-destructive/10 border border-destructive/20 rounded-full mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">The Real Problem</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            The daily chaos of{" "}
            <span className="text-destructive">WhatsApp ops</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Multi-outlet businesses lose time, money, and control every single day because of broken communication.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto stagger-children">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group bg-card rounded-2xl border border-border hover:border-destructive/20 transition-all duration-300 overflow-hidden hover:shadow-lg cursor-default"
            >
              {/* Infographic illustration */}
              <problem.illustration />

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${problem.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <problem.icon className={`w-5 h-5 ${problem.color}`} />
                  </div>
                  <div>
                    <span className={`text-xl font-display font-bold ${problem.color}`}>{problem.stat}</span>
                    <span className="text-xs text-muted-foreground ml-1.5 uppercase tracking-wider font-medium">{problem.title}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition arrow */}
        <div className="flex justify-center mt-12">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs uppercase tracking-widest font-medium">But there's a better way</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
