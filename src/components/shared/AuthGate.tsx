"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/shared/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function GateContent({ children }: { children: React.ReactNode }) {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  // Wait for localStorage hydration before deciding — avoids login-page flash.
  if (!hydrated) {
    return (
      <div className="flex justify-center py-24 text-sm font-semibold text-charcoal-soft">
        Checking your session…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
          <FontAwesomeIcon icon={faLock} className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-charcoal">
            This is a protected area
          </h1>
          <p className="mt-1 text-sm text-charcoal-soft">
            Please log in to continue — redirecting you to the login page…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Client-side guard for private routes (Create Event, Manage Events,
 * Joined Events). Redirects to /login when there is no signed-in user.
 * TODO: replace with server-side auth checks when a real backend exists.
 */
export default function AuthGate({ children }: { children: React.ReactNode }) {
  return <GateContent>{children}</GateContent>;
}
