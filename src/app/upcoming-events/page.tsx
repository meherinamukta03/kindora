import PageHeader from "@/components/shared/PageHeader";
import PageContainer from "@/components/shared/PageContainer";

import { sampleEvents } from "@/lib/sample-events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function UpcomingEventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Volunteer Opportunities"
        title="Upcoming Events"
        subtitle="Browse every community event on the Kindora calendar — plantations, cleanups, donation drives and more. Pick a cause and join in."
      />

      <PageContainer className="py-14 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal-soft dark:text-charcoal-soft">
            <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4 text-accent" />
            Showing {sampleEvents.length} upcoming community events
          </p>
        </div>

      
      </PageContainer>
    </>
  );
}
