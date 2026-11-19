"use client";

import { useState, useEffect } from "react";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAdminAuth() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.authenticated && data.user?.role === "ADMIN") {
            setIsAdmin(true);
          }
        }
      } catch {
        // Silently treat as non-admin on any network/parse failure
        if (isMounted) setIsAdmin(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAdminAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isAdmin, loading };
}
