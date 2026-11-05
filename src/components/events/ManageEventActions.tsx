"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCalendarDays,
  faImage,
  faMapMarkerAlt,
  faTag,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";
import type { Event } from "@/types/event";
import { Input } from "@base-ui/react";
import { authClient } from "@/lib/auth-client";

export default function ManageEventActions({
  event,
}: {
  event: Event;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    image: event.image,
    location: event.location,
    date: event.date,
    category: event.category,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /** verifyToken-protected routes-এর জন্য Bearer token আনে (manage grid-এর pattern) */
  const getBearerToken = async () => {
    const { data, error } = await authClient.token();
    if (error || !data?.token) return null;
    return { Authorization: `Bearer ${data.token}` };
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const tokenHeaders = await getBearerToken();
      if (!tokenHeaders) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...tokenHeaders,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      toast.success("Event updated successfully!");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const tokenHeaders = await getBearerToken();
      if (!tokenHeaders) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${event._id}`,
        { method: "DELETE", headers: tokenHeaders }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast.success("Event deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Edit Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Edit ${event.title}`}
          title="Edit event"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-charcoal-soft transition-colors hover:border-forest hover:text-forest"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>

        {/* Delete Button + Confirmation Dialog */}
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <button
                type="button"
                disabled={deleting}
                aria-label={`Delete ${event.title}`}
                title="Delete event"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-charcoal-soft transition-colors hover:border-red-500 hover:text-red-600 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            }
          />

          <AlertDialogContent className="max-w-[400px] rounded-2xl">
            <AlertDialogHeader>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="text-2xl"
                />
              </div>

              <AlertDialogTitle className="text-center text-xl">
                Delete Event?
              </AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to delete {event.title}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-4 flex-row justify-center gap-3 sm:justify-center">
              <AlertDialogCancel className="mt-0">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-h-[90vh] max-w-[700px] overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
          <DialogHeader className="mb-5 border-b border-border pb-5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-xl"
              />
            </div>

            <DialogTitle className="text-2xl font-bold text-charcoal dark:text-white">
              Edit Event
            </DialogTitle>

            <DialogDescription className="text-sm text-charcoal-soft">
              Update your event details and keep your community informed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-forest">
                Event Information
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Event Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-forest"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faTag} className="text-forest" />
                    Category
                  </label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-forest"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-forest"
                    />
                    Event Date
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-forest"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-forest"
                    />
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-forest"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Event Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm outline-none transition-colors focus:border-forest"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FontAwesomeIcon icon={faImage} className="text-forest" />
                Event Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-forest"
              />
            </div>

            <DialogFooter className="gap-3 border-t border-border pt-5 sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-forest px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}