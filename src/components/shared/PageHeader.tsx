/** Standardized intro header for inner pages (below the Navbar). */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="border-b border-border bg-forest-dark py-14 text-white sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
