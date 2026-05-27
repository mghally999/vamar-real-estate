import { getDictionary } from "@/lib/getDictionary";
import { isLocale } from "@/lib/i18n-config";
import { notFound } from "next/navigation";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict.hero} locale={locale} />
      <LifeChanging dict={dict.lifeChanging} locale={locale} />
      <ChevronStrip dict={dict.chevronStrip} />
      <HeavyAssets dict={dict.heavyAssets} />
      <RewiredSteps dict={dict.rewiredSteps} />
      <Founders dict={dict.founders} locale={locale} />
      <Testimonials dict={dict.testimonials} founders={dict.founders.members} />
      <AgentsPitch dict={dict.ownersPitch} locale={locale} />
      <TalkToHuman dict={dict.talkToHuman} locale={locale} />
      <WhyAccordion dict={dict.whyAccordion} />
      <Privacy dict={dict.privacy} />
      <Contact dict={dict.contact} />
      <BigVamarSignoff dict={dict.signoff} locale={locale} />
    </>
  );
}
