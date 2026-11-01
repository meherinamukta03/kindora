import { cn } from "@/lib/utils";

/** Form field label. */
export default function Label({
  className,
  children,
  htmlFor,
}: {
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-1.5 block text-sm font-semibold text-charcoal dark:text-charcoal",
        className
      )}
    >
      {children}
    </label>
  );
}
