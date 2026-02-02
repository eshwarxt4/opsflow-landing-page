import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const quickQuestions = [
  "What does OpsFlow do?",
  "Is this for my business?",
  "Is this live yet?",
  "How much will it cost?",
];

const botResponses: Record<string, string> = {
  "what does opsflow do": "OpsFlow gives you a single dashboard to track daily tasks across all your outlets. Instead of chasing updates on WhatsApp or calling managers, you can see what's done and what's pending — with photo proofs when needed.",
  "is this for my business": "If you run multiple outlets (restaurants, salons, retail, clinics, etc.) and struggle with tracking daily operations, OpsFlow is designed for you. It works for any business where you need visibility into what's happening at each location.",
  "is this live yet": "Not yet — this is a working preview. We're validating demand before building the full product. If you request early access, you'll be among the first to know when we launch.",
  "how much will it cost": "We haven't finalized pricing yet. Early access users will get special founding rates. Right now, we're focused on making sure OpsFlow solves real problems before deciding on pricing.",
  "is this like whatsapp or erp": "Neither! WhatsApp is great for chatting but terrible for tracking tasks. ERPs are complex and expensive. OpsFlow is purpose-built for daily operations — simple enough for your staff, clear enough for you as an owner.",
  "do my staff need training": "Very little. If your staff can use WhatsApp, they can use OpsFlow. The mobile app is designed to be intuitive — tap a task, mark it done, attach a photo if needed.",
  "default": "That's a great question! OpsFlow is designed to help multi-outlet businesses track daily operations without the chaos of WhatsApp groups and spreadsheets. Would you like to try our simulation to see how it works?",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hi! I'm here to help you understand how OpsFlow works. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== "default" && lowerText.includes(key.split(" ").slice(0, 3).join(" "))) {
          response = value;
          break;
        }
      }

      // Check for specific keywords
      if (lowerText.includes("whatsapp") || lowerText.includes("erp")) {
        response = botResponses["is this like whatsapp or erp"];
      } else if (lowerText.includes("training") || lowerText.includes("staff")) {
        response = botResponses["do my staff need training"];
      } else if (lowerText.includes("cost") || lowerText.includes("price") || lowerText.includes("pricing")) {
        response = botResponses["how much will it cost"];
      } else if (lowerText.includes("live") || lowerText.includes("launch") || lowerText.includes("available")) {
        response = botResponses["is this live yet"];
      } else if (lowerText.includes("what") && lowerText.includes("do")) {
        response = botResponses["what does opsflow do"];
      } else if (lowerText.includes("my business") || lowerText.includes("for me")) {
        response = botResponses["is this for my business"];
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-105 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-card rounded-xl border border-border shadow-elevated flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-primary rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground text-sm">OpsFlow Assistant</p>
                <p className="text-xs text-primary-foreground/70">Here to help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length < 3 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Common questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
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
                placeholder="Type your question..."
                className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
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
