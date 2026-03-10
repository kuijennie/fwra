"use client";

import { WifiSlash as WifiOff, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useOnlineStatus } from "@/lib/hooks";

export function OfflineBanner() {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [showReconnected, setShowReconnected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      setDismissed(false);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // Show offline banner
  if (!isOnline && !dismissed) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2">
        <div className="container mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <WifiOff weight="duotone" className="w-4 h-4" />
            <span className="text-sm font-medium">
              You&apos;re offline. Some features may not be available.
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-600 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Show reconnected banner
  if (showReconnected) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white px-4 py-2">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <span className="text-sm font-medium">
            You&apos;re back online!
          </span>
        </div>
      </div>
    );
  }

  return null;
}
