"use client";

import { useState, useEffect, useCallback } from "react";

export interface OnlineStatus {
  isOnline: boolean;
  wasOffline: boolean;
  lastOnline: Date | null;
}

export function useOnlineStatus(): OnlineStatus {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);
  const [lastOnline, setLastOnline] = useState<Date | null>(null);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setLastOnline(new Date());
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setWasOffline(true);
  }, []);

  useEffect(() => {
    // Set initial state based on navigator
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        setLastOnline(new Date());
      }
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOnline, wasOffline, lastOnline };
}

// Hook to register the service worker
export function useServiceWorker() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        setRegistration(reg);
        setIsRegistered(true);

        // Check for updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New content available
                setUpdateAvailable(true);
              }
            });
          }
        });

        console.log("[App] Service worker registered");
      } catch (error) {
        console.error("[App] Service worker registration failed:", error);
      }
    };

    registerSW();
  }, []);

  const skipWaiting = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }, [registration]);

  return { isRegistered, updateAvailable, skipWaiting };
}
