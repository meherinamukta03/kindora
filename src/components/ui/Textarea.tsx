import { cn } from "@/lib/utils";

/** Multi-line text input for long descriptions. */
export default function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-y rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-charcoal outline-none transition-all placeholder:text-charcoal-soft/60 focus:border-forest focus:ring-2 focus:ring-forest/20 dark:text-charcoal",
        className
      )}
      rows={5}
      {...props}
    />
  );
}
