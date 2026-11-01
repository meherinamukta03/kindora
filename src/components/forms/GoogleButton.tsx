import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "../ui/Button";
// import Button from "@/components/ui/Button";

/** Shared "Continue with Google" button for Login and Register forms. */
export default function GoogleButton({ label }: { label: string }) {
  return (
    <Button
      variant="ghost"
      // size="md"
      className="w-full border border-border hover:bg-cream-dark/60 dark:hover:bg-white/5"
      onClick={() => undefined}
    >
      <FontAwesomeIcon icon={faGoogle} className="h-4 w-4 text-accent" />
      {label}
    </Button>
  );
}
