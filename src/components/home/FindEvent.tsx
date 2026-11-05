"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faMagnifyingGlass,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import PageContainer from "@/components/shared/PageContainer";
import { Button } from "@/components/ui/Button";

interface Event {
  _id: string;
  title: string;
  description?: string;
  location: string;
  date?: string;
  image?: string;
}

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

    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl);

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data: Event[] = await response.json();

    console.log("Fetched Events:", data);

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
                onChange={(e) => setCity(e.target.value)}
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
                <div className="grid gap-6 sm:grid-cols-2">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      {event.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <h4 className="text-lg font-bold text-forest">
                          {event.title}
                        </h4>

                        {event.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-charcoal-soft">
                            {event.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-charcoal-soft">
                          <span>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="mr-2 text-forest"
                            />
                            {event.location}
                          </span>

                          {event.date && (
                            <span>
                              <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="mr-2 text-forest"
                              />
                              {event.date}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/upcoming-events/${event._id}`}
                          className="mt-5 inline-block font-semibold text-forest hover:underline"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </PageContainer>
    </section>
  );
}