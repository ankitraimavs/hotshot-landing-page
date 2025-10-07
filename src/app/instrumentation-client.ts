'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export function usePostHog() {
  useEffect(() => {
    console.log('🔥 usePostHog hook is running'); // Add this

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    console.log('🔑 PostHog Key:', key); // Add this
    console.log('🌍 PostHog Host:', host); // Add this

    posthog.init(key!, {
      api_host: host,
      capture_pageview: 'history_change',
      debug: true,
    });
  }, []);
}
