"use client";

import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";

/** Demo-only join action. No backend, just friendly feedback. */
export default function JoinEventButton() {
  const handleJoin = () => {
    toast.success("You're on the volunteer list! (demo only)");
  };

  return (
    <Button variant="accent" size="lg" onClick={handleJoin} className="w-full sm:w-auto">
      <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
      Join Event
    </Button>
  );
}
