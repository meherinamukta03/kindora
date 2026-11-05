"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import PageContainer from "@/components/shared/PageContainer";
import { Button } from "@/components/ui/Button";
import EventCard from "@/components/events/EventCard";
import { Event } from "@/types/event";

const cities = [
  "Cumilla",
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

export default function FindEventsNearYou() {
  const [city, setCity] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleFindEvents = async () => {
    if (!city) {
      toast.error("Please select your city.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setEvents([]);

      const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_MAIN}/events-by-city/${encodeURIComponent(city)}`;

      const response = await fetch(apiUrl, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data: Event[] = await response.json();

      setEvents(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Could not find events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20">
      <PageContainer>
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-forest">
              <FontAwesomeIcon icon={faLocationDot} />
            </span>

            <h2 className="text-3xl font-extrabold text-forest sm:text-4xl">
              Find Events Near You
            </h2>

            <p className="mt-3 text-charcoal-soft">
              Discover volunteering opportunities in your city.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col gap-3 rounded-2xl border border-forest/10 bg-white p-4 shadow-sm sm:flex-row">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-forest"
              />

              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSearched(false);
                  setEvents([]);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-charcoal outline-none focus:border-forest"
              >
                <option value="">Select your city</option>

                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleFindEvents}
              disabled={loading}
              className="shrink-0"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="mr-2"
              />
              {loading ? "Searching..." : "Find Events"}
            </Button>
          </div>

          {/* Search Results */}
          {loading && (
            <p className="mt-10 text-center text-charcoal-soft">
              Searching events...
            </p>
          )}

          {searched && !loading && (
            <div className="mt-10">
              <h3 className="mb-5 text-xl font-bold text-forest">
                Events in {city}
              </h3>

              {events.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 px-5 py-12 text-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="mb-4 text-3xl text-gray-400"
                  />

                  <h4 className="font-bold text-charcoal">
                    No events found
                  </h4>

                  <p className="mt-2 text-sm text-charcoal-soft">
                    There are currently no events available in {city}.
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-5 text-sm text-charcoal-soft">
                    {events.length} events found in {city}
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {events.map((event) => (
                      <EventCard
                        key={event._id}
                        event={event}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
} 