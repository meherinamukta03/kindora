import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PageContainer from "./PageContainer";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
  { href: "/joined-events", label: "Joined Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/login", label: "Login" },
];

// TODO: Add your real social links later
const socials = [
  { link: "https://facebook.com", label: "Facebook", icon: faFacebook },
  { link: "https://instagram.com", label: "Instagram", icon: faInstagram },
  { link: "https://linkedin.com", label: "LinkedIn", icon: faLinkedin },
  { link: "https://x.com", label: "X", icon: faXTwitter },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-forest-dark text-white/90">
      <PageContainer className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="h-5 w-5" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Kindora
                </span>
                <span className="text-[0.6rem] font-semibold tracking-widest text-white/70 uppercase">
                  Small Acts, Greater Impact
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              Kindora helps communities organize, join and celebrate volunteer
              events — plantations, cleanups, donations and more — so every small
              act reaches further.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>123 Community Lane, Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 shrink-0 text-accent" />
                {/* TODO: mail link baad mein add karein */}
                <span>hello@kindora.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4 shrink-0 text-accent" />
                {/* TODO: phone link baad mein add karein */}
                <span>+92 300 123 4567</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socials.map((social) => (
                <span
                  key={social.label}
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              Follow along for event announcements, volunteer stories and weekly
              recaps from the community.
            </p>
          </div>
        </div>
      </PageContainer>

      <div className="border-t border-white/10">
        <PageContainer className="py-5">
          <p className="text-center text-xs text-white/60">
            © 2026 Kindora. All rights reserved. Small Acts, Greater Impact.
          </p>
        </PageContainer>
      </div>
    </footer>
  );
}
