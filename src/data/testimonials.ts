import { media } from "@/lib/media";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  meta: string;
  photo: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I'd walked through twenty places before I called Vamar. They closed my search in three weekends. The difference was the questions, not the listings.",
    author: "Yara K.",
    meta: "Bought in Downtown · 2025",
    photo: media.testA,
  },
  {
    id: "t2",
    quote:
      "Selling a home in this market is supposed to be stressful. Somehow it wasn't. They priced it where the data said, staged it where the buyers were, and we closed 4% over comp.",
    author: "Daniel M.",
    meta: "Sold in Emirates Hills · 2024",
    photo: media.testB,
  },
  {
    id: "t3",
    quote:
      "Joined Vamar as an agent two years ago. My income tripled, but the better part is I stopped dreading Mondays. Real coaching, real splits.",
    author: "Imran A.",
    meta: "Senior Agent, Marina",
    photo: media.testC,
  },
  {
    id: "t4",
    quote:
      "They told me exactly which two units in the building would hold value and which one wouldn't. That call alone paid for the whole relationship.",
    author: "Priya R.",
    meta: "Investor · 2025",
    photo: media.testA,
  },
  {
    id: "t5",
    quote:
      "Vamar ran our rental search like a project, not a hobby. Found us the home, negotiated the lease, and we moved in twelve days later.",
    author: "Aisha & Omar",
    meta: "Rented in JBR · 2025",
    photo: media.testB,
  },
];
