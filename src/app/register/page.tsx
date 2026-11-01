import type { Metadata } from "next";
import AuthShell from "@/components/forms/AuthShell";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register — Kindora",
  description: "Create your Kindora volunteer account.",
};

export default function RegisterPage() {
  // TODO: apna auth image link baad mein add karein, e.g.
  // "https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=1200&q=80&auto=format&fit=crop"
  return (
    <AuthShell
      image=""
      imageAlt="Group of smiling volunteers in the community"
      title="Create Your Account"
      subtitle="Join Kindora and start making a difference today."
    >
      <RegisterForm />
    </AuthShell>
  );
}
