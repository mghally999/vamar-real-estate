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
    role: "Senior Property Advisor",
    region: "Dubai",
    specialty: "Residential Sales",
    bio: "Abdullah specialises in residential sales across Dubai — from Downtown and Business Bay apartments to Arabian Ranches family villas. Clients come to him for straight answers on price, timing, and which communities genuinely fit how they live.",
    email: "abdullah@vamar.ae",
    phone: "+971 4 123 4567",
    photo: media.agentB,
    yearsExperience: 10,
    languages: ["Arabic", "English"],
    closedDeals: 180,
    socials: [],
  },
  {
    slug: "salem-bin-touq",
    name: "Salem bin Touq",
    role: "Investment & Leasing Advisor",
    region: "Dubai & Abu Dhabi",
    specialty: "Investment & Leasing",
    bio: "Salem leads investment and leasing — off-plan opportunities, rental yields, and landlord representation across Dubai and Abu Dhabi. He qualifies the numbers before the emotion, so every deal makes sense on paper as well as in person.",
    email: "salem@vamar.ae",
    phone: "+971 4 123 4567",
    photo: media.agentD,
    yearsExperience: 12,
    languages: ["Arabic", "English"],
    closedDeals: 240,
    socials: [],
  },
];

export function getAgentBySlug(slug: string) {
  return AGENTS.find((a) => a.slug === slug);
}
