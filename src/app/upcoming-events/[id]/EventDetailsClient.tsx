
"use client";

import { useEffect, useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SERVER = process.env.NEXT_PUBLIC_SERVER_BASE_URL_MAIN;
const JOIN_URL = `${SERVER}/upcomingEvent/joined`;

import {
  MapPin,
  CalendarDays,
  Users,
  Heart,
  CheckCircle2,
  LogOut,
  Tag,
  Leaf,
  Clock,
  HandHeart,
  ArrowRight,
} from "lucide-react";

import type { Event } from "@/types/event";
import Image from "next/image";

const EventDetailsClient = ({ event }: { event: Event }) => {
  const [joined, setJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Archive: check on load whether the logged-in user already joined this event
  useEffect(() => {
    if (isPending || !user) return;

    const checkJoined = async () => {
      try {
        // /joined-events/:email এখন verifyToken-protected — JWT লাগবে
        const { data, error } = await authClient.token();
        if (error || !data?.token) return;

        const res = await fetch(
          `${SERVER}/joined-events/${encodeURIComponent(user.email)}`,
          { headers: { Authorization: `Bearer ${data.token}` } }
        );
        if (!res.ok) return;

        const list = await res.json();
        const eventId = event.eventId || event._id;
        setJoined(list.some((j: { eventId?: string; _id?: string }) =>
          j.eventId === eventId || j._id === eventId
        ));
      } catch {
        // Status check failing should not block the page — leave as join-ready.
      }
    };

    checkJoined();
  }, [isPending, user, event._id, event.eventId]);

  // Join Event
  const handleJoin = async () => {
    if (isPending || isJoining) return;

    // Login না থাকলে toast দেখাবে
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      setIsJoining(true);

      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const res = await fetch(JOIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          ...event,
          userEmail: user.email,
        }),
      });

      if (res.ok) {
        setJoined(true);
        toast.success("Successfully joined the event!");
      } else {
        toast.error("Failed to join the event. Please try again.");
      }
    } catch (error) {
      console.error("Join event error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  // Leave Event — actually deletes the joined record on the backend
  const handleLeave = async () => {
    if (!user || isJoining) return;

    try {
      setIsJoining(true);

      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const res = await fetch(
        `${JOIN_URL}?userEmail=${encodeURIComponent(user.email)}&eventId=${encodeURIComponent(
          event._id
        )}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );

      if (res.ok) {
        setJoined(false);
        toast.success("You have left the event.");
      } else {
        toast.error("Failed to leave the event. Please try again.");
      }
    } catch (error) {
      console.error("Leave event error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const formattedDate = new Date(
    `${event.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const today = new Date().toLocaleDateString("en-CA");
  const isUpcoming = event.date >= today;

  return (
    <main className="min-h-screen bg-[#f6f9f6] dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        {/* Hero Section */}
        <section className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl group">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={480}
            priority
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

          {/* Category */}
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-green-700 shadow-lg">
              <Tag size={16} />
              {event.category}
            </span>
          </div>

          {/* Event Status */}
          <div className="absolute top-6 right-6">
            <span
              className={`rounded-full px-4 py-2 text-xs font-bold backdrop-blur-md ${isUpcoming
                  ? "bg-green-500/90 text-white"
                  : "bg-gray-700/90 text-white"
                }`}
            >
              {isUpcoming ? "UPCOMING EVENT" : "COMPLETED"}
            </span>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <p className="text-green-300 text-sm font-semibold uppercase tracking-[3px] mb-3">
              Make a Difference
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 max-w-3xl">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-4 md:gap-7 text-sm md:text-base text-gray-200">
              <p className="flex items-center gap-2">
                <MapPin size={19} className="text-green-400" />
                {event.location}
              </p>

              <p className="flex items-center gap-2">
                <CalendarDays size={19} className="text-green-400" />
                {formattedDate}
              </p>
            </div>
          </div>
        </section>

        {/* Volunteer Participation */}
        <section className="mt-8 rounded-2xl border border-green-100 dark:border-green-900/40 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 shrink-0">
                <Users size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Volunteer Participation
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {joined
                    ? "You have joined this event. Thank you for volunteering!"
                    : "Be part of something meaningful. Join this initiative today."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {joined ? (
                <>
                  <button
                    disabled
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-semibold"
                  >
                    <CheckCircle2 size={19} />
                    Joined
                  </button>

                  <button
                    onClick={handleLeave}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  >
                    <LogOut size={18} />
                    Leave Event
                  </button>
                </>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={isPending || isJoining || !isUpcoming}
                  className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-green-700 text-white font-semibold shadow-lg shadow-green-700/20 hover:bg-green-800 hover:-translate-y-0.5 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Heart size={19} />

                  {isPending
                    ? "Loading..."
                    : isJoining
                      ? "Joining..."
                      : isUpcoming
                        ? "Join Event"
                        : "Event Completed"}

                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          <section className="md:col-span-2">

            {/* About Initiative */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">
                  <Leaf size={23} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    About This Initiative
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Together, we can create positive change.
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-8 whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Volunteer Guidelines */}
            <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">
                  <HandHeart size={23} />
                </div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Volunteer Guidelines
                </h2>
              </div>

              <ul className="space-y-5 text-gray-600 dark:text-gray-300">
                {[
                  "Please arrive at the designated location on time.",
                  "Follow the event organizers' instructions.",
                  "Respect other volunteers and work together.",
                  "Help maintain a safe and friendly environment.",
                ].map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-green-600 shrink-0 mt-0.5"
                    />
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Event Information */}
          <aside className="h-fit bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-7 shadow-sm">

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-7">
              Event Information
            </h2>

            <div className="space-y-7">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                  <Tag size={19} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {event.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Event Date</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                  <Clock size={19} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Event Status</p>
                  <p
                    className={`font-semibold ${isUpcoming
                        ? "text-green-700 dark:text-green-400"
                        : "text-gray-500"
                      }`}
                  >
                    {isUpcoming ? "Upcoming" : "Completed"}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 p-5 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900/40">
              <Heart size={22} className="text-green-700 dark:text-green-400 mb-3" />

              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                Small Actions, Big Impact
              </h3>

              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                Your participation can help build a better community.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsClient;
