
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faCalendarDays,
  faRightToBracket,
  faBars,
  faXmark,
  faPlusCircle,
  faCalendarCheck,
  faListCheck,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/Button";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Navigation link styling
  const linkClasses = (href: string) =>
    cn(
      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
      pathname === href
        ? "bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light"
        : "text-charcoal-soft hover:bg-forest/5 hover:text-forest dark:text-charcoal-soft dark:hover:text-forest-light"
    );

  // Logout
  const handleLogout = async () => {
    try {
      await signOut();

      setMenuOpen(false);
      setProfileOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown
  const closeProfileMenu = () => {
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/85 backdrop-blur-md dark:bg-cream-dark/90">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Kindora home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest text-white shadow-sm">
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              className="h-5 w-5"
            />
          </span>

          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-forest dark:text-forest-light">
              Kindora
            </span>

            <span className="text-[0.6rem] font-semibold tracking-widest text-charcoal-soft uppercase">
              Small Acts, Greater Impact
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/upcoming-events"
            className={linkClasses("/upcoming-events")}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="h-3.5 w-3.5"
            />
            Upcoming Events
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {!isPending &&
            (user ? (
              <>
                {/* Profile Image and Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setProfileOpen((open) => !open)
                    }
                    aria-label="Toggle profile menu"
                    aria-expanded={profileOpen}
                    className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-forest bg-forest/10 text-forest transition hover:ring-2 hover:ring-forest/20"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "Profile"}
                        width={40}
                        height={40}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-bold">
                        {user.name?.charAt(0).toUpperCase() || (
                          <FontAwesomeIcon icon={faUser} />
                        )}
                      </span>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-border bg-card p-2 shadow-xl">

                      {/* User Info */}
                      <div className="border-b border-border px-3 py-3">
                        <p className="text-xs text-charcoal-soft">
                          Signed in as
                        </p>

                        <p className="mt-1 truncate font-bold text-charcoal dark:text-white">
                          {user.name}
                        </p>
                      </div>

                      {/* Create Event */}
                      <Link
                        href="/create-event"
                        onClick={closeProfileMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-soft transition hover:bg-forest/10 hover:text-forest dark:hover:text-forest-light"
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Create Event
                      </Link>

                      {/* Joined Events */}
                      <Link
                        href="/joined-events"
                        onClick={closeProfileMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-soft transition hover:bg-forest/10 hover:text-forest dark:hover:text-forest-light"
                      >
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        Joined Events
                      </Link>

                      {/* Manage Events */}
                      <Link
                        href="/manage-events"
                        onClick={closeProfileMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-soft transition hover:bg-forest/10 hover:text-forest dark:hover:text-forest-light"
                      >
                        <FontAwesomeIcon icon={faListCheck} />
                        Manage Events
                      </Link>

                      {/* Dropdown Logout */}
                      <div className="mt-1 border-t border-border pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navbar Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 shadow-sm transition-colors hover:bg-red-500 hover:text-white"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="h-4 w-4"
                  />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm" className="px-5 py-2">
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="h-3.5 w-3.5"
                  />
                  Login
                </Button>
              </Link>
            ))}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-charcoal transition-colors hover:border-forest hover:text-forest"
          >
            <FontAwesomeIcon
              icon={menuOpen ? faXmark : faBars}
              className="h-4 w-4"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2 py-3">

            {/* Upcoming Events */}
            <Link
              href="/upcoming-events"
              onClick={() => setMenuOpen(false)}
              className={linkClasses("/upcoming-events")}
            >
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="h-3.5 w-3.5"
              />
              Upcoming Events
            </Link>

            {!isPending &&
              (user ? (
                <>
                  {/* User Name */}
                  <div className="border-b border-border px-3 py-3">
                    <p className="text-xs text-charcoal-soft">
                      Signed in as
                    </p>

                    <p className="mt-1 font-bold text-charcoal dark:text-white">
                      {user.name}
                    </p>
                  </div>

                  {/* Create Event */}
                  <Link
                    href="/create-event"
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses("/create-event")}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                    Create Event
                  </Link>

                  {/* Joined Events */}
                  <Link
                    href="/joined-events"
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses("/joined-events")}
                  >
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    Joined Events
                  </Link>

                  {/* Manage Events */}
                  <Link
                    href="/manage-events"
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses("/manage-events")}
                  >
                    <FontAwesomeIcon icon={faListCheck} />
                    Manage Events
                  </Link>

                  {/* Mobile Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Logout
                  </button>
                </>
              ) : (
                /* Login */
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-light"
                >
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="h-3.5 w-3.5"
                  />
                  Login
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
