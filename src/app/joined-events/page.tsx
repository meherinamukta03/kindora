"use client";

import { useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMapMarkerAlt,
  faArrowRight,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";

import { useSession,authClient } from "@/lib/auth-client";

type JoinedEvent = {
  _id?: string;
  eventId?: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  category: string;
  userEmail: string;
};

export default function JoinedEventsPage() {
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }



    const fetchJoinedEvents = async () => {


const {data,error}=await authClient.token()
const token=data?.token
console.log(token)








      try {
        setLoading(true);
        setError("");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_MAIN}/joined-events/${encodeURIComponent(userEmail)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


        if (!response.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load your joined events.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [userEmail, isPending]);

  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-forest font-medium">Loading your events...</p>
      </main>
    );
  }

  if (!userEmail) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-charcoal dark:text-white">
          Please Login
        </h1>
        <p className="text-charcoal-soft">
          Login to see the events you have joined.
        </p>
        <Link
          href="/login"
          className="rounded-lg bg-forest px-6 py-3 font-semibold text-white hover:bg-forest-dark"
        >
          Login Now
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    
        <div className="mb-10">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-forest">
            <FontAwesomeIcon icon={faTicket} />
            Your Event Commitments
          </p>

          <h1 className="text-3xl font-bold text-charcoal dark:text-white sm:text-4xl">
            Joined Events
          </h1>

          <p className="mt-3 max-w-2xl text-charcoal-soft">
            Here are the social development and community service events
            you have signed up for. We look forward to seeing you there!
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
              <FontAwesomeIcon icon={faTicket} className="text-2xl" />
            </div>

            <h2 className="text-xl font-bold text-charcoal dark:text-white">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-charcoal-soft">
              You have not joined any events yet. Explore upcoming events
              and find something meaningful to participate in.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-forest px-6 py-3 font-semibold text-white transition hover:bg-forest-dark"
            >
              Explore Events
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        )}

        {/* Joined Events */}
        {!error && events.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal dark:text-white">
                Your Events
              </h2>

              <span className="rounded-full bg-forest/10 px-4 py-2 text-sm font-semibold text-forest">
                {events.length} {events.length === 1 ? "Event" : "Events"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => {
                const eventId = event.eventId || event._id;

                return (
                  <article
                    key={eventId || index}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Event Image */}
                    <div className="relative h-52 w-full bg-muted">
                      {event.image && (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest">
                        {event.category}
                      </span>

                      <span className="absolute right-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white">
                        Joined
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-5">
                      <h3 className="mb-3 text-xl font-bold text-charcoal dark:text-white">
                        {event.title}
                      </h3>

                      <div className="mb-4 space-y-2 text-sm text-charcoal-soft">
                        <p className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="text-forest"
                          />
                          {event.date}
                        </p>

                        <p className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="text-forest"
                          />
                          {event.location}
                        </p>
                      </div>

                      <p className="mb-5 line-clamp-2 text-sm leading-6 text-charcoal-soft">
                        {event.description}
                      </p>

                      {eventId && (
                        <Link
                          href={`/upcoming-events/${eventId}`}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
                        >
                          View Event
                          <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}