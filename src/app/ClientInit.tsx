'use client';

import { usePostHog } from './instrumentation-client';

export default function ClientInit() {
  usePostHog();
  return null; 
}
