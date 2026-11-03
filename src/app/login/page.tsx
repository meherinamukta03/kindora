import type { Metadata } from "next";
import AuthShell from "@/components/forms/AuthShell";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login — Kindora",
  description: "Log in to your Kindora volunteer account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
  // better-auth OAuth error redirect (?error=...) LoginForm-এ pass kora hoy
  const { error, error_description: errorDescription } = await searchParams;

  // Split-panel shell band kiya gaya hai — centered single-card layout chal raha hai
  return (
    <AuthShell
      centered
      title="Welcome Back"
      subtitle="Log in to manage your events and keep volunteering."
    >
      <LoginForm oauthError={error} oauthErrorDescription={errorDescription} />
    </AuthShell>
  );
}
