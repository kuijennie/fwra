"use client";

import { ArrowClockwise as RefreshCw, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useServiceWorker } from "@/lib/hooks";

export function UpdatePrompt() {
  const { updateAvailable, skipWaiting } = useServiceWorker();
  const [dismissed, setDismissed] = useState(false);

  if (!updateAvailable || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <RefreshCw weight="duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Update Available
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            A new version of FWRA is available. Refresh to get the latest
            features.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={skipWaiting}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
            >
              Refresh Now
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          aria-label="Dismiss"
        >
          <X weight="bold" className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
