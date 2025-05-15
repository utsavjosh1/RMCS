"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Hook to prevent unintended navigation away from a page
 * This is useful for game rooms where the user might accidentally close or navigate away
 * 
 * @param {boolean} shouldPrevent - Whether navigation should be prevented
 * @param {string} message - The message to show in the confirmation dialog
 * @param {Function} onAttemptedNavigation - Optional callback when navigation is attempted
 */
export function usePreventNavigation(shouldPrevent, message, onAttemptedNavigation) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if we shouldn't prevent navigation
    if (!shouldPrevent) return;

    // Handle browser back/forward navigation and tab/window close
    const handleBeforeUnload = (e) => {
      if (onAttemptedNavigation) {
        onAttemptedNavigation();
      }
      
      // Standard way to show confirmation dialog
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Remove event listeners
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldPrevent, message, onAttemptedNavigation, router, pathname]);
} 