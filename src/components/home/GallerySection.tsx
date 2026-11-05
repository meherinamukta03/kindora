import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import PageContainer from "@/components/shared/PageContainer";

// TODO: apna gallery image links baad mein add karein
const galleryItems = [
  {
    image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MUOWzY_4uzQkAsd_1x8oOIT_B7UPq00VczRXwnwojelsg0cnAC7s5w&s=10",
      
    alt: "Volunteers planting tree saplings together",
    title: "Planting Hope",
    caption: "Spring plantation week — 600+ native saplings rooted",
  },
  {
    image:
      "https://images.stockcake.com/public/b/f/5/bf52298d-8c41-46c6-bed4-334fe08d67da_large/volunteers-packing-food-stockcake.jpg",
      
    alt: "Volunteers preparing food donation packages",
    title: "Giving Back",
    caption: "Monthly food bank packing for 500 households",
  },
  {
    image:
      " https://thumbs.dreamstime.com/b/kpps-voting-organizing-group-planting-trees-kpps-voting-organizing-group-planting-trees-inauguration-305832748.jpg",
      
    alt: "Volunteers cleaning waste at a riverside park",
    title: "Cleaner Tomorrow",
    caption: "Lake belt cleanup — 840 kg of waste removed",
  },
  {
    image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlRcMI9WAjAAVVTGninYWMb4z-icykk4HLvmagYkG64Q&s=10",
      
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
          title="Explore Our Community Gallery"
          subtitle="Discover inspiring moments of volunteers working together to create positive changes in their communities."
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
