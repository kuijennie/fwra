"use client";

import { WifiSlash as WifiOff } from "@phosphor-icons/react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <WifiOff weight="duotone" className="w-12 h-12 text-gray-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          You&apos;re Offline
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          It looks like you&apos;ve lost your internet connection. Some features
          may not be available until you&apos;re back online.
        </p>

        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            You can still access:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Previously viewed pages
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Cached tutorials
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Your saved reminders
            </li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
