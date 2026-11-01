import { cn } from "@/lib/utils";

/** Small rounded label chip (e.g. event type or date). */
export default function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest dark:bg-forest/15 dark:text-forest-light",
        className
      )}
    >
      {children}
    </span>
  );
}
