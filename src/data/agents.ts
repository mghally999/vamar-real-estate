import { media } from "@/lib/media";

export interface Agent {
  slug: string;
  name: string;
  role: string;
  region: string;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  photo: string;
  yearsExperience: number;
  languages: string[];
  closedDeals: number;
  socials: { label: string; href: string }[];
}

export const AGENTS: Agent[] = [
  {
    slug: "abdullah-al-naqbi",
    name: "Abdullah Al Naqbi",
    role: "Founder & Partner",
    region: "UAE",
    specialty: "Heavy Assets & Owner Relations",
    bio: "Abdullah leads owner relationships and the Heavy Assets Division. His view: a 50-million-dirham conversation begins with credibility, not with a portfolio.",
    email: "vamar.uae@gmail.com",
    phone: "+971 54 333 0100",
    photo: media.agentB,
    yearsExperience: 10,
    languages: ["Arabic", "English"],
    closedDeals: 0,
    socials: [],
  },
  {
    slug: "salem-bin-touq",
    name: "Salem bin Touq",
    role: "Founder & Partner",
    region: "UAE",
    specialty: "Investor Relations & Acquisitions",
    bio: "Salem leads the investor side — local and international principals looking for serious, off-market opportunities.",
    email: "vamar.uae@gmail.com",
    phone: "+971 54 333 0100",
    photo: media.agentD,
    yearsExperience: 10,
    languages: ["Arabic", "English"],
    closedDeals: 0,
    socials: [],
  },
];

export function getAgentBySlug(slug: string) {
  return AGENTS.find((a) => a.slug === slug);
}
