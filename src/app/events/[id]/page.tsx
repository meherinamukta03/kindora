import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faArrowLeft,
  faEnvelope,
  faCircleUser,
  faLeaf,
  faRecycle,
  faHandHoldingHeart,
  faGraduationCap,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import PageContainer from "@/components/shared/PageContainer";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import JoinEventButton from "@/components/events/JoinEventButton";
import { EventType } from "@/types/event";
import { getEventById, sampleEvents } from "@/lib/sample-events";

const typeIcons: Record<EventType, typeof faLeaf> = {
  Plantation: faLeaf,
  Cleanup: faRecycle,
  Donation: faHandHoldingHeart,
  Education: faGraduationCap,
  Health: faHeartPulse,
};

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return sampleEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Event Not Found — Kindora" };
  return { title: `${event.title} — Kindora`, description: event.description };
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(id);

  // Friendly static not-found state for unknown ids.
  if (!event) {
    return (
      <PageContainer className="py-24 text-center">
        <p className="mb-3 text-sm font-bold tracking-widest text-accent uppercase">
          Event Not Found
        </p>
        <h1 className="text-3xl font-extrabold text-charcoal sm:text-4xl">
          This event isn&apos;t on our calendar
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-charcoal-soft">
          The event you&apos;re looking for may have ended or the link is
          incorrect. Browse our upcoming community events instead.
        </p>
        <div className="mt-8">
          <Button href="/upcoming-events" variant="primary" size="md">
            Back to Upcoming Events
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      {/* Cover image */}
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-10">
          <div className="mx-auto w-full max-w-6xl">
            <Badge className="mb-3 bg-white/90 shadow-sm dark:bg-white/90 dark:text-forest">
              <FontAwesomeIcon icon={typeIcons[event.category]} className="h-3 w-3" />
              {event.category}
            </Badge>
            <h1 className="max-w-3xl text-2xl font-extrabold text-white sm:text-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <PageContainer className="py-12 sm:py-14">
        <div className="mb-8">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-accent dark:text-forest-light"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
            Back to all events
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-2xl font-bold text-charcoal dark:text-charcoal">
              About This Event
            </h2>
            <p className="text-base leading-relaxed text-charcoal-soft dark:text-charcoal-soft">
              {event.description}
            </p>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-5 text-lg font-bold text-charcoal dark:text-charcoal">
              Event Information
            </h2>

            <ul className="space-y-4 border-b border-border pb-5 text-sm">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCalendarDays} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="font-bold text-charcoal">Date &amp; Time</p>
                  <p className="mt-0.5 text-charcoal-soft">{event.date}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="font-bold text-charcoal">Location</p>
                  <p className="mt-0.5 text-charcoal-soft">{event.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLeaf} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="font-bold text-charcoal">Event Type</p>
                  <p className="mt-0.5 text-charcoal-soft">{event.type}</p>
                </div>
              </li>
            </ul>

            {/* Organizer */}
            <div className="mt-5 flex items-start gap-3 border-b border-border pb-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light">
                <FontAwesomeIcon icon={faCircleUser} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-charcoal">{event.organizer}</p>
                <p className="text-xs text-charcoal-soft">{event.organizerTitle}</p>
                <a
                  href={`mailto:${event.contactEmail}`}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-accent dark:text-forest-light"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
                  {event.contactEmail}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <JoinEventButton />
            </div>
          </aside>
        </div>
      </PageContainer>
    </>
  );
}
