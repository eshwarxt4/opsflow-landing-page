import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Rajesh Kumar",
        role: "Owner, 6 Restaurant Chain",
        text: "Before OpsFlow, I'd spend 3 hours every morning calling each outlet. Now I just open the dashboard and everything is right there — who did what, with photo proof.",
        rating: 5,
        initials: "RK",
        gradient: "from-orange-500 to-red-500",
        industry: "Restaurants",
    },
    {
        name: "Priya Mehta",
        role: "Operations Head, Glow Studio",
        text: "Our biggest problem was staff saying 'done' without actually doing it. OpsFlow's photo proof feature changed everything. Compliance went from 60% to 94% in 2 weeks.",
        rating: 5,
        initials: "PM",
        gradient: "from-pink-500 to-rose-500",
        industry: "Salon Chain",
    },
    {
        name: "Vikram Singh",
        role: "CEO, SwiftMart Retail",
        text: "Managing 12 retail outlets used to be a nightmare. OpsFlow gave us real-time visibility and accountability. Our store managers are more productive than ever.",
        rating: 5,
        initials: "VS",
        gradient: "from-blue-500 to-cyan-500",
        industry: "Retail Stores",
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-24 relative overflow-hidden section-cool">
            <div className="absolute inset-0 dot-pattern opacity-30" />
            <div className="absolute bottom-10 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-4 relative">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
                        <span className="text-sm font-medium text-primary">What Owners Say</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                        Trusted by{" "}
                        <span className="text-gradient">real business owners</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Hear from operators who transformed their daily workflow with OpsFlow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto stagger-children">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            className="bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Quote className="w-12 h-12 text-primary" />
                            </div>

                            {/* Industry badge */}
                            <div className="inline-flex px-3 py-1 bg-primary/8 rounded-full mb-4">
                                <span className="text-[11px] text-primary font-semibold uppercase tracking-wider">{testimonial.industry}</span>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
