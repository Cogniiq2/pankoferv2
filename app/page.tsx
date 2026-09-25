import { ProposalHeader } from "@/components/sections/ProposalHeader";
import { Hero } from "@/components/sections/Hero";
import { PersonalNote } from "@/components/sections/PersonalNote";
import { OperationalSnapshot } from "@/components/sections/OperationalSnapshot";
import { WhyThisModule } from "@/components/sections/WhyThisModule";
import { ModuleArchitecture } from "@/components/sections/ModuleArchitecture";
import { ProcessComparison } from "@/components/sections/ProcessComparison";
import { ValueSection } from "@/components/sections/ValueSection";
import { ProofThenExpand } from "@/components/sections/ProofThenExpand";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { PaymentPlanner } from "@/components/sections/PaymentPlanner";
import { PersonalReason } from "@/components/sections/PersonalReason";
import { WorkingPrinciples } from "@/components/sections/WorkingPrinciples";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function ProposalPage() {
  return (
    <>
      <ProposalHeader />
      <main id="inhalt">
        <Hero />
        <PersonalNote />
        <OperationalSnapshot />
        <WhyThisModule />
        <ModuleArchitecture />
        <ProcessComparison />
        <ValueSection />
        <ProofThenExpand />
        <InvestmentSection />
        <PaymentPlanner />
        <PersonalReason />
        <WorkingPrinciples />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
