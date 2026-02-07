"use client";

import { useState, useEffect } from "react";

const SESSION_KEY = "fwra_session_id";

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    let storedSessionId = localStorage.getItem(SESSION_KEY);

    if (!storedSessionId) {
      // Generate new session ID
      storedSessionId = generateSessionId();
      localStorage.setItem(SESSION_KEY, storedSessionId);
    }

    setSessionId(storedSessionId);
    setIsLoading(false);
  }, []);

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
