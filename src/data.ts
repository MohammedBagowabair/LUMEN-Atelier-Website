export const site = {
  name: "LUMEN Atelier",
  short: "LUMEN",
  tagline: "Interiors shaped by light",
  email: "studio@lumenatelier.example",
  phone: "+966 50 000 0000",
  whatsapp: "966500000000",
  location: "Riyadh · Dubai · Copenhagen",
  address: "King Fahd Road, Al Olaya, Riyadh",
};

export type Category = "All" | "Residential" | "Hospitality" | "Retail";

export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  category: Exclude<Category, "All">;
  image: string;
  blurb: string;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = u("1600585152915-d208bec867a1", 2000);

export const categories: Category[] = [
  "All",
  "Residential",
  "Hospitality",
  "Retail",
];

export const projects: Project[] = [
  {
    id: "villa-aurora",
    title: "Villa Aurora",
    location: "Diriyah, KSA",
    year: "2025",
    category: "Residential",
    image: u("1600210492486-724fe5c67fb0"),
    blurb:
      "A glass-wrapped family home where morning light becomes the primary material — open living, quiet courtyards, and joinery that disappears into the walls.",
  },
  {
    id: "maison-noire",
    title: "Maison Noire",
    location: "Paris, FR",
    year: "2024",
    category: "Residential",
    image: u("1616594039964-ae9021a400a0"),
    blurb:
      "Charcoal walls, oak grain, and quiet luxury for a pied-à-terre. Every surface is tactile; every light source is intentional.",
  },
  {
    id: "coastal-light",
    title: "Coastal Light Kitchen",
    location: "Abu Dhabi, UAE",
    year: "2025",
    category: "Residential",
    image: u("1556911220-bff31c812dba"),
    blurb:
      "Marble, pale oak, and suspended brass — a kitchen designed as daily ceremony, open to the sea breeze and morning sun.",
  },
  {
    id: "ridge-house",
    title: "Ridge House",
    location: "Alula, KSA",
    year: "2023",
    category: "Residential",
    image: u("1600607687939-ce8a6c25118c"),
    blurb:
      "A cliffside retreat in limestone and linen. Rooms open toward the canyon; evenings settle into soft amber light.",
  },
  {
    id: "palm-court",
    title: "Palm Court Resort",
    location: "Jeddah, KSA",
    year: "2025",
    category: "Hospitality",
    image: u("1542314831-068cd1dbfeeb"),
    blurb:
      "A coastal hospitality pavilion choreographed around water and shade — arrival, linger, and the slow walk to the sea.",
  },
  {
    id: "ember-lounge",
    title: "Ember Lounge",
    location: "Dubai, UAE",
    year: "2024",
    category: "Hospitality",
    image: u("1514933651103-005eec06c04b"),
    blurb:
      "Mood lighting, textured timber, and a bar that feels like a private club. Designed for late conversation and soft jazz.",
  },
  {
    id: "silt-hotel",
    title: "Silt Hotel Lobby",
    location: "Manama, BH",
    year: "2024",
    category: "Hospitality",
    image: u("1566073771259-6a850609517f"),
    blurb:
      "A lobby as a living room: travertine floors, low seating, and a champagne metal reception desk that catches afternoon light.",
  },
  {
    id: "atelier-line",
    title: "Atelier Line Flagship",
    location: "Copenhagen, DK",
    year: "2023",
    category: "Retail",
    image: u("1441986300917-64674bd600d8"),
    blurb:
      "A retail gallery that treats garments as sculpture under soft daylight. Fixtures disappear; the clothes hold the room.",
  },
  {
    id: "nordic-atelier",
    title: "Nordic Atelier Store",
    location: "Stockholm, SE",
    year: "2025",
    category: "Retail",
    image: u("1441984904996-e0b6ba687e04"),
    blurb:
      "White walls, smoked oak floors, and a single long table — a store that feels like a well-lit studio, not a showroom.",
  },
  {
    id: "ombre-boutique",
    title: "Ombré Boutique",
    location: "Riyadh, KSA",
    year: "2024",
    category: "Retail",
    image: u("1555529733-0cae8f6c3a58"),
    blurb:
      "A boutique for slow fashion: arched niches, champagne rails, and a fitting lounge wrapped in raw linen.",
  },
];

export const services = [
  {
    num: "01",
    title: "Discover",
    text: "We begin with you — brief, site, sun path, and how the room should feel at 7am and at dusk. No moodboards before listening.",
  },
  {
    num: "02",
    title: "Compose",
    text: "Plans, material boards, and atmosphere studies. You see daylight, joinery, and proportion before a single wall is built.",
  },
  {
    num: "03",
    title: "Detail",
    text: "Samples, mock-ups, and junctions refined until every edge feels quiet. FF&E curated as one composition, not a catalogue.",
  },
  {
    num: "04",
    title: "Realize",
    text: "On-site direction through build and install. We stay until the lights are on and the rooms feel settled — not staged.",
  },
];

export const materials = [
  { name: "Travertine", image: u("1600585154340-be6161a56a0c", 900) },
  { name: "Brushed Brass", image: u("1618220179428-22790b461013", 900) },
  { name: "Raw Linen", image: u("1618219908412-a29a1bb7b86e", 900) },
  { name: "Smoked Oak", image: u("1600566753190-17f0baa2a6c3", 900) },
];

export const process = [
  {
    step: "01",
    title: "Listen",
    text: "Brief, site, light path, and the life the room must hold.",
  },
  {
    step: "02",
    title: "Compose",
    text: "Plans, material boards, and atmosphere studies in dialogue with you.",
  },
  {
    step: "03",
    title: "Refine",
    text: "Details, samples, and mock-ups until every junction feels quiet.",
  },
  {
    step: "04",
    title: "Realize",
    text: "Site presence through install — light switched on, rooms settled.",
  },
];

export const quotes = [
  {
    text: "LUMEN treats light as structure. The rooms feel calm without being empty.",
    attrib: "Monocle Design Review",
  },
  {
    text: "A studio that understands Gulf climate and European restraint in the same breath.",
    attrib: "Design Anthology",
  },
];

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];
