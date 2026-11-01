import { cn } from "@/lib/utils";

/** Shadcn-style select dropdown. */
export default function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full cursor-pointer appearance-none rounded-xl border border-border bg-card bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%2355595e%22%20stroke-width%3D%222%22%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-[position:right_0.9rem_center] bg-no-repeat px-4 py-2.5 pr-10 text-sm text-charcoal outline-none transition-all focus:border-forest focus:ring-2 focus:ring-forest/20 dark:text-charcoal",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
