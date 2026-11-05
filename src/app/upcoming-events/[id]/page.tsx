import EventDetailsClient from "./EventDetailsClient";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // সার্ভার রিকোয়েস্টের session cookie better-auth-এ ফরওয়ার্ড করে JWT নেও Gdkা
  // (GET /upcomingEvent/:id এখন verifyToken-protected — JWT ছাড়া 401)
  let token: string | undefined;
  try {
    const jwtToken = await auth.api.getToken({ headers: await headers() });
    token = jwtToken?.token;
  } catch {
    // No session — logged-out guest.
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${id}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store", // token per-user আলাদা — cache হলে মিসম্যাচ হবে
    }
  );

  // Login করা নাই (JWT ছাড়া express middleware 401 দেয়)
  if (res.status === 401) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-xl font-semibold text-charcoal dark:text-white">
          Please login to view this event
        </h2>
        <Link
          href="/login"
          className="rounded-lg bg-forest px-6 py-3 font-semibold text-white hover:bg-forest-dark"
        >
          Login Now
        </Link>
      </div>
    );
  }

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">Event not found!</h2>
      </div>
    );
  }

  const event = await res.json();

  return <EventDetailsClient event={event} />;
};

export default DetailsPage;
