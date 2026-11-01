import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faUsers,
  faCalendarCheck,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import PageContainer from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import ManageEventsTable from "@/components/events/ManageEventsTable";
import AuthGate from "@/components/shared/AuthGate";
import { managedEvents, sampleEvents } from "@/lib/sample-events";

export const metadata: Metadata = {
  title: "Manage Events — Kindora",
  description: "Update or remove the community events you have created.",
};

const stats = [
  {
    icon: faLeaf,
    label: "Total Events Created",
    value: sampleEvents.length.toString(),
  },
  {
    icon: faUsers,
    label: "Total Volunteers Joined",
    value: (managedEvents.length * 23).toString(),
  },
  {
    icon: faCalendarCheck,
    label: "Upcoming This Month",
    value: "4",
  },
];

export default function ManageEventsPage() {
  return (
    <AuthGate>
      <>
      <PageHeader
        eyebrow="Organizer Dashboard"
        title="Manage Your Events"
        subtitle="Track every event you've created, keep details up to date or remove listings that are no longer active."
      />

      <PageContainer className="py-14 sm:py-16">
        {/* Summary */}
        <div className="mb-10 grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light">
                <FontAwesomeIcon icon={stat.icon} className="h-5 w-5" />
              </span>
              <p className="text-3xl font-extrabold text-charcoal dark:text-charcoal">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wider text-charcoal-soft uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-charcoal dark:text-charcoal">
            Your Events ({managedEvents.length})
          </h2>
          <Button href="/create-event" variant="primary" size="md">
            <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4" />
            Create New Event
          </Button>
        </div>

        <ManageEventsTable />
      </PageContainer>
      </>
    </AuthGate>
  );
}
