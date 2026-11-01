"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faCalendarDays,
  faRightToBracket,
  faBars,
  faXmark,
  faCirclePlus,
  faTableList,
  faUsers,
  faRightFromBracket,
  faLock,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/Button";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";

/** Menu entries shortcut to the app's private (protected) routes. */
const userMenuLinks = [
  { href: "/create-event", label: "Create Event", icon: faCirclePlus },
  { href: "/manage-events", label: "Manage Events", icon: faTableList },
  { href: "/joined-events", label: "Joined Events", icon: faUsers },
];

/** Initials for the profile picture when no avatar URL is available. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when navigating away.
  useEffect(() => {
    setProfileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Close dropdown on outside click / Escape.
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  const linkClasses = (href: string) =>
    cn(
      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
      pathname === href
        ? "bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light"
        : "text-charcoal-soft hover:bg-forest/5 hover:text-forest dark:text-charcoal-soft dark:hover:text-forest-light"
    );

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    toast.success("Logged out — see you soon!");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/85 backdrop-blur-md dark:bg-cream-dark/90">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Kindora home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest text-white shadow-sm">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="h-5 w-5" />
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

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link href="/upcoming-events" className={linkClasses("/upcoming-events")}>
            <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5" />
            Upcoming Events
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2.5">
              {/* Profile picture + dropdown (hover karne pe display name tooltip dikhta hai) */}
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  className="group relative flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card p-1 pr-2 transition-colors hover:border-forest"
                >
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element -- TODO: next/image par shift karein
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-extrabold text-white">
                      {initials(user.name)}
                    </span>
                  )}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="h-3 w-3 text-charcoal-soft"
                  />
                  {/* Hover tooltip — display name */}
                  <span className="pointer-events-none absolute top-full right-0 mt-2 rounded-lg bg-charcoal px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    {user.name}
                  </span>
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card py-2 shadow-xl"
                  >
                    <div className="mb-1 border-b border-border px-4 pb-2">
                      <p className="text-sm font-extrabold text-charcoal">{user.name}</p>
                      <p className="text-xs text-charcoal-soft">{user.email}</p>
                    </div>
                    {userMenuLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-forest/5 hover:text-forest"
                      >
                        <span className="flex items-center gap-2.5">
                          <FontAwesomeIcon icon={link.icon} className="h-4 w-4 text-charcoal-soft" />
                          {link.label}
                        </span>
                        <FontAwesomeIcon icon={faLock} className="h-3 w-3 text-charcoal-soft/60" title="Protected route" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-forest px-4 py-1.5 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:text-forest-light dark:hover:bg-forest-dark"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" className="px-5 py-2">
                <FontAwesomeIcon icon={faRightToBracket} className="h-3.5 w-3.5" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-charcoal transition-colors hover:border-forest hover:text-forest"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 py-2">
            <Link
              href="/upcoming-events"
              onClick={() => setMenuOpen(false)}
              className={linkClasses("/upcoming-events")}
            >
              <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5" />
              Upcoming Events
            </Link>

            {user ? (
              <>
                {/* User block: avatar + name + logout */}
                <div className="mt-2 flex items-center justify-between gap-2 rounded-2xl border border-border p-3">
                  <div className="flex items-center gap-2.5">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-xs font-extrabold text-white">
                        {initials(user.name)}
                      </span>
                    )}
                    <div className="leading-tight">
                      <p className="text-sm font-extrabold text-charcoal">{user.name}</p>
                      <p className="text-xs text-charcoal-soft">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-forest px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-white dark:text-forest-light dark:hover:bg-forest-dark"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="h-3 w-3" />
                    Logout
                  </button>
                </div>

                {/* Private routes */}
                <p className="mt-2 px-2 text-[0.6rem] font-bold tracking-widest text-charcoal-soft uppercase">
                  Your Space
                </p>
                {userMenuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses(link.href)}
                  >
                    <FontAwesomeIcon icon={link.icon} className="h-3.5 w-3.5" />
                    {link.label}
                    <FontAwesomeIcon icon={faLock} className="h-3 w-3 text-charcoal-soft/60" title="Protected route" />
                  </Link>
                ))}
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-light"
              >
                <FontAwesomeIcon icon={faRightToBracket} className="h-3.5 w-3.5" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
