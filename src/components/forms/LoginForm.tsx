"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { Button } from "@/components/ui/Button";

import Label from "@/components/ui/Label";
import FieldHint from "@/components/ui/FieldHint";
import PasswordInput from "@/components/ui/PasswordInput";

import { signIn } from "@/lib/auth-client";
import { Input } from "../ui/Input";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Password condition check
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      toast.error(
        "Password must contain one uppercase, one lowercase letter and minimum 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "Login failed!");
        return;
      }

      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleLogin = async () => {
    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "Google login failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
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

        <FieldHint>
          ${`We'll never share your email with anyone.`}
        </FieldHint>
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="login-password">Password</Label>

        <PasswordInput
          id="login-password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <FieldHint>
          Minimum 6 characters, one uppercase and one lowercase letter.
        </FieldHint>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full border-2 border-forest dark:border-forest-light"
        disabled={loading}
      >
        <FontAwesomeIcon icon={faRightToBracket} />
        {loading ? "Logging in..." : "Login"}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />

        <span className="text-xs font-semibold tracking-wider text-charcoal-soft uppercase">
          or
        </span>

        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="ghost"
        className="w-full border border-border bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
        onClick={handleGoogleLogin}
      >
        <FontAwesomeIcon
          icon={faGoogle}
          className="h-4 w-4 text-[#4285F4] dark:text-[#8AB4F8]"
        />
        Continue with Google
      </Button>

      {/* Register Link */}
      <p className="text-center text-sm text-charcoal-soft">
       Don't have an account?
        <Link
          href="/register"
          className="font-semibold text-forest hover:text-black dark:text-forest-light"
        >
          Register here
        </Link>
      </p>
    </form>
  );
}