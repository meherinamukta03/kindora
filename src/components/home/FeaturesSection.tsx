import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faUsers,
  faClipboardList,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/shared/SectionHeading";
import PageContainer from "@/components/shared/PageContainer";

const features = [
  {
    icon: faCirclePlus,
    title: "Create Events",
    description:
      "Set up a plantation drive, cleanup mission or donation camp in minutes and share it with your community.",
  },
  {
    icon: faUsers,
    title: "Join Community Activities",
    description:
      "Browse events near you and sign up to volunteer alongside neighbors who care about the same causes.",
  },
  {
    icon: faClipboardList,
    title: "Track Your Participation",
    description:
      "Keep every event you've joined in one place — dates, locations and impact you made each time.",
  },
  {
    icon: faLeaf,
    title: "Make a Positive Impact",
    description:
      "Every event page shows what your effort achieves, from trees planted to meals packed per session.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20">
      <PageContainer>
        <SectionHeading
          eyebrow="Why Kindora"
          title="Everything You Need to Give Back"
          subtitle="From starting an event to celebrating its impact, Kindora keeps the focus on the service — not the paperwork."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white dark:bg-forest/20 dark:text-forest-light">
                <FontAwesomeIcon icon={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-charcoal dark:text-charcoal">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal-soft dark:text-charcoal-soft">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
