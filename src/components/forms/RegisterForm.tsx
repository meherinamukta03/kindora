
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { signUp } from "@/lib/auth-client";

import { Button } from "@/components/ui/Button";

import Label from "@/components/ui/Label";
import FieldHint from "@/components/ui/FieldHint";
import PasswordInput from "@/components/ui/PasswordInput";
import { Input } from "../ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const avatar = String(data.get("avatar") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await signUp.email({
        name,
        email,
        password,
        image: avatar || undefined,
        callbackURL: "/",
      });

      if (result.error) {
        console.log(result.error)
        toast.error(result.error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

            {/* Full Name */}
            <div>
              <Label htmlFor="register-name">Full Name</Label>
              <Input
                id="register-name"
                name="name"
                type="text"
                placeholder="Ayesha Khan"
                autoComplete="name"
                required
              />
              <FieldHint>
                Your name will appear on volunteer activity feeds.
              </FieldHint>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <FieldHint>
                We will never share your email with anyone.
              </FieldHint>
            </div>

            {/* Profile Photo */}
            <div>
              <Label htmlFor="register-photo">Photo URL</Label>
              <Input
                id="register-photo"
                name="avatar"
                type="url"
                placeholder="Profile photo link (optional)"
              />
              <FieldHint>
                A link to your profile picture (optional avatar).
              </FieldHint>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="register-password">Password</Label>
              <PasswordInput
                id="register-password"
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                minLength={6}
                required
              />
              <FieldHint>
                At least 6 characters. Use a mix of letters and numbers.
              </FieldHint>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isLoading}
              className="w-full border-2 border-forest dark:border-forest-light"
            >
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4" />
              {isLoading ? "Creating Account..." : "Register"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-soft">
                or
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-charcoal-soft">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-forest hover:text-accent dark:text-forest-light"
              >
                Login here
              </Link>
            </p>
          </form>
  );
}
