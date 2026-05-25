const photo = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export type PropertyMode = "sale" | "rent";

export interface Property {
  slug: string;
  title: string;
  neighborhood: string;
  city: string;
  mode: PropertyMode;
  /** Sale: total AED. Rent: AED per year. */
  price: number;
  beds: number;
  baths: number;
  /** Interior area in square feet. */
  area: number;
  photo: string;
  tag?: "New" | "Featured" | "Off-Plan";
}

export const PROPERTIES: Property[] = [
  {
    slug: "marina-skyline-3br",
    title: "Marina Skyline 3-Bedroom",
    neighborhood: "Dubai Marina",
    city: "Dubai",
    mode: "sale",
    price: 4_250_000,
    beds: 3,
    baths: 3,
    area: 1860,
    photo: photo("1600585154340-be6161a56a0c"),
    tag: "Featured",
  },
  {
    slug: "downtown-loft-2br",
    title: "Downtown Loft with Burj View",
    neighborhood: "Downtown",
    city: "Dubai",
    mode: "sale",
    price: 3_100_000,
    beds: 2,
    baths: 2,
    area: 1310,
    photo: photo("1600596542815-ffad4c1539a9"),
  },
  {
    slug: "palm-villa-5br",
    title: "Palm Beachfront Villa",
    neighborhood: "Palm Jumeirah",
    city: "Dubai",
    mode: "sale",
    price: 17_500_000,
    beds: 5,
    baths: 6,
    area: 6420,
    photo: photo("1564013799919-ab600027ffc6"),
    tag: "New",
  },
  {
    slug: "emirates-hills-mansion",
    title: "Lakeside Mansion",
    neighborhood: "Emirates Hills",
    city: "Dubai",
    mode: "sale",
    price: 42_000_000,
    beds: 7,
    baths: 9,
    area: 12_400,
    photo: photo("1613490493576-7fde63acd811"),
    tag: "Off-Plan",
  },
  {
    slug: "city-walk-2br-loft",
    title: "City Walk Designer Loft",
    neighborhood: "City Walk",
    city: "Dubai",
    mode: "sale",
    price: 2_650_000,
    beds: 2,
    baths: 2,
    area: 1180,
    photo: photo("1505691938895-1758d7feb511"),
  },
  {
    slug: "jbr-tower-studio",
    title: "JBR Beachfront Studio",
    neighborhood: "JBR",
    city: "Dubai",
    mode: "rent",
    price: 110_000,
    beds: 0,
    baths: 1,
    area: 540,
    photo: photo("1502672023488-70e25813eb80"),
  },
  {
    slug: "business-bay-1br",
    title: "Business Bay 1-Bedroom",
    neighborhood: "Business Bay",
    city: "Dubai",
    mode: "rent",
    price: 95_000,
    beds: 1,
    baths: 1,
    area: 720,
    photo: photo("1502005229762-cf1b2da7c5d6"),
  },
  {
    slug: "arabian-ranches-4br",
    title: "Family Townhouse",
    neighborhood: "Arabian Ranches",
    city: "Dubai",
    mode: "rent",
    price: 220_000,
    beds: 4,
    baths: 4,
    area: 3120,
    photo: photo("1572120360610-d971b9d7767c"),
    tag: "Featured",
  },
  {
    slug: "jumeirah-villa-3br",
    title: "Jumeirah Garden Villa",
    neighborhood: "Jumeirah 1",
    city: "Dubai",
    mode: "rent",
    price: 285_000,
    beds: 3,
    baths: 4,
    area: 2840,
    photo: photo("1600607687939-ce8a6c25118c"),
  },
  {
    slug: "saadiyat-beach-3br",
    title: "Saadiyat Beach Apartment",
    neighborhood: "Saadiyat Island",
    city: "Abu Dhabi",
    mode: "sale",
    price: 5_900_000,
    beds: 3,
    baths: 3,
    area: 2050,
    photo: photo("1493809842364-78817add7ffb"),
  },
  {
    slug: "yas-island-3br",
    title: "Yas Island Waterfront",
    neighborhood: "Yas Island",
    city: "Abu Dhabi",
    mode: "rent",
    price: 175_000,
    beds: 3,
    baths: 3,
    area: 2110,
    photo: photo("1512917774080-9991f1c4c750"),
    tag: "New",
  },
  {
    slug: "al-reem-tower-2br",
    title: "Al Reem Skyline 2BR",
    neighborhood: "Al Reem Island",
    city: "Abu Dhabi",
    mode: "sale",
    price: 2_350_000,
    beds: 2,
    baths: 2,
    area: 1240,
    photo: photo("1568605114967-8130f3a36994"),
  },
];

export const PRICE_AED = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

export function formatPrice(p: Property): string {
  const value = PRICE_AED.format(p.price);
  return p.mode === "rent" ? `${value} / yr` : value;
}
