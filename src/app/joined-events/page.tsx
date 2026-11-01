import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import PageContainer from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import EventGrid from "@/components/events/EventGrid";

import { joinedEvents } from "@/lib/sample-events";

export const metadata: Metadata = {
  title: "Joined Events — Kindora",
  description: "The community events you are enrolled in as a volunteer.",
};

export default function JoinedEventsPage() {
  return (
    //<AuthGate>
      <>
        <PageHeader
          eyebrow="Your Volunteering"
          title="Joined Events"
          subtitle="Every event you've signed up for, in one place — dates, locations and the causes you've committed to."
        />

        <PageContainer className="py-14 sm:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-charcoal-soft dark:text-charcoal-soft">
              <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-accent" />
               You have joined * //{joinedEvents.length}
                community events 
            </p>
          </div>
                 joined events
         {/* //<EventGrid events={joinedEvents} /> */}
        </PageContainer>
      </>
    //</AuthGate>
  );
}
