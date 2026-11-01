import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faLeaf,
  faRecycle,
  faHandHoldingHeart,
  faGraduationCap,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@/components/ui/Badge";
import ManageEventActions from "./ManageEventActions";
import { managedEvents } from "@/lib/sample-events";
import { EventType } from "@/types/event";

const typeIcons: Record<EventType, typeof faLeaf> = {
  Plantation: faLeaf,
  Cleanup: faRecycle,
  Donation: faHandHoldingHeart,
  Education: faGraduationCap,
  Health: faHeartPulse,
};

/** Row-based list of events you have created, with demo edit/delete actions. */
export default function ManageEventsTable() {
  return (
    <div className="space-y-4">
      {managedEvents.map((event) => (
        <article
          key={event.id}
          className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-center"
        >
          {/* Thumbnail */}
          <Link
            href={`/events/${event.id}`}
            className="relative block h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32"
          >
            {event.image ? (
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 640px) 128px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
          </Link>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="mb-1.5">
              <Badge>
                <FontAwesomeIcon icon={typeIcons[event.type]} className="h-3 w-3" />
                {event.type}
              </Badge>
            </div>
            <Link
              href={`/events/${event.id}`}
              className="line-clamp-1 font-bold text-charcoal transition-colors hover:text-forest dark:text-charcoal"
            >
              {event.title}
            </Link>
            <ul className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-charcoal-soft">
              <li className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3 text-accent" />
                {event.date}
              </li>
              <li className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-accent" />
                <span className="line-clamp-1">{event.location}</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <ManageEventActions event={event} />
        </article>
      ))}
    </div>
  );
}
