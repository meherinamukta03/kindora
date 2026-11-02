import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays, faLeaf, faRecycle, faHandHoldingHeart, faGraduationCap, faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { Event, EventType } from "@/types/event";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const typeIcons: Record<EventType, typeof faLeaf> = {
  Plantation: faLeaf,
  Cleanup: faRecycle,
  Donation: faHandHoldingHeart,
  Education: faGraduationCap,
  Health: faHeartPulse,
};

/** Card used on Home, Upcoming Events and Joined Events grids. */
export default function EventCard({ event }: { event: Event }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover image */}
      <div className="relative aspect-16/10 overflow-hidden">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 shadow-sm dark:bg-white/90 dark:text-forest">

            <FontAwesomeIcon
              icon={typeIcons[event.category] || faLeaf}
              className="h-3 w-3"
            />
            {event.category}

          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2.5 line-clamp-2 text-lg font-bold text-charcoal transition-colors group-hover:text-forest dark:text-charcoal">
          {event.title}
        </h3>

        <ul className="mb-4 space-y-1.5 text-sm text-charcoal-soft">
          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="h-3.5 w-3.5 shrink-0 text-forest dark:text-forest-light"
            />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="h-3.5 w-3.5 shrink-0 text-forest dark:text-forest-light"
            />
            <span>{event.date}</span>
          </li>
        </ul>

        <Link
          href={`/upcoming-events/${event._id}`}
          className="mt-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-forest px-5 py-2 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest hover:text-white dark:text-forest-light dark:hover:bg-forest-dark"
        >
          View Details
        </Link> 
      </div>
    </article>
  );
}
