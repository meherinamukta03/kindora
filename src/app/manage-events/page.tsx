import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import PageContainer from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";


import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Events — Kindora",
  description: "Update or remove the community events you have created.",
};


export default function ManageEventsPage() {
  return (

    <>
      <PageHeader
        eyebrow="Organizer Dashboard"
        title="Manage Your Events"
        subtitle="Track every event you've created, keep details up to date or remove listings that are no longer active."
      />

      <PageContainer className="py-14 sm:py-16">
        {/* Summary */}


        {/* Header row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-charcoal dark:text-charcoal">
            Your Events *
          </h2>
          <Link href="/create-event">
            <Button
              size="md"
              className="border border-forest px-6 py-3 text-base dark:border-forest-light"
            >
              <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" />
              Create New Event
            </Button>
          </Link>
        </div>


      </PageContainer>
    </>

  );
}
