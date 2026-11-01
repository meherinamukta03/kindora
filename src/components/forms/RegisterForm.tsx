"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import FieldHint from "@/components/ui/FieldHint";
import PasswordInput from "@/components/ui/PasswordInput";
import GoogleButton from "./GoogleButton";
import { useAuth } from "@/components/shared/AuthProvider";

/** Demo registration: signs the new user in via the client-side AuthProvider. */
export default function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const avatar = String(data.get("avatar") ?? "").trim();
    if (name && email) {
      login({ name, email, avatar: avatar || undefined });
      toast.success(`Welcome to Kindora, ${name}!`);
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <FieldHint>Your name will appear on volunteer activity feeds.</FieldHint>
      </div>

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
        <FieldHint>We&apos;ll never share your email with anyone.</FieldHint>
      </div>

      <div>
        <Label htmlFor="register-photo">Photo URL</Label>
        <Input
          id="register-photo"
          name="avatar"
          type="url"
          placeholder="Profile photo link (optional)"
        />
        <FieldHint>A link to your profile picture (optional avatar).</FieldHint>
      </div>

      <div>
        <Label htmlFor="register-password">Password</Label>
        <PasswordInput
          id="register-password"
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={6}
          required
        />
        <FieldHint>
          At least 6 characters. Use a mix of letters and numbers.
        </FieldHint>
      </div>

      {/* <Button type="submit" variant="primary" size="lg" className="w-full">
        <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4" />
        Register
      </Button> */}

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold tracking-wider text-charcoal-soft uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton label="Register with Google" />

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
