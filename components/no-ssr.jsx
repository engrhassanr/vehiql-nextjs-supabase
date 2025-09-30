"use client";

import { useState, useEffect } from "react";

/**
 * NoSSR component that prevents server-side rendering of its children
 * Useful for components that have hydration mismatches or client-only dependencies
 */
export default function NoSSR({ children, fallback = null }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return fallback;
  }

  return children;
}
