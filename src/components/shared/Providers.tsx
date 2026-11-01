"use client";

import { Toaster } from "react-hot-toast";

/** Global toast host — used for friendly (non-blocking) form feedback. */
export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "999px",
            fontWeight: 600,
          },
        }}
      />
    </>
  );
}
