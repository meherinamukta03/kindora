"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("kindora-theme", isDark ? "dark" : "light");
    } catch {
     
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-charcoal transition-all duration-200 hover:border-forest hover:text-forest dark:text-charcoal dark:hover:border-forest dark:hover:text-forest ${className ?? ""}`}
    >
   
      <FontAwesomeIcon icon={faMoon} className="h-4 w-4 dark:hidden" />
      {/* <FontAwesomeIcon icon={faSun} className="hidden h-4 w-4 dark:inline-block" /> */}
    </button>
  );
}
