import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Providers from "@/components/shared/Providers";
import { AuthProvider } from "@/components/shared/AuthProvider";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kindora — Small Acts, Greater Impact.",
  description:
    "Kindora is a community platform for organizing and joining social development events: plantations, cleanups, donations and more.",
};

/**
 * Applied before first paint so the saved theme isn't flashed away.
 * Default is light; fetched on the client without hydration mismatch.
 */
const themeScript = `
try {
  if (localStorage.getItem("kindora-theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    ><head>
  <Script
    id="theme-script"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{ __html: themeScript }}
  />
</head>
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Providers />
        </AuthProvider>
      </body>
    </html>
  );
}
