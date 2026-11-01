"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PageContainer from "@/components/shared/PageContainer";
import { Button } from "../ui/Button";

/** Design-only newsletter block. Responds with a friendly demo toast. */
export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address first.");
      return;
    }
    toast.success("You're on the list! (demo only)");
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-20">
      <PageContainer>
        <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* Decorative rings */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border-[14px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full border-[18px] border-white/5" />

          <div className="relative mx-auto max-w-xl">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-white" />
            </span>

            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Stay in the Loop
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
              Get a short weekly email with upcoming community events, volunteer
              stories and the difference Kindora made that week.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="border-transparent bg-white/95 text-charcoal placeholder:text-charcoal-soft/50"
              />
              {/* <Button variant="accent" size="md" onClick={handleSubscribe} className="shrink-0 px-8">
                Subscribe
              </Button> */}
            </div>
            <p className="mt-4 text-xs text-white/60">
              No spam, ever. Unsubscribe with one click.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
