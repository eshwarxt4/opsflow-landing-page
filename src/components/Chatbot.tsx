import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  showCTA?: boolean;
}

const quickQuestions = [
  "What does OpsFlow do?",
  "Is this for my business?",
  "How is this different from WhatsApp?",
  "When will this be available?",
];

// Enhanced bot responses with better keyword matching
const botResponses: Record<string, { text: string; showCTA?: boolean }> = {
  // Core questions
  "what does opsflow do": {
    text: "OpsFlow gives you a single dashboard to track daily tasks across all your outlets. Instead of chasing updates on WhatsApp or calling managers, you can see what's done and what's pending — with photo proofs when needed. Think of it as a calm operating system for your multi-outlet business.",
    showCTA: true,
  },
  "is this for my business": {
    text: "If you run multiple outlets (restaurants, salons, retail stores, clinics, etc.) and struggle with tracking daily operations, OpsFlow is designed for you. It works for any business where you need visibility into what's happening at each location — typically 3 to 30+ outlets.",
    showCTA: true,
  },
  "is this live yet": {
    text: "Not yet — this is a working preview. We're validating demand before building the full product. What you see here is how OpsFlow would actually work. If you request early access, you'll be among the first to know when we launch, with special founding rates.",
    showCTA: true,
  },
  "when will this be available": {
    text: "We're in early development, validating demand first. Early access users will be the first to try OpsFlow when it's ready — likely in the coming months. The more interest we see, the faster we'll build!",
    showCTA: true,
  },
  "how much will it cost": {
    text: "We haven't finalized pricing yet, but it will be affordable for SMB owners like you — not enterprise pricing. Early access users will get special founding rates locked in. Right now, we're focused on making sure OpsFlow solves real problems.",
    showCTA: true,
  },
  
  // WhatsApp comparisons
  "whatsapp": {
    text: "Great question! WhatsApp is amazing for chatting, but terrible for tracking tasks. Messages get buried, there's no single view, and you end up calling people just to check status. OpsFlow gives you a calm dashboard where you can see all outlets at once — who did what, with proof.",
    showCTA: true,
  },
  "different from whatsapp": {
    text: "WhatsApp = chaos. OpsFlow = calm.\n\nWith WhatsApp, tasks get buried in messages, you have no single view, and you spend hours following up. With OpsFlow, every task has an owner, you see status instantly, and proof is attached automatically. No more chasing people.",
    showCTA: true,
  },
  
  // ERP comparisons
  "erp": {
    text: "ERPs are complex, expensive, and designed for large enterprises. OpsFlow is the opposite — built specifically for SMBs who want simple, practical operations tracking. If your staff can use WhatsApp, they can use OpsFlow. No training needed.",
    showCTA: false,
  },
  
  // Staff concerns
  "staff": {
    text: "Your staff will love OpsFlow because it's simpler than WhatsApp for task completion. They just open the app, see their tasks, tap to complete, and attach a photo if needed. No group chat noise, no confusion about what's done.",
    showCTA: false,
  },
  "training": {
    text: "Very little training needed! If your staff can use WhatsApp, they can use OpsFlow. The mobile app is designed to be intuitive — tap a task, mark it done, attach a photo if needed. Most staff figure it out in 5 minutes.",
    showCTA: false,
  },
  
  // Real/honest questions
  "is this real": {
    text: "Honest answer: This is a working preview, not a live product yet. We're showing you exactly how OpsFlow would work to validate if it solves real problems for business owners like you. If enough people want this, we'll build it. The interest you show directly influences our roadmap.",
    showCTA: true,
  },
  "fake": {
    text: "This is a preview simulation with sample data to show you how OpsFlow would work. We believe in showing, not just telling. If this solves a real problem for you, let us know — your interest helps us decide what to build.",
    showCTA: true,
  },
  
  // Business types
  "restaurant": {
    text: "Restaurants are one of our core focus areas! OpsFlow handles kitchen hygiene checklists, cold storage temperature logs, inventory counts, opening/closing procedures, and more. Try the restaurant simulation to see sample tasks specific to your business.",
    showCTA: false,
  },
  "salon": {
    text: "Salons and spas have unique needs — station sanitization, equipment sterilization, appointment prep, product inventory. OpsFlow handles all of this with simple checklists your team can complete on their phones.",
    showCTA: false,
  },
  "retail": {
    text: "Retail stores benefit hugely from OpsFlow — morning stock counts, display arrangements, cash reconciliation, end-of-day procedures. See everything across all your stores in one calm dashboard.",
    showCTA: false,
  },
  
  // Scaling
  "scale": {
    text: "OpsFlow is designed to grow with you. What works for 3 outlets works exactly the same for 30. The interface stays calm and clear, whether you're tracking 20 tasks or 200. No complexity creep.",
    showCTA: true,
  },
  "outlets": {
    text: "OpsFlow works best for businesses with 3-30+ outlets. Whether you have 5 restaurants, 8 salons, or 15 retail stores, you get the same calm dashboard showing what's happening everywhere.",
    showCTA: false,
  },
  
  // Default
  "default": {
    text: "That's a great question! OpsFlow is a calm operating system for multi-outlet businesses. Instead of chasing updates on WhatsApp, you get clear visibility into daily operations across all your outlets. Would you like to try our simulation to see how it works?",
    showCTA: true,
  },
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hi! 👋 I'm here to help you understand if OpsFlow is right for your business. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findBestResponse = (text: string): { text: string; showCTA?: boolean } => {
    const lowerText = text.toLowerCase();
    
    // Priority keyword matching
    const keywordMap: { keywords: string[]; key: string }[] = [
      { keywords: ["different from whatsapp", "vs whatsapp", "compare whatsapp"], key: "different from whatsapp" },
      { keywords: ["whatsapp"], key: "whatsapp" },
      { keywords: ["is this real", "actually real", "really work"], key: "is this real" },
      { keywords: ["fake", "not real", "scam"], key: "fake" },
      { keywords: ["erp", "enterprise"], key: "erp" },
      { keywords: ["training", "learn", "teach"], key: "training" },
      { keywords: ["staff", "employee", "team", "worker"], key: "staff" },
      { keywords: ["cost", "price", "pricing", "pay", "expensive", "cheap"], key: "how much will it cost" },
      { keywords: ["live", "launch", "available", "when", "ready"], key: "when will this be available" },
      { keywords: ["what does", "what is", "explain", "tell me about"], key: "what does opsflow do" },
      { keywords: ["my business", "for me", "for us", "work for"], key: "is this for my business" },
      { keywords: ["restaurant", "food", "kitchen", "qsr"], key: "restaurant" },
      { keywords: ["salon", "spa", "beauty", "parlour"], key: "salon" },
      { keywords: ["retail", "store", "shop"], key: "retail" },
      { keywords: ["scale", "grow", "bigger", "expand"], key: "scale" },
      { keywords: ["outlet", "location", "branch"], key: "outlets" },
    ];
    
    for (const { keywords, key } of keywordMap) {
      if (keywords.some(kw => lowerText.includes(kw))) {
        return botResponses[key] || botResponses.default;
      }
    }
    
    return botResponses.default;
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowQuickQuestions(false);

    // Simulate bot response
    setTimeout(() => {
      const response = findBestResponse(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response.text,
        showCTA: response.showCTA,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleRequestAccess = () => {
    // Find and click the early access button in the page
    const earlyAccessButton = document.querySelector('[data-early-access-trigger]') as HTMLButtonElement;
    if (earlyAccessButton) {
      earlyAccessButton.click();
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-105 ${
          isOpen ? "hidden" : ""
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-100px)] bg-card rounded-xl border border-border shadow-elevated flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-primary rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">OpsFlow Assistant</p>
                <p className="text-xs text-primary-foreground/70">Ask me anything about OpsFlow</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm whitespace-pre-line ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
                {/* CTA after certain bot messages */}
                {message.role === "bot" && message.showCTA && (
                  <div className="ml-9 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={handleRequestAccess}
                    >
                      Request Early Access
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {showQuickQuestions && (
            <div className="px-4 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Common questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-2.5 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about OpsFlow..."
                className="flex-1 p-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
