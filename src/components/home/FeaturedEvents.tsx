// import Button from "@/components/ui/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import PageContainer from "@/components/shared/PageContainer";



export default function FeaturedEvents() {
  return (
    <section className="bg-cream-dark/40 py-16 sm:py-20 dark:bg-cream-dark/20">
      <PageContainer>
        <SectionHeading
          eyebrow="What's Ahead"
          title="Recent Upcoming Events"
          subtitle="Fresh opportunities to serve — pick one that speaks to you and show up."
        />

    

        <div className="mt-10 text-center">
          {/* <Button href="/upcoming-events" variant="outline" size="md">
            See All Events
          </Button> */}
        </div>
      </PageContainer>
    </section>
  );
}
