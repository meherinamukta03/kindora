
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
      "Create community events such as tree plantations, neighborhood cleanups, donation drives and educational activities.",
  },
  {
    icon: faUsers,
    title: "Join Community Activities",
    description:
      "Explore upcoming events and join meaningful activities with volunteers who want to make a difference.",
  },
  {
    icon: faClipboardList,
    title: "Manage Your Participation",
    description:
      "View your joined events in one place and keep track of event details, dates and locations.",
  },
  {
    icon: faLeaf,
    title: "Support Social Development",
    description:
      "Contribute your time and effort to meaningful community activities and help build a better environment for everyone.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 text-black">
      <PageContainer>
        <SectionHeading
          eyebrow="Why Kindora"
          title="Everything You Need to Give Back"
          subtitle="From creating events to joining community activities, Kindora makes volunteering easier and brings people together for positive change."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
            
            className="group rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-3 hover:border-forest hover:shadow-xl dark:hover:border-forest-light">
              {/* Feature Icon */}
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white dark:bg-forest/20 dark:text-forest-light">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="h-5 w-5"
                />
              </span>

              {/* Feature Title */}
              <h3 className="mb-2 text-lg font-bold text-charcoal dark:text-charcoal">
                {feature.title}
              </h3>

              {/* Feature Description */}
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
