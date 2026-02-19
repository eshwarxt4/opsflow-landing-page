import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { ModuleSelector, ModuleType } from "@/components/ModuleSelector";
import { SimulationView } from "@/components/simulation/SimulationView";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AhaMomentCTA } from "@/components/AhaMomentCTA";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);

  const handleTryDemo = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenEarlyAccess = () => {
    setShowEarlyAccess(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenEarlyAccess={handleOpenEarlyAccess} />

      <main>
        <HeroSection
          onTryDemo={handleTryDemo}
          onOpenEarlyAccess={handleOpenEarlyAccess}
        />

        <ProblemSection />

        <FeaturesSection />

        <HowItWorksSection />

        <BeforeAfterSection />

        <ModuleSelector onSelectModule={setSelectedModule} />

        <TestimonialsSection />

        <AhaMomentCTA onRequestAccess={handleOpenEarlyAccess} />
      </main>

      <Footer onRequestAccess={handleOpenEarlyAccess} />

      <Chatbot />

      {/* Modals */}
      {showEarlyAccess && (
        <EarlyAccessForm onClose={() => setShowEarlyAccess(false)} />
      )}

      {selectedModule && (
        <SimulationView
          moduleType={selectedModule}
          onClose={() => setSelectedModule(null)}
          onRequestAccess={() => {
            setSelectedModule(null);
            setShowEarlyAccess(true);
          }}
        />
      )}
    </div>
  );
};

export default Index;
