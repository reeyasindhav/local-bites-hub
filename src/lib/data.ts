export const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export type Stall = {
  id: string;
  name: string;
  dish: string;
  vendor: string;
  neighbourhood: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  tags: string[];
  hours: string;
  open: boolean;
  veg: boolean;
  photo: string;
  story: string;
  accent: "chilli" | "cobalt" | "turmeric";
  lat: number;
  lng: number;
  menu: { name: string; price: number; note: string }[];
};

export const stalls: Stall[] = [
  {
    id: "kheema-pav-mohammed-ali",
    name: "Noor Kheema Corner",
    dish: "Kheema Pav",
    vendor: "Noor Bhai",
    neighbourhood: "Mohammed Ali Road",
    city: "Mumbai",
    price: 140,
    rating: 4.9,
    reviews: 812,
    tags: ["Late night", "Meaty", "Community pick"],
    hours: "6:00 PM – 2:00 AM",
    open: true,
    veg: false,
    photo: img("1601050690597-df0568f70950"),
    story:
      "Three generations of slow-cooked mutton kheema, ladled onto pav that is buttered on a griddle older than most of the queue.",
    accent: "chilli",
    lat: 32,
    lng: 24,
    menu: [
      { name: "Kheema Pav", price: 140, note: "Two pav, extra gravy on ask" },
      { name: "Bheja Fry", price: 190, note: "Weekends only" },
      { name: "Sulaimani Chai", price: 30, note: "Cuts the spice" },
    ],
  },
  {
    id: "momos-dilli-haat",
    name: "Tashi's Momo Cart",
    dish: "Steamed Momos",
    vendor: "Tashi Dolma",
    neighbourhood: "Dilli Haat",
    city: "Delhi",
    price: 80,
    rating: 4.8,
    reviews: 640,
    tags: ["Quick bite", "Steamed", "Under ₹100"],
    hours: "11:00 AM – 9:00 PM",
    open: true,
    veg: true,
    photo: img("1563245372-f21724e3856d"),
    story:
      "Hand-pleated every morning in a Majnu ka Tilla kitchen, steamed in bamboo baskets, served with a fire-roasted tomato chutney.",
    accent: "turmeric",
    lat: 58,
    lng: 40,
    menu: [
      { name: "Veg Steamed Momos", price: 80, note: "8 pieces" },
      { name: "Chicken Fried Momos", price: 110, note: "Crisp bottom" },
      { name: "Thukpa Bowl", price: 130, note: "Winter special" },
    ],
  },
  {
    id: "kathi-roll-park-street",
    name: "Bade's Roll Counter",
    dish: "Kathi Roll",
    vendor: "Bade Miyan",
    neighbourhood: "Park Street",
    city: "Kolkata",
    price: 120,
    rating: 4.7,
    reviews: 903,
    tags: ["Iconic", "Egg roll", "Takeaway"],
    hours: "4:00 PM – 12:30 AM",
    open: true,
    veg: false,
    photo: img("1565958011703-44f9829ba187"),
    story:
      "Paratha slapped onto the tawa, egg cracked over it, and a fistful of onion, chilli and lime folded in before the paper wrap goes on.",
    accent: "cobalt",
    lat: 70,
    lng: 62,
    menu: [
      { name: "Double Egg Chicken Roll", price: 120, note: "House favourite" },
      { name: "Paneer Tikka Roll", price: 100, note: "Charred, not soggy" },
      { name: "Mutton Kabiraji", price: 180, note: "Ask for extra kasundi" },
    ],
  },
  {
    id: "misal-pav-sadashiv-peth",
    name: "Anna's Misal Adda",
    dish: "Misal Pav",
    vendor: "Anna Kulkarni",
    neighbourhood: "Sadashiv Peth",
    city: "Pune",
    price: 90,
    rating: 4.8,
    reviews: 421,
    tags: ["Fiery", "Breakfast", "Vegetarian"],
    hours: "7:00 AM – 12:00 PM",
    open: false,
    veg: true,
    photo: img("1585032226651-759b368d7246"),
    story:
      "A tarri so red it stains the steel bowl. Regulars know to order the buttermilk before the first spoon, not after.",
    accent: "chilli",
    lat: 24,
    lng: 66,
    menu: [
      { name: "Kolhapuri Misal", price: 90, note: "Spice level 4/5" },
      { name: "Extra Tarri", price: 20, note: "At your own risk" },
      { name: "Solkadhi", price: 40, note: "The fire extinguisher" },
    ],
  },
  {
    id: "idli-vada-mylapore",
    name: "Kamala Tiffin Cart",
    dish: "Idli & Medu Vada",
    vendor: "Kamala Amma",
    neighbourhood: "Mylapore",
    city: "Chennai",
    price: 60,
    rating: 4.9,
    reviews: 388,
    tags: ["Breakfast", "Under ₹100", "Vegetarian"],
    hours: "5:30 AM – 10:00 AM",
    open: true,
    veg: true,
    photo: img("1606491956689-2ea866880c84"),
    story:
      "Steam rising off a brass vessel at dawn, three chutneys in aluminium tubs, and a queue of temple-goers that never seems to shrink.",
    accent: "turmeric",
    lat: 44,
    lng: 18,
    menu: [
      { name: "Idli Plate (3)", price: 60, note: "With molagapodi" },
      { name: "Medu Vada (2)", price: 50, note: "Crisp shell, airy inside" },
      { name: "Filter Coffee", price: 25, note: "Degree kaapi" },
    ],
  },
  {
    id: "chaat-chowpatty",
    name: "Girgaon Chaat Gully",
    dish: "Sev Puri & Bhel",
    vendor: "Ramesh Chaatwala",
    neighbourhood: "Girgaon Chowpatty",
    city: "Mumbai",
    price: 70,
    rating: 4.6,
    reviews: 1204,
    tags: ["Sunset spot", "Chaat", "Family friendly"],
    hours: "3:00 PM – 11:00 PM",
    open: true,
    veg: true,
    photo: img("1626074353765-517a681e40be"),
    story:
      "Sea breeze, six kinds of chutney, and a man who assembles forty plates a minute without ever looking down at his hands.",
    accent: "cobalt",
    lat: 16,
    lng: 46,
    menu: [
      { name: "Sev Puri", price: 70, note: "Sweet-sharp balance" },
      { name: "Bhel Puri", price: 60, note: "Ask for dry" },
      { name: "Ragda Pattice", price: 90, note: "Winter warmer" },
    ],
  },
  {
    id: "litti-chokha-boring-road",
    name: "Sonu Litti Bhandar",
    dish: "Litti Chokha",
    vendor: "Sonu Yadav",
    neighbourhood: "Boring Road",
    city: "Patna",
    price: 80,
    rating: 4.7,
    reviews: 265,
    tags: ["Smoky", "Vegetarian", "Coal fired"],
    hours: "5:00 PM – 11:00 PM",
    open: true,
    veg: true,
    photo: img("1504674900247-0877df9cc836"),
    story:
      "Sattu-stuffed dough balls roasted on coal, cracked open by hand and drowned in ghee while still too hot to hold.",
    accent: "chilli",
    lat: 62,
    lng: 74,
    menu: [
      { name: "Litti Chokha (4)", price: 80, note: "Ghee included" },
      { name: "Baingan Chokha", price: 40, note: "Smoked aubergine" },
      { name: "Ghugni", price: 50, note: "Add-on bowl" },
    ],
  },
  {
    id: "kebab-nizamuddin",
    name: "Ghalib Seekh House",
    dish: "Seekh Kebab",
    vendor: "Imtiaz Qureshi",
    neighbourhood: "Nizamuddin Basti",
    city: "Delhi",
    price: 160,
    rating: 4.8,
    reviews: 741,
    tags: ["Grilled", "Meaty", "Late night"],
    hours: "6:00 PM – 1:00 AM",
    open: true,
    veg: false,
    photo: img("1555939594-58d7cb561ad1"),
    story:
      "Mince pressed onto skewers over glowing coal, fanned by hand, served on newspaper with raw onion and a wedge of lime.",
    accent: "turmeric",
    lat: 78,
    lng: 30,
    menu: [
      { name: "Mutton Seekh (4)", price: 160, note: "Charcoal grilled" },
      { name: "Chicken Malai Tikka", price: 180, note: "Creamy, mild" },
      { name: "Rumali Roti", price: 25, note: "Folded fresh" },
    ],
  },
];

export type Trail = {
  slug: string;
  title: string;
  city: string;
  duration: string;
  stops: number;
  distance: string;
  budget: string;
  blurb: string;
  photo: string;
  accent: "chilli" | "cobalt" | "turmeric";
  itinerary: { time: string; stall: string; dish: string; note: string }[];
};

export const trails: Trail[] = [
  {
    slug: "mohammed-ali-road-after-dark",
    title: "Mohammed Ali Road After Dark",
    city: "Mumbai",
    duration: "3 hrs",
    stops: 6,
    distance: "1.8 km",
    budget: "₹600 for two",
    blurb:
      "Start with kheema, end with malpua. A slow crawl through the loudest, brightest, most delicious 1.8 kilometres in the city.",
    photo: img("1534939561126-855b8675edd7", 1400),
    accent: "chilli",
    itinerary: [
      { time: "7:00 PM", stall: "Noor Kheema Corner", dish: "Kheema Pav", note: "Go early, gravy runs out" },
      { time: "7:45 PM", stall: "Bohri Baida Roti", dish: "Baida Roti", note: "Order half if sharing" },
      { time: "8:30 PM", stall: "Suleman Usman", dish: "Nalli Nihari", note: "Bone marrow, no rush" },
      { time: "9:15 PM", stall: "Tawakkal Sweets", dish: "Malpua Rabdi", note: "Sit, don't walk with it" },
      { time: "9:50 PM", stall: "Haji Tikka", dish: "Boti Tikka", note: "Charcoal only after 9" },
      { time: "10:20 PM", stall: "Shalimar Chai", dish: "Sulaimani", note: "The full stop" },
    ],
  },
  {
    slug: "mylapore-dawn-tiffin",
    title: "Mylapore Dawn Tiffin Walk",
    city: "Chennai",
    duration: "2 hrs",
    stops: 5,
    distance: "1.1 km",
    budget: "₹300 for two",
    blurb:
      "Temple bells, filter coffee steam and idlis that arrive faster than you can finish the last one. Set an alarm for 5:30 AM.",
    photo: img("1509440159596-0249088772ff", 1400),
    accent: "turmeric",
    itinerary: [
      { time: "5:45 AM", stall: "Kamala Tiffin Cart", dish: "Idli Plate", note: "Molagapodi, extra gingelly" },
      { time: "6:20 AM", stall: "Karpagambal Mess", dish: "Pongal", note: "Ghee poured tableside" },
      { time: "7:00 AM", stall: "Rayar's Mess", dish: "Rava Dosa", note: "Lace-thin, wait 10 min" },
      { time: "7:40 AM", stall: "Mami Kaapi", dish: "Degree Coffee", note: "Drink from the dabara" },
      { time: "8:10 AM", stall: "Sundal Thatha", dish: "Kadalai Sundal", note: "Beach-side finish" },
    ],
  },
  {
    slug: "park-street-roll-run",
    title: "Park Street Roll Run",
    city: "Kolkata",
    duration: "2.5 hrs",
    stops: 4,
    distance: "2.4 km",
    budget: "₹500 for two",
    blurb:
      "Four counters, four wraps, one very greasy paper bag of joy. Best attempted on a rainy Kolkata evening.",
    photo: img("1476224203421-9ac39bcb3327", 1400),
    accent: "cobalt",
    itinerary: [
      { time: "5:00 PM", stall: "Bade's Roll Counter", dish: "Double Egg Roll", note: "Extra lime" },
      { time: "6:00 PM", stall: "Hot Kati Roll", dish: "Mutton Roll", note: "Standing room only" },
      { time: "7:00 PM", stall: "Kusum Rolls", dish: "Chicken Tikka Roll", note: "The benchmark" },
      { time: "8:00 PM", stall: "Anadi Cabin", dish: "Mughlai Paratha", note: "Sit down for this one" },
    ],
  },
];

export const cities = ["Mumbai", "Delhi", "Kolkata", "Chennai", "Pune", "Patna"];

export const filterTags = [
  "Under ₹100",
  "Late night",
  "Vegetarian",
  "Breakfast",
  "Meaty",
  "Chaat",
];

export const reviews = [
  {
    user: "Aarti M.",
    city: "Mumbai",
    rating: 5,
    text: "Queued 20 minutes at 11 PM and would do it again tomorrow. The pav is buttered like it owes you money.",
    stall: "Noor Kheema Corner",
    date: "2 days ago",
  },
  {
    user: "Dev S.",
    city: "Delhi",
    rating: 4,
    text: "Cart moves between the two gates — the live location on Localbite saved me a very sad walk.",
    stall: "Tashi's Momo Cart",
    date: "5 days ago",
  },
  {
    user: "Rhea K.",
    city: "Kolkata",
    rating: 5,
    text: "Third generation running this counter and you can taste the practice. Ask for the kasundi.",
    stall: "Bade's Roll Counter",
    date: "1 week ago",
  },
];
