import type { Metadata } from "next";
import AuthShell from "@/components/forms/AuthShell";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register — Kindora",
  description: "Create your Kindora volunteer account.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      image="/camylla-battani-ABVE1cyT7hk-unsplash.jpg"
      imageAlt="Kindora community volunteers working together"
      title="Create Your Account"
      subtitle="Join Kindora and become part of a community that makes a positive difference."
      panelEyebrow="Together We Make a Difference"
      panelTitle="Small Acts, Big Changes."
      panelDescription="Be part of something meaningful. Connect with volunteers, support your community, and create a better tomorrow with Kindora."
    >
      <RegisterForm />
    </AuthShell>
  );
}
