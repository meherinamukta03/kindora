"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import Input from "./Input";

/** Password field with a show/hide visibility toggle. */
export default function PasswordInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-11", className)}
        {...props}
      />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-charcoal-soft transition-colors hover:text-forest"
      >
        <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="h-4 w-4" />
      </button>
    </div>
  );
}
