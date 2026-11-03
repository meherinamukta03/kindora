"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLeaf,
  faRecycle,
  faHandHoldingHeart,
  faGraduationCap,
  faHeartPulse,
  faLocationDot,
  faCalendarDays,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@/components/ui/Badge";
import ManageEventActions from "./ManageEventActions";
import type { Event, EventType } from "@/types/event";
import { useSession } from "@/lib/auth-client";


const typeIcons: Record<EventType, typeof faLeaf> = {
  Plantation: faLeaf,
  Cleanup: faRecycle,
  Donation: faHandHoldingHeart,
  Education: faGraduationCap,
  Health: faHeartPulse,
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

/** All events created by the signed-in organizer, shown as cards. */
export default function ManageEventsGrid() {

 
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    // Login থাকলে ওই user-এর নিজের event-গুলো backend থেকেই filter করে আসে
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_MAIN}/manage-events/${encodeURIComponent(user.email)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch your events");
        }

        const data: Event[] = await res.json();
        setEvents(data);
      } catch (error) {
        console.log("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [isPending, user]);

  if (isPending || loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center text-sm text-charcoal-soft">
        Loading your events…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[40vh] flex-col items-center justify-center gap-3 text-center text-sm text-charcoal-soft">
        <FontAwesomeIcon icon={faRightToBracket} className="h-6 w-6" />
        You need to log in to manage your events.
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-5 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:text-forest-light dark:hover:bg-forest-dark"
        >
          <FontAwesomeIcon icon={faRightToBracket} className="h-3.5 w-3.5" />
          Login
        </Link>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex h-[40vh] flex-col items-center justify-center gap-3 text-center text-sm text-charcoal-soft">
        <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
        You haven&apos;t created any events yet.
        <Link
          href="/create-event"
          className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-5 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:text-forest-light dark:hover:bg-forest-dark"
        >
          Create your first event
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Count row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-shadow-black">
          <FontAwesomeIcon icon={faUsers} className="h-4 w-4  text-shadow-black" />
          You have published {events.length}{" "}
          {events.length === 1 ? "event" : "events"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <article
            key={event._id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Cover */}
            <div className="relative aspect-16/10 overflow-hidden">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              ) : null}

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 shadow-sm dark:bg-white/90 dark:text-forest">
                  <FontAwesomeIcon
                    icon={typeIcons[event.category] || faLeaf}
                    className="h-3 w-3"
                  />
                  {event.category}
                </Badge>
              </div>

              {/* Date badge */}
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold text-charcoal shadow-sm">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="h-3 w-3 text-forest"
                  />
                  {formatDate(event.date)}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 line-clamp-1 text-lg font-bold text-charcoal transition-colors group-hover:text-forest dark:text-charcoal">
                {event.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-charcoal-soft">
                {event.description}
              </p>

              <p className="mb-4 flex items-center gap-2 text-sm text-charcoal-soft">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="h-3.5 w-3.5 shrink-0 text-forest dark:text-forest-light"
                />
                <span className="line-clamp-1">{event.location}</span>
              </p>

              {/* Actions */}
              <div className="mt-auto flex justify-end border-t border-border pt-4">
                <ManageEventActions event={event} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
