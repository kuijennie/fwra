"use client";

import { useEffect } from "react";
import { OfflineBanner } from "./offline-banner";
import { UpdatePrompt } from "./update-prompt";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker on mount
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("[PWA] Service worker registered:", registration.scope);
        })
        .catch((error) => {
          console.error("[PWA] Service worker registration failed:", error);
        });
    }
  }, []);

  return (
    <>
      <OfflineBanner />
      {children}
      <UpdatePrompt />
    </>
  );
}
