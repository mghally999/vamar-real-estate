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
    slug: "khalifa-al-maktoum",
    name: "Khalifa Al Maktoum",
    role: "Managing Partner",
    region: "Downtown Dubai",
    specialty: "Luxury High-Rise",
    bio: "Twelve years guiding executives, founders and growing families into the homes that match the lives they're building. Believes the best deals start with the most patient questions.",
    email: "khalifa@vamar.ae",
    phone: "+971 50 123 4567",
    photo: media.agentB,
    yearsExperience: 12,
    languages: ["Arabic", "English"],
    closedDeals: 184,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "latifa-al-zahra",
    name: "Latifa Al Zahra",
    role: "Senior Agent",
    region: "Palm Jumeirah",
    specialty: "Waterfront & Villas",
    bio: "Latifa moves with the kind of calm clarity that turns a long search into one good Saturday afternoon. Specialist in waterfront properties and second homes.",
    email: "latifa@vamar.ae",
    phone: "+971 50 234 5678",
    photo: media.agentA,
    yearsExperience: 9,
    languages: ["Arabic", "English", "French"],
    closedDeals: 121,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "ahmed-al-mansoori",
    name: "Ahmed Al Mansoori",
    role: "Investment Specialist",
    region: "Business Bay",
    specialty: "Off-Plan & Yield",
    bio: "Built his book of business by saying 'not yet' more often than 'yes.' Ahmed protects upside on every deal, especially first-time investors.",
    email: "ahmed@vamar.ae",
    phone: "+971 50 345 6789",
    photo: media.agentF,
    yearsExperience: 8,
    languages: ["Arabic", "English"],
    closedDeals: 96,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  {
    slug: "fatima-al-hashimi",
    name: "Fatima Al Hashimi",
    role: "Family Homes Lead",
    region: "Arabian Ranches",
    specialty: "Family & Schools",
    bio: "Fatima knows every neighborhood by the school-run, the pediatrician and the Saturday park. Families come back for the second and third home.",
    email: "fatima@vamar.ae",
    phone: "+971 50 456 7890",
    photo: media.agentC,
    yearsExperience: 10,
    languages: ["Arabic", "English"],
    closedDeals: 142,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "saif-al-marri",
    name: "Saif Al Marri",
    role: "Senior Agent",
    region: "Dubai Marina",
    specialty: "Pied-à-Terres",
    bio: "Marina specialist who knows which sub-buildings have the views that hold value and which only feel like they do.",
    email: "saif@vamar.ae",
    phone: "+971 50 567 8901",
    photo: media.agentD,
    yearsExperience: 7,
    languages: ["Arabic", "English"],
    closedDeals: 88,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  {
    slug: "mariam-al-suwaidi",
    name: "Mariam Al Suwaidi",
    role: "Sellers' Agent",
    region: "Emirates Hills",
    specialty: "Listing Strategy",
    bio: "Mariam's listings sell for an average of 4.3% over comp in the same quarter. Tactical staging, considered pricing, no theatrics.",
    email: "mariam@vamar.ae",
    phone: "+971 50 678 9012",
    photo: media.agentE,
    yearsExperience: 11,
    languages: ["Arabic", "English", "Italian"],
    closedDeals: 167,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "rashid-al-falasi",
    name: "Rashid Al Falasi",
    role: "Commercial Lead",
    region: "DIFC",
    specialty: "Commercial & Mixed-Use",
    bio: "If your next move involves a floor, a building, or a portfolio — Rashid runs point.",
    email: "rashid@vamar.ae",
    phone: "+971 50 789 0123",
    photo: media.agentH,
    yearsExperience: 14,
    languages: ["Arabic", "English"],
    closedDeals: 73,
    socials: [
      { label: "LinkedIn", href: "#" },
    ],
  },
  {
    slug: "sara-al-qubaisi",
    name: "Sara Al Qubaisi",
    role: "Rentals Lead",
    region: "JBR · Marina · Downtown",
    specialty: "Long-Term Rentals",
    bio: "Sara's renters tend to become buyers — usually two years in. She plays a long, generous game.",
    email: "sara@vamar.ae",
    phone: "+971 50 890 1234",
    photo: media.agentG,
    yearsExperience: 6,
    languages: ["Arabic", "English"],
    closedDeals: 211,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

export function getAgentBySlug(slug: string) {
  return AGENTS.find((a) => a.slug === slug);
}
