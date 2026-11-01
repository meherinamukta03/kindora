import { Event } from "@/types/event";
import EventCard from "@/components/events/EventCard";

/** Responsive grid of event cards, reused by the events pages and home. */
export default function EventGrid({ events }: { events: Event[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
