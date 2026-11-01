import { cn } from "@/lib/utils";

/** Standardized page/section heading with eyebrow label, title and subtitle. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  level?: 1 | 2;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "font-extrabold tracking-tight text-charcoal dark:text-charcoal",
          level === 1 ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl"
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-3 text-base text-charcoal-soft dark:text-charcoal-soft">
          {subtitle}
        </p>
      )}
    </div>
  );
}
