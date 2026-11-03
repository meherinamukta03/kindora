
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocationDot } from "@fortawesome/free-solid-svg-icons";


import SectionHeading from "@/components/shared/SectionHeading";
import PageContainer from "@/components/shared/PageContainer";
import Image from "next/image";
import { Button } from "../ui/Button";

interface Event {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  category: string;
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URI}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        console.log("Frontend Events:", data.length);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="bg-cream-dark/40 py-16 sm:py-20 dark:bg-cream-dark/20">
      <PageContainer>
        <SectionHeading
          eyebrow="What's Ahead"
          title="Recent Upcoming Events"
          subtitle="Fresh opportunities to serve — pick one that speaks to you and show up."
        />

        {loading ? (
          <p className="mt-10 text-center">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="mt-10 text-center">
            No upcoming events available right now.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest dark:text-forest-light">
                    {event.category}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-charcoal dark:text-charcoal">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-charcoal-soft dark:text-charcoal-soft">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-charcoal-soft">
                    <p>
                      <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </p>

                    <p>
                      <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                      {event.location}
                    </p>
                  </div>

                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="mt-5 inline-block font-semibold text-forest hover:underline dark:text-forest-light"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </PageContainer>
    </section>
  );
}
