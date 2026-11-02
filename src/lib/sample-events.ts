import { Event } from "@/types/event";

/**
 * Static sample events for UI demonstration only.
 * No backend, no fetching — pure display data.
 */
export const sampleEvents: Event[] = [
  {
    _id: "spring-tree-plantation-drive",
    title: "Spring Tree Plantation Drive",
    description:
      "Join us for a morning of planting native tree saplings across City Park's eastern trail. We'll provide gloves, tools and saplings — you bring the enthusiasm. Every volunteer plants at least three trees, and each sapling is geo-tagged so you can revisit your tree years later and watch it grow. A short orientation on planting technique starts the day, followed by group planting in teams of four.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Plantation",
    location: "City Park, Badshahi Road, Lahore",
    date: "March 14, 2027 · 9:00 AM",
    organizer: "Amna Raza",
    organizerTitle: "Green Spaces Lead, Kindora",
    contactEmail: "amna@kindora.org",
  },
  {
    _id: "riverside-cleanup-mission",
    title: "Riverside Cleanup Mission",
    description:
      "Our quarterly drive to clear plastic waste and debris from the canal-side walking track. Volunteers work in shift teams with sorting bags so recyclables are separated on the spot. Last season we removed 840 kg of waste in a single weekend — this time we're aiming higher. Sturdy shoes and a refillable water bottle recommended; refreshments are on us.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1618477385954-c782314aae27?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Cleanup",
    location: "Canal Walking Track, Model Town, Lahore",
    date: "March 21, 2027 · 7:30 AM",
    organizer: "Danish Iqbal",
    organizerTitle: "Clean Communities Coordinator",
    contactEmail: "danish@kindora.org",
  },
  {
    _id: "winter-warmth-clothing-drive",
    title: "Winter Warmth Clothing Drive",
    description:
      "Help us collect, sort and distribute winter clothing to families in low-income neighbourhoods before the coldest weeks arrive. Volunteers sort donations by size and age group at our community hall, then join distribution teams visiting three partner shelters. Warm jackets, blankets and new socks are the most needed items this season.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Donation",
    location: "Kindora Community Hall, Gulberg III, Lahore",
    date: "March 28, 2027 · 10:00 AM",
    organizer: "Sana Mir",
    organizerTitle: "Donation Program Manager",
    contactEmail: "sana@kindora.org",
  },
  {
    _id: "saturday-tutoring-circle",
    title: "Saturday Tutoring Circle",
    description:
      "A weekly learning circle where volunteers coach primary school students in reading, maths and science. No teaching experience required — we pair each volunteer with two students and provide a simple lesson plan. The hour ends with a shared story-reading session that the kids pick themselves. Commit to one Saturday or come every week.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Education",
    location: "Beacon Community Library, Johar Town, Lahore",
    date: "April 4, 2027 · 4:00 PM",
    organizer: "Hira Sheikh",
    organizerTitle: "Education Outreach Lead",
    contactEmail: "hira@kindora.org",
  },
  {
    _id: "free-health-screening-camp",
    title: "Free Community Health Screening Camp",
    description:
      "Doctors, nurses and general volunteers team up for a free health screening day offering blood pressure, blood sugar and vision checks for uninsured residents. Non-medical volunteers handle registration, guidance and translation for elderly visitors. Every resident receives a printed health summary and referrals where needed.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Health",
    location: "Al-Noor Community Center, Township, Lahore",
    date: "April 11, 2027 · 9:00 AM",
    organizer: "Dr. Bilal Ahmed",
    organizerTitle: "Health Camp Director",
    contactEmail: "bilal@kindora.org",
  },
  {
    _id: "urban-beach-park-cleanup",
    title: "Urban Lake Park Cleanup",
    description:
      "A family-friendly cleanup morning around Ethan Lake's picnic belt. We supply litter pickers, gloves and waste bags for all ages — children under 12 join with a guardian. The session closes with a picnic and a short talk on how lake litter affects migratory birds that nest here every spring.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1567264265447-2f5432ab5b09?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Cleanup",
    location: "Ethan Lake Park, DHA Phase 6, Lahore",
    date: "April 18, 2027 · 8:00 AM",
    organizer: "Danish Iqbal",
    organizerTitle: "Clean Communities Coordinator",
    contactEmail: "danish@kindora.org",
  },
  {
    _id: "rooftop-kitchen-garden-drive",
    title: "Rooftop Kitchen Garden Drive",
    description:
      "We're turning underused rooftops into micro kitchen gardens for neighbourhood families. Volunteers build planter boxes, mix soil beds and transplant herb seedlings. Each donated rooftop produces fresh vegetables for the household that hosts it, and surplus harvest is shared with the street's elderly residents.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Plantation",
    location: "Shalimar Colony, Multan Road, Lahore",
    date: "April 25, 2027 · 3:30 PM",
    organizer: "Amna Raza",
    organizerTitle: "Green Spaces Lead, Kindora",
    contactEmail: "amna@kindora.org",
  },
  {
    _id: "community-food-bank-day",
    title: "Community Food Bank Packing Day",
    description:
      "A high-energy packing session where volunteer lines fill grocery kits with rice, lentils, oil and flour for 500 registered households. The warehouse runs like an assembly line with music on, roles rotating hourly so nobody gets stuck at one station. Great for first-time volunteers and school groups.",
    image:
      // TODO: apna image link baad mein add karein, e.g.
      // "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80&auto=format&fit=crop"
      "",
    category: "Donation",
    location: "Kindora Central Warehouse, Kot Lakhpat, Lahore",
    date: "May 2, 2027 · 11:00 AM",
    organizer: "Sana Mir",
    organizerTitle: "Donation Program Manager",
    contactEmail: "sana@kindora.org",
  },
];

/** The six events shown on the Home page. */
export const featuredEvents: Event[] = sampleEvents.slice(0, 6);

/** Events marked as "joined" for the Joined Events demo page. */
export const joinedEvents: Event[] = [
  sampleEvents[0],
  sampleEvents[2],
  sampleEvents[3],
  sampleEvents[5],
];

/** Events shown in the Manage Events dashboard. */
export const managedEvents: Event[] = sampleEvents.slice(0, 5);

export function getEventById(id: string): Event | undefined {
  return sampleEvents.find((event) => event._id === id);
}
