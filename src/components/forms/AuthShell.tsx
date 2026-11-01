import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

/** Kindora logo + wordmark shown at the top of both auth layouts. */
function BrandHeader() {
  return (
    <div className="mb-7 flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest text-white">
        <FontAwesomeIcon icon={faHandHoldingHeart} className="h-5 w-5" />
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-forest dark:text-forest-light">
          Kindora
        </span>
        <span className="text-[0.6rem] font-semibold tracking-widest text-charcoal-soft uppercase">
          Small Acts, Greater Impact
        </span>
      </div>
    </div>
  );
}

// title + subtitle + form children
function FormContent({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl dark:text-charcoal">
        {title}
      </h1>
      <p className="mt-2 mb-7 text-sm text-charcoal-soft dark:text-charcoal-soft">
        {subtitle}
      </p>

      {children}
    </>
  );
}

/**
 * Auth shell reused by the Login and Register pages.
 * - Default: split panel — form on the left, photo + branding on the right.
 * - `centered`: single card centered in the viewport (no photo side).
 */
export default function AuthShell({
  image,
  imageAlt,
  title,
  subtitle,
  centered = false,
  children,
}: {
  image?: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  centered?: boolean;
  children: React.ReactNode;
}) {
  // Centered mode — single card, page ke center mein, photo side nahi hota
  if (centered) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-lg sm:p-10">
          <BrandHeader />
          <FormContent title={title} subtitle={subtitle}>
            {children}
          </FormContent>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-2">
        {/* Form side */}
        <div className="p-7 sm:p-10">
          <BrandHeader />
          <FormContent title={title} subtitle={subtitle}>
            {children}
          </FormContent>
        </div>

        {/* Photo side — TODO: image link login/register pages se pass karein */}
        <div className="relative hidden lg:block">
          {image ? (
            <Image src={image} alt={imageAlt ?? ""} fill sizes="50vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-forest-dark/40" />
          <div className="absolute right-0 bottom-0 left-0 p-8">
            <p className="text-xl font-extrabold text-white">
              Together we grow, together we serve.
            </p>
            <p className="mt-2 text-sm text-white/80">
              Join 1,200+ volunteers making their communities greener and kinder
              every month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
