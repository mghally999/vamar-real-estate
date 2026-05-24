import { Hero } from "@/components/sections/Hero";
import { LifeChanging } from "@/components/sections/LifeChanging";
import { ChevronStrip } from "@/components/sections/ChevronStrip";
import { RewiredSteps } from "@/components/sections/RewiredSteps";
import { AgentsPitch } from "@/components/sections/AgentsPitch";
import { Testimonials } from "@/components/sections/Testimonials";
import { TalkToHuman } from "@/components/sections/TalkToHuman";
import { ServiceWords } from "@/components/sections/ServiceWords";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WhyAccordion } from "@/components/sections/WhyAccordion";
import { Blog } from "@/components/sections/Blog";
import { BigVamarSignoff } from "@/components/sections/BigVamarSignoff";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeChanging />
      <ChevronStrip />
      <RewiredSteps />
      <AgentsPitch />
      <Testimonials />
      <TalkToHuman />
      <ServiceWords />
      <ServiceCards />
      <WhyAccordion />
      <Blog />
      <BigVamarSignoff />
    </>
  );
}
