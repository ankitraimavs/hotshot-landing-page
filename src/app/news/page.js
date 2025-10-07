'use client';

import { useEffect } from "react";
import Hero from "../../app/components/hero";
import Navbar from "../components/Navbar";
import WaitlistForm from "../components/WaitlistForm";
import posthog from 'posthog-js';

export default function Home() {
  useEffect(() => {
    const start = Date.now();

    const handleUnload = () => {
      const duration = (Date.now() - start) / 1000; 

      posthog.capture('time_on_page', {
        page: 'home',
        duration_seconds: duration,
      });
    };

    // Capture when user closes tab or reloads
    window.addEventListener('beforeunload', handleUnload);

    // Capture on route change or component unmount
    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div className="bg-[#F5EEE1] min-h-screen m-0 p-0">
      <Navbar />
      <Hero />
      <WaitlistForm />
    </div>
  );
}
