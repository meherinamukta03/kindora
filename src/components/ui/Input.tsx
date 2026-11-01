import { cn } from "@/lib/utils";

/** Shadcn-style labeled text input wrapper. */
export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-charcoal outline-none transition-all placeholder:text-charcoal-soft/60 focus:border-forest focus:ring-2 focus:ring-forest/20 dark:text-charcoal",
        className
      )}
      {...props}
    />
  );
}
