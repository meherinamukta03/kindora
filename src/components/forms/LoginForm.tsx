"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import FieldHint from "@/components/ui/FieldHint";
import PasswordInput from "@/components/ui/PasswordInput";
import GoogleButton from "./GoogleButton";
import { useAuth } from "@/components/shared/AuthProvider";

/** Demo login: no backend yet — signs in via the client-side AuthProvider. */
export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    // No real user records — derive a friendly display name from the email.
    const name = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    login({ name, email });
    toast.success(`Welcome back, ${name}!`);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
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
          {/* <Link
            href="/login"
            className="mb-1.5 text-xs font-semibold text-forest hover:text-accent dark:text-forest-light"
          >
            Forgot password?
          </Link> */}
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
