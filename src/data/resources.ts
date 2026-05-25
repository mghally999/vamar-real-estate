import { media } from "@/lib/media";

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  hero: string;
  date: string;
  readTime: string;
  tags: string[];
  body: ArticleSection[];
}

export const ARTICLES: Article[] = [
  {
    slug: "from-interior-design-to-real-estate-the-vamar-approach",
    title: "From Interior Design to Real Estate: The Vamar Approach",
    eyebrow: "Brand story",
    excerpt:
      "Vamar started as an interior design studio. That heritage is now the reason we read a property differently — we see how a home lives, not just how it lists.",
    hero: media.aboutHero,
    date: "May 2026",
    readTime: "6 min",
    tags: ["Vamar", "Approach", "Design"],
    body: [
      {
        paragraphs: [
          "Before Vamar wrote a single listing, we were drawing them. The studio that became Vamar Real Estate spent a decade inside Dubai homes — finishing them, lighting them, deciding where the kitchen island should land and which wall the morning sun would warm. That work taught us what makes a property feel like a place to live in, not just an asset to hold.",
          "When we expanded into brokerage, we kept the same instinct. A 2,400 sqft floor plan on a PDF is not a home. The question that matters is whether the rooms answer the way you actually spend a Tuesday morning, a Friday afternoon, or a long Sunday lunch.",
        ],
      },
      {
        heading: "What this changes about a viewing",
        paragraphs: [
          "Most agents walk you through a property and recite features. We walk you through a property and ask questions about your life — and then we ask you to imagine specific moments inside the space. Where does the buggy go? Where does your partner take meetings? Where do guests put their shoes?",
          "Those questions filter out three or four properties on a typical shortlist before you ever spend a Saturday driving across town. It saves time. More importantly, it saves the wrong move.",
        ],
      },
      {
        heading: "The design lens, applied to the search",
        paragraphs: [
          "Our team still tags rooms by light, traffic, and acoustic profile when we walk a unit. Bright north-facing studio (good for evening unwind, poor for plant parents). Long galley kitchen (good for entertaining, poor for two cooks). South-facing balcony, 14th floor (radiant heat from noon to 4pm — a real cost the brochure won't mention).",
          "Translating those tags into a buying decision is what we built Vamar to do. It is the same instinct that picked the right pendant for a Jumeirah villa six years ago — applied now to the much larger decision of where you wake up.",
        ],
      },
    ],
  },
  {
    slug: "buying-property-in-dubai-a-first-timers-path",
    title: "Buying Property in Dubai: A First-Timer's Path",
    eyebrow: "Buyer guide",
    excerpt:
      "A clean walk-through of the steps, the fees, and the moments most first-time buyers in Dubai don't see coming.",
    hero: media.heroBuilding,
    date: "May 2026",
    readTime: "8 min",
    tags: ["Buying", "Dubai", "First-time"],
    body: [
      {
        heading: "Step 1 — Decide on freehold or leasehold",
        paragraphs: [
          "Foreign nationals can own freehold in designated areas of Dubai — Downtown, Marina, Palm Jumeirah, Business Bay, JVC, Arabian Ranches, and many more. Outside those zones, ownership is leasehold (up to 99 years) or restricted to UAE/GCC nationals. Confirm the area before you fall in love with a unit.",
        ],
      },
      {
        heading: "Step 2 — Get a mortgage pre-approval",
        paragraphs: [
          "Banks in the UAE will pre-approve based on your salary, debts, and residency status. Non-residents typically need 20–25% down for properties under AED 5M, and more above. Pre-approval costs little and tells you what you can actually afford — without it, you negotiate from a weaker position.",
        ],
      },
      {
        heading: "Step 3 — Make an offer and sign the MoU",
        paragraphs: [
          "Once you agree on a price, you sign a Memorandum of Understanding (Form F) and put down a 10% deposit. This locks the price and starts a typical 30-day path to handover.",
        ],
      },
      {
        heading: "Step 4 — DLD fees and registration",
        paragraphs: [
          "Dubai Land Department charges 4% of the property value as transfer fee (typically split equally between buyer and seller, but negotiable). Add roughly AED 4,000 in admin and registration costs. A mortgage adds another 0.25% DLD mortgage registration fee.",
        ],
      },
      {
        heading: "Step 5 — Handover, keys, and the long part",
        paragraphs: [
          "Handover happens at the DLD office. Final payment is made, the title deed is issued in your name, and you receive keys. From here, the work is community move-in admin: DEWA (utilities), Ejari registration if you'll rent it out, and getting to know your neighbors.",
          "A Vamar agent handles all of this with you, and tells you which steps need your physical signature and which can be done remotely. It's the boring part. We make it boring on purpose.",
        ],
      },
    ],
  },
  {
    slug: "off-plan-vs-ready-what-uae-investors-should-know",
    title: "Off-Plan vs Ready: What UAE Investors Should Know in 2026",
    eyebrow: "Investment",
    excerpt:
      "The fundamentals haven't changed, but the math has. A direct comparison of off-plan and ready property from an investor's seat in 2026.",
    hero: media.agentsPitch,
    date: "Apr 2026",
    readTime: "7 min",
    tags: ["Investment", "Off-plan", "UAE"],
    body: [
      {
        heading: "The headline difference",
        paragraphs: [
          "Off-plan means you buy from the developer before the building is finished. You typically pay 10–20% on signing, then milestones across the construction timeline, with the balance at handover. Ready means the unit is built and you can move in next week.",
          "Off-plan ties your capital up for 2–4 years but unlocks early-buyer pricing and developer-funded handover incentives. Ready demands the full mortgage today but starts paying rent next month.",
        ],
      },
      {
        heading: "Where off-plan wins in 2026",
        paragraphs: [
          "Several premium master-developers are running post-handover payment plans of 3–7 years. For investors with patient capital, that's effectively interest-free financing — and in segments where end-user demand is strong, the resale arbitrage between purchase and handover has been real.",
        ],
      },
      {
        heading: "Where ready wins",
        paragraphs: [
          "Yield. A ready Marina 1BR at AED 1.4M with AED 95k annual rent is producing income from month one. Two years of that rent, compounded against a mortgage you'd be paying anyway, is hard to beat with off-plan paper gains alone.",
          "Liquidity, too. Resale of a ready unit takes weeks. Resale of an off-plan stake before handover takes longer, requires NOC from the developer, and typically loses 2–3% to fees.",
        ],
      },
      {
        heading: "How we frame it",
        paragraphs: [
          "If your capital can sit and you want maximum upside, we'll show you off-plan in select towers with strong launch demand and a track-record developer. If you need yield now or want a primary residence, ready is almost always the right answer. Mixing the two — one of each — is the most common allocation across our investor clients.",
        ],
      },
    ],
  },
  {
    slug: "staging-your-home-for-sale-five-designer-moves",
    title: "Staging Your Home for Sale: Five Designer Moves That Actually Move the Needle",
    eyebrow: "Seller guide",
    excerpt:
      "Pulled directly from our interior design playbook — the five fixes that consistently shorten time-on-market in Dubai listings.",
    hero: media.serviceSell,
    date: "Apr 2026",
    readTime: "5 min",
    tags: ["Selling", "Staging", "Design"],
    body: [
      {
        heading: "1. Remove 30% of your furniture",
        paragraphs: [
          "Empty space sells. Most homes are over-furnished for daily life and grossly over-furnished for photographs. Pull the second armchair, the credenza, the side table you never sit at. The room reads larger, the lens reads cleaner.",
        ],
      },
      {
        heading: "2. Replace bulbs with 3000K everywhere",
        paragraphs: [
          "Mixed-temperature lighting (some warm, some cool) is the fastest tell of a home that doesn't feel considered. Buy a pack of 3000K LED bulbs and standardize every fitting in the home before listing photos. AED 200 of spend. It looks like AED 20,000 of staging.",
        ],
      },
      {
        heading: "3. Repaint the trim",
        paragraphs: [
          "Walls are usually fine. The trim — skirting, door frames, kitchen unit edges — is what looks tired. A weekend of repaint on white satin lifts every room without changing a single piece of furniture.",
        ],
      },
      {
        heading: "4. Make the closet 70% full, not 100%",
        paragraphs: [
          "Buyers open closets. A full closet reads as 'no storage left.' A 70%-full closet reads as 'storage to spare.' Box up off-season clothes before the listing photographer arrives.",
        ],
      },
      {
        heading: "5. Style for the first three meters",
        paragraphs: [
          "Most viewings are won or lost in the first three meters past the front door. Spend your staging budget there: a clean console, a mirror, a single piece of art, a plant. Everything beyond should be calm — let the buyer's eye travel into the property, not snag on clutter.",
        ],
      },
    ],
  },
  {
    slug: "choosing-a-dubai-neighborhood-for-your-stage-of-life",
    title: "Choosing a Dubai Neighborhood for Your Stage of Life",
    eyebrow: "Lifestyle",
    excerpt:
      "A real-estate agent's honest map of Dubai's communities — by who lives there best, not by who advertises hardest.",
    hero: media.nycSkyline,
    date: "Mar 2026",
    readTime: "9 min",
    tags: ["Communities", "Dubai", "Lifestyle"],
    body: [
      {
        heading: "Single or couple, building a career",
        paragraphs: [
          "Marina, JLT, Business Bay, Downtown. Walk-to-work density, restaurants by the dozen, metro access, and rental flexibility. You'll pay more per sqft and have less outdoor space, but the time you save commuting is the entire point.",
        ],
      },
      {
        heading: "Young family with a buggy",
        paragraphs: [
          "Town Square, Damac Hills 2, Arabian Ranches 3, Dubai Hills. Townhouses with a small garden, neighborhood schools within a 10-minute drive, parks that actually get used. Slower pace, longer commute, much better Sunday.",
        ],
      },
      {
        heading: "Established family, two cars, multiple schools",
        paragraphs: [
          "Emirates Hills, Al Barari, Meadows, Springs, established Dubai Hills clusters. Larger villas, mature trees, school catchments locked in. Premium pricing but stable resale and tight-knit community fabric.",
        ],
      },
      {
        heading: "Empty-nesters or retirees",
        paragraphs: [
          "Palm Jumeirah, beachfront Bluewaters, Saadiyat in Abu Dhabi. Low maintenance, high walkability to cafés and beach, building amenities replace the garden you no longer want to mow.",
        ],
      },
      {
        heading: "The investor, not the resident",
        paragraphs: [
          "JVC, JVT, Business Bay, and select Dubai South towers. Strong rental yields, manageable service charges, sustained tenant demand. The community is fine — but you're optimizing the spreadsheet, not the lifestyle.",
        ],
      },
    ],
  },
  {
    slug: "title-deeds-oqood-and-service-charges-explained",
    title: "Title Deeds, Oqood, and Service Charges — Explained Without Jargon",
    eyebrow: "Paperwork",
    excerpt:
      "Three documents and one recurring charge that confuse almost every first-time buyer in the UAE. Plain English, no fluff.",
    hero: media.paperHero,
    date: "Mar 2026",
    readTime: "4 min",
    tags: ["Paperwork", "Legal", "Fees"],
    body: [
      {
        heading: "Title Deed",
        paragraphs: [
          "Issued by the Dubai Land Department once your purchase completes. It is the legal proof that you own the unit. Keep it secure. You'll need a copy for refinancing, resale, or putting a tenant in place via Ejari.",
        ],
      },
      {
        heading: "Oqood",
        paragraphs: [
          "Oqood (literally 'contracts') is the pre-completion equivalent of a title deed — issued to buyers of off-plan property and registered with the DLD. It records your stake in a unit that doesn't physically exist yet. On handover, oqood is replaced by the title deed.",
        ],
      },
      {
        heading: "Form F (MoU)",
        paragraphs: [
          "The Memorandum of Understanding signed between buyer and seller at offer-acceptance time. It locks in price, deposit terms, and timelines. Until Form F is signed, the deal is verbal — and worth roughly the same.",
        ],
      },
      {
        heading: "Service Charges",
        paragraphs: [
          "Annual fee billed per sqft of your property, set by the building's owners' association and audited by the Real Estate Regulatory Agency. Typical range: AED 8–25 per sqft per year for apartments, AED 3–8 per sqft for villa communities.",
          "What you're paying for: building security, lift maintenance, lobby cleaning, pool, gym, AC chillers, district cooling if applicable, and reserve fund for major repairs. Ask for the audit before you buy — a building with overdue service charge collections is a building heading into deferred maintenance.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
