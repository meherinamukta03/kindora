/** Helpful hint or validation message under a form field. */
export default function FieldHint({
  children,
  error = false,
}: {
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <p
      className={
        error
          ? "mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          : "mt-1.5 text-xs text-charcoal-soft dark:text-charcoal-soft"
      }
    >
      {children}
    </p>
  );
}
