import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import PageContainer from "@/components/shared/PageContainer";

// TODO: apna gallery image links baad mein add karein
const galleryItems = [
  {
    image:
      // "https://images.unsplash.com/photo-1560264280-88b68371db39?w=900&q=80&auto=format&fit=crop",
      "",
    alt: "Volunteers planting tree saplings together",
    title: "Planting Hope",
    caption: "Spring plantation week — 600+ native saplings rooted",
  },
  {
    image:
      // "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=900&q=80&auto=format&fit=crop",
      "",
    alt: "Volunteers preparing food donation packages",
    title: "Giving Back",
    caption: "Monthly food bank packing for 500 households",
  },
  {
    image:
      // "https://images.unsplash.com/photo-1531554694-7ff75f003945?w=900&q=80&auto=format&fit=crop",
      "",
    alt: "Volunteers cleaning waste at a riverside park",
    title: "Cleaner Tomorrow",
    caption: "Lake belt cleanup — 840 kg of waste removed",
  },
  {
    image:
      // "https://images.unsplash.com/photo-1582213782179-e0d53f98f3ca?w=900&q=80&auto=format&fit=crop",
      "",
    alt: "Group of volunteers joining hands and working together",
    title: "Hands Together",
    caption: "Cross-community volunteer weekend camp",
  },
];

export default function GallerySection() {
  return (
    <section className="py-16 sm:py-20">
      <PageContainer>
        <SectionHeading
          eyebrow="Gallery"
          title="Moments From Our Community"
          subtitle="Snapshots of volunteers in action — gardens planted, wastelands cleaned and kindness packed by the box."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <figure
              key={item.title}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-4/5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <figcaption className="absolute right-0 bottom-0 left-0 p-4">
                <p className="text-base font-bold text-white">{item.title}</p>
                <p className="mt-0.5 text-xs text-white/80">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
