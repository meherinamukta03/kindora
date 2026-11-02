"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import PageContainer from "@/components/shared/PageContainer";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types/event";

const categories = [
  "All",
  "Plantation",
  "Cleanup",
  "Donation",
  "Education",
  "Health",
];

export default function UpcomingEventsPage() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`
        );

        const data = await events.json();
        setEventData(data);
      } catch (error) {
        console.log("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? eventData
      : eventData.filter(
          (event) => event.category === selectedCategory
        );

  return (
    <>
      <PageHeader
        eyebrow="Volunteer Opportunities"
        title="Upcoming Events"
        subtitle="Browse every community event on the Kindora calendar — plantations, cleanups, donation drives and more. Pick a cause and join in."
      />

      <PageContainer className="py-14 sm:py-16">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-forest text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-green-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Event Count */}
        <p className="mb-6 text-base font-semibold text-charcoal-soft dark:text-charcoal-soft">
          Showing {filteredEvents.length} upcoming community events
        </p>

        {/* Event Cards */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-gray-500">
            No events found in this category.
          </p>
        )}
      </PageContainer>
    </>
  );
}