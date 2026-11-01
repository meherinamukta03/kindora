"use client";

import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Event } from "@/types/event";

/** Demo-only Edit/Delete controls for the Manage Events table. */
export default function ManageEventActions({ event }: { event: Event }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toast.success(`Ready to edit "${event.title}" (demo only)`);
        }}
        aria-label={`Edit ${event.title}`}
        title="Edit event"
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-charcoal-soft transition-colors hover:border-forest hover:text-forest"
      >
        <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toast.success(`"${event.title}" deleted (demo only)`);
        }}
        aria-label={`Delete ${event.title}`}
        title="Delete event"
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-charcoal-soft transition-colors hover:border-red-500 hover:text-red-600"
      >
        <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
