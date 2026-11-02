import type { Metadata } from "next";
import PageContainer from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import CreateEventForm from "@/components/forms/CreateEventForm";

export const metadata: Metadata = {
  title: "Create Event — Kindora",
  description: "Organize a community service event on Kindora.",
};

export default function CreateEventPage() {
  return (
    <>
      <PageHeader
        eyebrow="Organizer"
        title="Create a New Event"
        subtitle="Tell the community what you're planning, where to meet and how volunteers can help. All fields are required."
      />

      <PageContainer className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <CreateEventForm />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
