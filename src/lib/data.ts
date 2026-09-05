export const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const imgUrl = (url: string) => url;

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
    photo: imgUrl("https://images.unsplash.com/photo-1532384159185-16f0bcfd5a5b?auto=format&fit=crop&w=1000&q=70"),
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
    photo: img("1757445060057-f86bbb3de1e2"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1696762314476-07470ad680bc?auto=format&fit=crop&w=1000&q=70"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1599307767316-776533bb941c?auto=format&fit=crop&w=1000&q=70"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1741376509187-0b683c764294?auto=format&fit=crop&w=1000&q=70"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1760263051313-eb80f321e310?auto=format&fit=crop&w=1000&q=70"),
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
    photo: imgUrl("https://commons.wikimedia.org/wiki/Special:FilePath/Litti_chokha.jpg?auto=format&fit=crop&w=1000&q=70"),
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
    photo: img("1705359573325-f2006d5e459f"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1760263051313-eb80f321e310?auto=format&fit=crop&w=1400&q=70"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1741376509187-0b683c764294?auto=format&fit=crop&w=1400&q=70"),
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
    photo: imgUrl("https://images.unsplash.com/photo-1757445060057-f86bbb3de1e2?auto=format&fit=crop&w=1400&q=70"),
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
    id: "r-1",
    user: "Aarti M.",
    city: "Mumbai",
    rating: 5,
    text: "Queued 20 minutes at 11 PM and would do it again tomorrow. The pav is buttered like it owes you money.",
    stall: "Noor Kheema Corner",
    dish: "Kheema Pav",
    date: "2 days ago",
  },
  {
    id: "r-2",
    user: "Dev S.",
    city: "Delhi",
    rating: 4,
    text: "Cart moves between the two gates — the live location on Localbite saved me a very sad walk.",
    stall: "Tashi's Momo Cart",
    dish: "Steamed Momos",
    date: "5 days ago",
  },
  {
    id: "r-3",
    user: "Rhea K.",
    city: "Kolkata",
    rating: 5,
    text: "Third generation running this counter and you can taste the practice. Ask for the kasundi.",
    stall: "Bade's Roll Counter",
    dish: "Kathi Roll",
    date: "1 week ago",
  },
  {
    id: "r-4",
    user: "Sahil P.",
    city: "Pune",
    rating: 5,
    text: "Tarri so red it stains the bowl. Buttermilk first, not after. They know.",
    stall: "Anna's Misal Adda",
    dish: "Misal Pav",
    date: "3 days ago",
  },
  {
    id: "r-5",
    user: "Kavya R.",
    city: "Chennai",
    rating: 5,
    text: "Molagapodi on a hot idli at 6 AM is the closest thing to religion I have.",
    stall: "Kamala Tiffin Cart",
    dish: "Idli & Medu Vada",
    date: "1 day ago",
  },
  {
    id: "r-6",
    user: "Naveen T.",
    city: "Mumbai",
    rating: 4,
    text: "Sev puri here is the city standard. Crispy, balanced, no soggy base.",
    stall: "Girgaon Chaat Gully",
    dish: "Sev Puri & Bhel",
    date: "4 days ago",
  },
  {
    id: "r-7",
    user: "Priyanka M.",
    city: "Patna",
    rating: 5,
    text: "Litti straight from the chulha, drenched in ghee. Worth the soot on my nose.",
    stall: "Sonu Litti Bhandar",
    dish: "Litti Chokha",
    date: "6 days ago",
  },
  {
    id: "r-8",
    user: "Imran K.",
    city: "Delhi",
    rating: 5,
    text: "Seekh kebabs done over coal the way it should be. Smoke in the air, juice in every bite.",
    stall: "Ghalib Seekh House",
    dish: "Seekh Kebab",
    date: "2 days ago",
  },
  {
    id: "r-9",
    user: "Tara S.",
    city: "Kolkata",
    rating: 5,
    text: "Mughlai paratha that doesn't need a knife. Egg, keema, onion — the works, in one perfect parcel.",
    stall: "Anadi Cabin",
    dish: "Mughlai Paratha",
    date: "1 day ago",
  },
  {
    id: "r-10",
    user: "Rohan V.",
    city: "Mumbai",
    rating: 4,
    text: "Boti tikka right off the coals, smoky and tender. Queue moves fast, somehow.",
    stall: "Haji Tikka",
    dish: "Boti Tikka",
    date: "5 days ago",
  },
];

export type Dish = {
  slug: string;
  name: string;
  region: string;
  origin: string;
  blurb: string;
  description: string;
  photo: string;
  accent: "chilli" | "cobalt" | "turmeric";
  tags: string[];
  signature: string;
  variations: { city: string; note: string }[];
};

export const dishes: Dish[] = [
  {
    slug: "kheema-pav",
    name: "Kheema Pav",
    region: "Mumbai · Maharashtra",
    origin: "Irani cafés of Bombay, mid-20th century",
    blurb: "Spiced minced mutton, buttered pav, eaten with the hands at midnight.",
    description:
      "Slow-cooked mutton mince in a thick onion-tomato masala, spooned onto a slab of buttered pav. The gravy is the point — ask for extra. Best eaten standing, leaning against a tarpaulin, after 9 PM.",
    photo: imgUrl("https://images.unsplash.com/photo-1532384159185-16f0bcfd5a5b?auto=format&fit=crop&w=1200&q=70"),
    accent: "chilli",
    tags: ["Meaty", "Late night", "Iconic"],
    signature: "Mohammed Ali Road, Mumbai",
    variations: [
      { city: "Mumbai", note: "Served with buttered pav and a side of lime." },
      { city: "Pune", note: "Often milder, eaten with bhakri in some stalls." },
      { city: "Bengaluru", note: "Irani cafés do a drier masala version." },
    ],
  },
  {
    slug: "kathi-roll",
    name: "Kathi Roll",
    region: "Kolkata · West Bengal",
    origin: "Nizam's Restaurant, 1932",
    blurb: "Egg-wrapped paratha, double-rolled, eaten on the move in the rain.",
    description:
      "A flaky paratha crisped on the tawa, an egg cracked over it, kebab or paneer tipped in, then a fistful of raw onion, green chilli and lime. Wrapped in foil so tight you eat it like a torch.",
    photo: imgUrl("https://images.unsplash.com/photo-1696762314476-07470ad680bc?auto=format&fit=crop&w=1200&q=70"),
    accent: "cobalt",
    tags: ["Iconic", "Takeaway", "Egg roll"],
    signature: "Park Street, Kolkata",
    variations: [
      { city: "Kolkata", note: "The benchmark — kathi and kasundi non-negotiable." },
      { city: "Mumbai", note: "Often with green chutney and a thicker paratha." },
      { city: "Delhi", note: "Roll shops use roomali roti in place of paratha." },
    ],
  },
  {
    slug: "misal-pav",
    name: "Misal Pav",
    region: "Pune · Maharashtra",
    origin: "Khandesh region, adapted in Pune breakfast stalls",
    blurb: "Sprout curry so spicy it stains the bowl. Pav on the side. Buttermilk first.",
    description:
      "A tarri of sprouted moth beans in a fierce red gravy, topped with farsan, chopped onion, tomato and lemon. Pav for scooping. Regulars know the order: buttermilk first, misal second, never the other way around.",
    photo: imgUrl("https://images.unsplash.com/photo-1599307767316-776533bb941c?auto=format&fit=crop&w=1200&q=70"),
    accent: "chilli",
    tags: ["Fiery", "Breakfast", "Vegetarian"],
    signature: "Sadashiv Peth, Pune",
    variations: [
      { city: "Pune", note: "Puneri misal — milder, more farsan, more coconut." },
      { city: "Kolhapur", note: "Kolhapuri misal — the spiciest of the lot." },
      { city: "Mumbai", note: "Often served with a slice of bread instead of pav." },
    ],
  },
  {
    slug: "idli-medu-vada",
    name: "Idli & Medu Vada",
    region: "Mylapore · Chennai",
    origin: "Tamil temple cuisine, thousands of years old",
    blurb: "Steamed rice cake, fried lentil doughnut, three chutneys, one sambar.",
    description:
      "Soft idlis made from fermented rice-urad batter, paired with crisp medu vadas fried golden. Coconut chutney, tomato chutney, a mint-coriander chutney, and a bowl of sambar that gets thinner (and more personal) as you dunk.",
    photo: imgUrl("https://images.unsplash.com/photo-1741376509187-0b683c764294?auto=format&fit=crop&w=1200&q=70"),
    accent: "turmeric",
    tags: ["Breakfast", "Vegetarian", "South Indian"],
    signature: "Mylapore, Chennai",
    variations: [
      { city: "Chennai", note: "Molagapodi mandatory. Idli dipped in dry chutney with ghee." },
      { city: "Bengaluru", note: "Often served as a combo plate with kesari bath." },
      { city: "Madurai", note: "Kari dosa, a thicker cousin with mutton." },
    ],
  },
  {
    slug: "sev-puri-bhel",
    name: "Sev Puri & Bhel",
    region: "Girgaon · Mumbai",
    origin: "Gujarat street stalls, 1950s onwards",
    blurb: "Crispy puris, three chutneys, raw mango, the sea-air salinity of Chowpatty.",
    description:
      "Flat puris topped with mashed potato, onion, tomato, then three chutneys — green, tamarind-date, garlic. Sev showered on top. Bhel is the same family with puffed rice and sev tossed in. Eaten within 60 seconds of being handed to you.",
    photo: imgUrl("https://images.unsplash.com/photo-1760263051313-eb80f321e310?auto=format&fit=crop&w=1200&q=70"),
    accent: "chilli",
    tags: ["Chaat", "Vegetarian", "Snack"],
    signature: "Girgaon Chowpatty, Mumbai",
    variations: [
      { city: "Mumbai", note: "Bhel puri is dry-tossed; sev puri is built and topped." },
      { city: "Surat", note: "Loose bhel with raw mango is the street breakfast." },
      { city: "Indore", note: "Bhutte ka kees — a sweet-corn cousin, entirely different." },
    ],
  },
  {
    slug: "litti-chokha",
    name: "Litti Chokha",
    region: "Boring Road · Patna",
    origin: "Bihar village kitchens, centuries old",
    blurb: "Sattu-stuffed dough balls roasted on coal, drowned in ghee, mashed brinjal on the side.",
    description:
      "Whole wheat dough stuffed with roasted sattu, lemon, green chilli and spices. Roasted on a coal sigri until black-spotted, then cracked open by hand and drenched in pure ghee. Chokha — fire-roasted brinjal, tomato and potato — mashed on the side.",
    photo: imgUrl("https://commons.wikimedia.org/wiki/Special:FilePath/Litti_chokha.jpg?auto=format&fit=crop&w=1200&q=70"),
    accent: "turmeric",
    tags: ["Roasted", "Traditional", "Vegetarian"],
    signature: "Boring Road, Patna",
    variations: [
      { city: "Patna", note: "The 'chokha' is mandatory. Without it, it's just litti." },
      { city: "Ranchi", note: "Often served with a tomato-onion salad." },
      { city: "Delhi", note: "Bihari mess versions use refined oil over ghee." },
    ],
  },
  {
    slug: "seekh-kebab",
    name: "Seekh Kebab",
    region: "Nizamuddin · Delhi",
    origin: "Mughal court kitchens, 16th century",
    blurb: "Minced mutton on skewers, charcoal-smoked, eaten with mint chutney and rumali roti.",
    description:
      "Finely minced mutton mixed with ginger, garlic, green chilli, garam masala and raw onion, moulded onto flat skewers. Cooked over a charcoal sigri until the fat smokes off and the outside is crusty. Served sizzling, no garnish needed.",
    photo: imgUrl("https://images.unsplash.com/photo-1705359573325-f2006d5e459f?auto=format&fit=crop&w=1200&q=70"),
    accent: "chilli",
    tags: ["Meaty", "Charcoal", "Mughlai"],
    signature: "Nizamuddin, Delhi",
    variations: [
      { city: "Delhi", note: "Served with rumali roti and green chutney." },
      { city: "Lucknow", note: "Galouti-style — finer mince, no skewer marks, melts." },
      { city: "Hyderabad", note: "Often served with a thin dal, as a meal." },
    ],
  },
  {
    slug: "mughlai-paratha",
    name: "Mughlai Paratha",
    region: "Kolkata · West Bengal",
    origin: "Anadi Cabin, Esplanade, 1923",
    blurb: "A stuffed flatbread the size of a small plate, fried crisp, cracked open, filled with egg and keema.",
    description:
      "A paratha the size of a dinner plate, stuffed with minced mutton, egg and onion, sealed and shallow-fried until blistery. Served whole; you break it open at the table and eat the steaming, fragrant inside with your hands.",
    photo: imgUrl("https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=70"),
    accent: "cobalt",
    tags: ["Meaty", "Sit-down", "Iconic"],
    signature: "Anadi Cabin, Kolkata",
    variations: [
      { city: "Kolkata", note: "Always with an egg cracked inside the stuffed paratha." },
      { city: "Dhaka", note: "Often served as a smaller, single-serve portion." },
      { city: "Patna", note: "Bihar-style version uses more onion, less spice." },
    ],
  },
];
