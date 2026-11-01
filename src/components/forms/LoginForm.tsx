"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import FieldHint from "@/components/ui/FieldHint";
import PasswordInput from "@/components/ui/PasswordInput";
import GoogleButton from "./GoogleButton";

/** Design-only login form. Inputs validate HTML-wise; submit shows a toast. */
export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Login looks good! (demo only)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <FieldHint>We&apos;ll never share your email with anyone.</FieldHint>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          
        </div>
        <PasswordInput
          id="login-password"
          placeholder="••••••••"
          autoComplete="current-password"
          minLength={6}
          required
        />
        <FieldHint>
          At least 6 characters. Password is case-sensitive.
        </FieldHint>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        <FontAwesomeIcon icon={faRightToBracket} className="h-4 w-4" />
        Login
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold tracking-wider text-charcoal-soft uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton label="Continue with Google" />

      <p className="text-center text-sm text-charcoal-soft">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-forest hover:text-accent dark:text-forest-light"
        >
          Register here
        </Link>
      </p>
    </form>
  );
}
