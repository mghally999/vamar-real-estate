import { getDictionary } from "@/lib/getDictionary";
import { Hero } from "@/components/sections/Hero";
import { LifeChanging } from "@/components/sections/LifeChanging";
import { ChevronStrip } from "@/components/sections/ChevronStrip";
import { HeavyAssets } from "@/components/sections/HeavyAssets";
import { RewiredSteps } from "@/components/sections/RewiredSteps";
import { Founders } from "@/components/sections/Founders";
import { Testimonials } from "@/components/sections/Testimonials";
import { AgentsPitch } from "@/components/sections/AgentsPitch";
import { TalkToHuman } from "@/components/sections/TalkToHuman";
import { WhyAccordion } from "@/components/sections/WhyAccordion";
import { Privacy } from "@/components/sections/Privacy";
import { Contact } from "@/components/sections/Contact";
import { BigVamarSignoff } from "@/components/sections/BigVamarSignoff";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <>
      <Hero dict={dict.hero} />
      <LifeChanging dict={dict.lifeChanging} />
      <ChevronStrip dict={dict.chevronStrip} />
      <HeavyAssets dict={dict.heavyAssets} />
      <RewiredSteps dict={dict.rewiredSteps} />
      <Founders dict={dict.founders} />
      <Testimonials dict={dict.testimonials} founders={dict.founders.members} />
      <AgentsPitch dict={dict.ownersPitch} />
      <TalkToHuman dict={dict.talkToHuman} />
      <WhyAccordion dict={dict.whyAccordion} />
      <Privacy dict={dict.privacy} />
      <Contact dict={dict.contact} />
      <BigVamarSignoff dict={dict.signoff} />
    </>
  );
}
