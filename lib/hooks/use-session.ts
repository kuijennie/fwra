"use client";

import { useState, useEffect } from "react";

// The key I use to store the session ID in localStorage.
// Keeping it as a constant means I never have a typo mismatch between reads and writes.
const SESSION_KEY = "fwra_session_id";

// Generates a unique session ID using the current timestamp + a random string.
// This is how I track anonymous users before they create an account.
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// This hook gives every page access to the current session ID.
// The session ID is what links a user's waste entries, recommendations, and reminders
// together — even if they haven't signed in yet.
//
// On first visit: a new session ID is generated and saved to localStorage.
// On return visits: the existing session ID is read from localStorage.
// When a user signs in: I call linkSessionToUser on the server to attach all their
// anonymous data to their new account.
export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  // isLoading is true until we've read from localStorage — prevents flashing
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage is only available in the browser, not during SSR,
    // so I put this inside useEffect to run client-side only
    let storedSessionId = localStorage.getItem(SESSION_KEY);

    if (!storedSessionId) {
      // First visit — generate and persist a new session ID
      storedSessionId = generateSessionId();
      localStorage.setItem(SESSION_KEY, storedSessionId);
    }

    setSessionId(storedSessionId);
    setIsLoading(false);
  }, []);

  // Resets the session — used after a user signs out so their next visit
  // starts fresh without seeing the previous user's data
  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    const newSessionId = generateSessionId();
    localStorage.setItem(SESSION_KEY, newSessionId);
    setSessionId(newSessionId);
  };

  return {
    sessionId,
    isLoading,
    clearSession,
  };
}
