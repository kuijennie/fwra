"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "@/lib/hooks";

export function UserBootstrap() {
  const { isSignedIn, user } = useUser();
  const { sessionId, isLoading: sessionLoading } = useSession();
  const currentUser = useQuery(api.users.getCurrent);
  const signedInEmail = user?.primaryEmailAddress?.emailAddress;
  const fallbackUser = useQuery(
    api.users.getByEmail,
    signedInEmail ? { email: signedInEmail } : "skip"
  );
  const getOrCreate = useMutation(api.users.getOrCreateFromClerk);
  const linkSession = useMutation(api.users.linkSessionToUser);
  const seedUser = useMutation(api.users.seedUser);
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (!isSignedIn) {
      hasBootstrapped.current = false;
    }
  }, [isSignedIn]);

  useEffect(() => {
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

    hasBootstrapped.current = true;

    const ensureUser = currentUser || fallbackUser
      ? Promise.resolve()
      : signedInEmail && user?.id
        ? seedUser({
            clerkId: user.id,
            email: signedInEmail,
            name: user.fullName ?? user.firstName ?? "User",
            role: "pending",
          })
        : getOrCreate({});

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

  return null;
}
