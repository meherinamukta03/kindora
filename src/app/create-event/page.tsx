import type { Metadata } from "next";
import PageContainer from "@/components/shared/PageContainer";
import CreateEventForm from "@/components/forms/CreateEventForm";
import AuthGate from "@/components/shared/AuthGate";

export const metadata: Metadata = {
  title: "Create Event — Kindora",
  description: "Organize a community service event on Kindora.",
};

export default function CreateEventPage() {
  return (
    //<AuthGate>
    <PageContainer className="py-14 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
            Organizer Tools
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl dark:text-charcoal">
            Create a New Event
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-charcoal-soft">
            Tell the community what you&apos;re planning, where to meet and how
            volunteers can help. All fields are required.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <CreateEventForm />
        </div>
      </div>
    </PageContainer>
    //</AuthGate>
  );
}
