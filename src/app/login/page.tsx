import type { Metadata } from "next";
import AuthShell from "@/components/forms/AuthShell";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login — Kindora",
  description: "Log in to your Kindora volunteer account.",
};

export default function LoginPage() {
  // Split-panel shell band kiya gaya hai — centered single-card layout chal raha hai
  return (
    <AuthShell
      centered
      title="Welcome Back"
      subtitle="Log in to manage your events and keep volunteering."
    >
      <LoginForm />
    </AuthShell>
  );
}
