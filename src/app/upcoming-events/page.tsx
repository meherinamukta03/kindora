import PageHeader from "@/components/shared/PageHeader";
import PageContainer from "@/components/shared/PageContainer";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import EventGrid from "@/components/events/EventGrid";

export default async function UpcomingEventsPage() {

  const events = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`)


  const eventData = await events.json()


  console.log(eventData)
  return (
    <>

      <PageHeader
        eyebrow="Volunteer Opportunities"
        title="Upcoming Events"
        subtitle="Browse every community event on the Kindora calendar — plantations, cleanups, donation drives and more. Pick a cause and join in."
      />

      <PageContainer className="py-14 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-base font-semibold text-charcoal-soft dark:text-charcoal-soft">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="h-4 w-4 shrink-0 text-forest dark:text-forest-light"
            />
            Showing {eventData.length} upcoming community events
          </p>
        </div>
        <EventGrid eventData={eventData}></EventGrid>

      </PageContainer>
    </>
  );
}
