"use client";

import { useState, useEffect } from "react";

/**
 * ClientOnly component that prevents hydration mismatches by only rendering children on the client
 * This is more aggressive than NoSSR and should be used for components with persistent hydration issues
 */
export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
}
