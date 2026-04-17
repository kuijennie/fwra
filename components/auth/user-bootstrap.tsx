"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "@/lib/hooks";

/**
 * UserBootstrap — invisible component, renders nothing on screen.
 *
 * It runs silently in the background every time a user is logged in.
 * Its one job: make sure the logged-in user exists in the Convex database
 * and that their anonymous session history is linked to their account.
 *
 * WHY THIS IS NEEDED:
 * Users can use the app without logging in (logging waste, getting recommendations).
 * All that anonymous activity is saved under a random sessionId in localStorage.
 * When they eventually sign up / log in, this component wakes up and says:
 * "Everything this session did — that now belongs to THIS user account."
 */
export function UserBootstrap() {
  // Get the currently logged-in user from Clerk (auth provider)
  const { isSignedIn, user } = useUser();

  // Get the anonymous session ID stored in localStorage (e.g. "session_1712_abc")
  const { sessionId, isLoading: sessionLoading } = useSession();

  // Check if this user already has a record in our Convex database
  const currentUser = useQuery(api.users.getCurrent);

  // Backup lookup by email — in case Convex doesn't recognize the auth token yet
  // but the user record already exists (e.g. created via webhook)
  const signedInEmail = user?.primaryEmailAddress?.emailAddress;
  const fallbackUser = useQuery(
    api.users.getByEmail,
    signedInEmail ? { email: signedInEmail } : "skip" // "skip" = don't run this query
  );

  // Convex mutations (functions that write to the database)
  const getOrCreate = useMutation(api.users.getOrCreateFromClerk); // create user from Clerk profile
  const linkSession = useMutation(api.users.linkSessionToUser);     // attach sessionId to the user
  const seedUser = useMutation(api.users.seedUser);                 // manual user creation fallback

  // Safety flag — ensures this whole process only runs ONCE per login,
  // not on every re-render (React components can re-render many times)
  const hasBootstrapped = useRef(false);

  // Reset the flag when the user logs out, so it runs again on next login
  useEffect(() => {
    if (!isSignedIn) {
      hasBootstrapped.current = false;
    }
  }, [isSignedIn]);

  useEffect(() => {
    // Wait until ALL of these are ready before doing anything:
    // - user must be signed in
    // - sessionId must be loaded from localStorage
    // - both Convex user lookups must have resolved (not still loading)
    // - must not have already bootstrapped this session
    if (
      !isSignedIn ||
      sessionLoading ||
      !sessionId ||
      currentUser === undefined ||
      fallbackUser === undefined ||
      hasBootstrapped.current
    ) {
      return;
    }

    // Mark as done immediately to prevent running twice
    hasBootstrapped.current = true;

    // Step 1: Ensure the user exists in Convex
    const ensureUser = currentUser || fallbackUser
      ? Promise.resolve()          // user already exists — nothing to create
      : signedInEmail && user?.id
        ? seedUser({               // create manually using Clerk profile data
            clerkId: user.id,
            email: signedInEmail,
            name: user.fullName ?? user.firstName ?? "User",
            role: "pending",       // role starts as "pending" → RoleSelectionModal picks it up
          })
        : getOrCreate({});         // let Convex create the user from the auth token

    // Step 2: After the user record is confirmed, link their anonymous session to their account
    // This transfers all their pre-login activity (waste entries, recommendations) to their account
    ensureUser.then(() => linkSession({ sessionId }));
  }, [
    currentUser,
    fallbackUser,
    getOrCreate,
    isSignedIn,
    linkSession,
    seedUser,
    sessionId,
    sessionLoading,
    signedInEmail,
    user,
  ]);

  // Renders nothing — this component is purely logic, no UI
  return null;
}
