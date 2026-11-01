"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faHouse,
  faCalendarDays,
  faRightToBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/Button";


/** Static logged-out navigation shown on every page. */

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = (href: string) =>
    cn(
      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
      pathname === href
        ? "bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light"
        : "text-charcoal-soft hover:bg-forest/5 hover:text-forest dark:text-charcoal-soft dark:hover:text-forest-light"
    );

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
          <Link
            href="/upcoming-events"
            className={linkClasses("/upcoming-events")}
          >
            <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5" />
            Upcoming Events
          </Link>
        </div>
        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login" >
            <Button size="sm" className="px-5 py-2">
              <FontAwesomeIcon icon={faRightToBracket} className="h-3.5 w-3.5" />
              Login
            </Button></Link>
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
            <div className="flex flex-col gap-1 py-2">
              <Link
                href="/upcoming-events"
                onClick={() => setMenuOpen(false)}
                className={linkClasses("/upcoming-events")}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5" />
                Upcoming Events
              </Link>

            
            </div>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-light"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="h-3.5 w-3.5" />
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
