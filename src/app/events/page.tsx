import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faEye,
    faPenToSquare,
    faTrashCan,
    faCalendarDays,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import PageContainer from "@/components/shared/PageContainer";
import Image from "next/image";

interface Event {
    _id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    description: string;
    image: string;
}

// API থেকে events data আসবে
const events: Event[] = [];

export default function ManagePage() {
    return (
        <PageContainer className="py-14 sm:py-16">
            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">
                            Organizer Dashboard
                        </p>

                        <h1 className="text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
                            Your Events, Your Impact
                        </h1>

                        <div className="mt-3 h-1 w-16 rounded-full bg-accent" />

                        <p className="mt-4 max-w-xl text-base text-charcoal-soft">
                            Keep your community initiatives organized. Track, update and
                            manage the events you have brought to life.
                        </p>
                    </div>

                    <Link
                        href="/create-event"
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Organize an Event
                    </Link>
                </div>

                {/* Events Section */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-charcoal">
                        Your Initiatives
                    </h2>

                    <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                        {events.length} Events
                    </span>
                </div>

                {/* Event Cards */}
                {events.length > 0 ? (
                    <div className="grid gap-7 md:grid-cols-2">

                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
                            >
                                {/* Event Image */}
                                <div className="h-52 overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Event Information */}
                                <div className="p-5 sm:p-6">
                                    <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                        {event.category}
                                    </span>

                                    <h3 className="mt-4 text-xl font-bold text-charcoal">
                                        {event.title}
                                    </h3>

                                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-charcoal-soft">
                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            {event.date}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {event.location}
                                        </span>
                                    </div>

                                    <div className="my-4 border-t border-border" />

                                    <p className="text-sm leading-6 text-charcoal-soft">
                                        {event.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-5 grid grid-cols-3 gap-3">
                                        <Link
                                            href={`/manage-events/${event._id}`}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 px-2 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                            View
                                        </Link>

                                        <Link
                                            href={`/manage-events/${event._id}/edit`}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 px-2 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-2 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                ) : (
                    /* Empty State */
                    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="text-2xl text-accent"
                            />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-charcoal">
                            No Events Created Yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm text-charcoal-soft">
                            You havenot organized any events yet. Start your first
                            community initiative and make a positive impact.
                        </p>
                        <Link
                            href="/create-event"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-95"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Create Your First Event
                        </Link>
                    </div>
                )}

            </div>
        </PageContainer>
    );
}