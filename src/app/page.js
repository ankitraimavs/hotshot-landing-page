'use client';

import { useEffect } from "react";
import Hero from "./component-2/hero";
import Navbar from "./components/Navbar";
import WaitlistForm from "./component-2/WaitlistForm";
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

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <>
    <style jsx>{`
  .waitlist-overlay {
    position: fixed;
    bottom: 1.5rem;
    left: 7rem;
    right: 0;
    width: 100%;
    z-index: 50;
    background: transparent;
    pointer-events: none;
    display: flex;
  }

  .waitlist-overlay > div {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    .waitlist-overlay {
      left: 0;
      bottom: 2rem; /* Slightly less space on mobile */
      justify-content: center;
      padding: 0 0rem;
    }
  }
`}</style>


      <div className="bg-[#FFFFFF] min-h-screen relative">
        <Navbar />
        <Hero />

        {/* Transparent overlay floating over Hero's bottom */}
        <div className="waitlist-overlay">
          <div>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </>
  );
}
