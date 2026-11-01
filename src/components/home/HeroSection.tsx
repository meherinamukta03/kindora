import Image from "next/image";
// import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/Button";
import Link from "next/link";
// import { Button } from "@base-ui/react/button";

// TODO: apna hero image link baad mein add karein, e.g.
// "https://images.unsplash.com/photo-1617896852726-5c9b4bdd8b19?w=1200&q=80&auto=format&fit=crop"
const heroImage = "";

/** Full-width hero banner for the Home page. */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft backdrop blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-forest/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        {/* Copy */}
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-bold tracking-widest text-forest uppercase dark:bg-forest/20 dark:text-forest-light">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="h-3.5 w-3.5" />
            Community Service Platform
          </span>

          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-charcoal sm:text-5xl lg:text-[3.4rem] dark:text-charcoal">
            Make a Difference,{" "}
            <span className="text-forest dark:text-forest-light">
              One Event at a Time
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-soft sm:text-lg dark:text-charcoal-soft">
            Kindora connects volunteers with community events that matter — tree
            plantations, neighborhood cleanups, donation drives and greenery
            projects. Create an event, invite your neighbors and turn small acts
            into lasting change.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
<Link href="/upcoming-events">
            <Button variant="default" size="lg">
              Explore Events
            </Button>

            </Link>
            <Link href="/register" >
            <Button  variant="outline" size="lg">
              Join Our Community
            </Button></Link>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex gap-8">
            {[
              { value: "1,200+", label: "Volunteers" },
              { value: "480", label: "Events Held" },
              { value: "26", label: "Communities" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-forest dark:text-forest-light">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold tracking-wider text-charcoal-soft uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="Volunteers working together to plant trees in their community"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : null}
            </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-card px-5 py-4 shadow-lg ring-1 ring-black/5 sm:left-10">
            <p className="text-sm font-extrabold text-forest dark:text-forest-light">
              This Week
            </p>
            <p className="text-xs font-medium text-charcoal-soft">
              12 events · 3 new communities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
