import { useState, useEffect } from "react";

/**
 * Hook to prevent hydration mismatches by ensuring client-side state
 * is only applied after the component has hydrated on the client.
 *
 * @returns {boolean} true when the component has hydrated on the client
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Use setTimeout to ensure this runs after the initial render
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return isHydrated;
}

/**
 * Hook to safely initialize state that might cause hydration mismatches
 *
 * @param {any} initialValue - The initial value for the state
 * @param {any} defaultValue - The default value to use during SSR
 * @returns {[any, function]} [currentValue, setValue]
 */
export function useSafeState(initialValue, defaultValue = null) {
  const isHydrated = useHydration();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isHydrated) {
      setValue(initialValue);
    }
  }, [isHydrated, initialValue]);

  return [value, setValue];
}

/**
 * Hook to safely access browser APIs that might cause hydration mismatches
 *
 * @param {function} getValue - Function that returns the browser-dependent value
 * @param {any} defaultValue - Default value to use during SSR
 * @returns {any} The browser-dependent value or default
 */
export function useBrowserValue(getValue, defaultValue) {
  const isHydrated = useHydration();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        setValue(getValue());
      } catch (error) {
        console.warn("Error accessing browser API:", error);
      }
    }
  }, [isHydrated, getValue]);

  return value;
}
