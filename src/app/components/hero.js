"use client";
import React, { useState, useEffect } from "react";

const slides = [
  {
    heading: "Discover",
    paragraph:
      "Check out the latest fashion trends and discover the forefront of fashion. Uncover the bold styles and innovative looks.",
    image: "/landing-1.png",
    icon: "/icons/icon-1.png",
  },
  {
    heading: "Explore",
    paragraph:
      "Dive into the world of exclusive designs and standout outfits. Fashion meets creativity at every step.",
    image: "/landing-2.png",
    icon: "/icons/icon-2.png",
  },
  {
    heading: "Inspire",
    paragraph:
      "Be the trendsetter with our curated collection. Express yourself through bold, innovative styles.",
    image: "/landing-3.png",
    icon: "/icons/icon-3.png",
  },
];


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

     const interval = setInterval(() => {
    handleNext();
  }, 2000);

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        .hero-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 4rem 2rem 2rem 2rem;
          border-radius: 1rem;
          max-width: 72rem;
          margin: 0 auto;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
        }

        @media (min-width: 768px) {
          .hero-container {
            flex-direction: row;
            align-items: center;
          }
        }

        .left-content {
          flex: 1 1 50%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.5s ease-in-out;
        }

        .icon-wrapper {
          margin-bottom: 0.1rem;
        }

        .icon-wrapper img {
          width: 45px;
          height: 45px;
          transition: all 0.5s ease-in-out;
        }

        .heading {
          font-weight: 600;
          font-size: clamp(24px, 4vw, 48px);
          color: #171717;
          margin-bottom: 0.4rem;
          margin-top: 0.2rem;
          transition: all 0.5s ease-in-out;
        }

        .paragraph {
          font-weight: 400;
          font-size: clamp(14px, 2vw, 18px);
          color: #171717;
          line-height: 1.5;
          margin-bottom: 1rem;
          margin-top: 0.2rem;
          transition: all 0.5s ease-in-out;
        }

        .carousel-indicators {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .indicator-active {
          width: 1rem;
          height: 0.5rem;
          border-radius: 9999px;
          background-color: #f97316;
          transition: all 0.3s ease-in-out;
        }

        .indicator-inactive {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background-color: #d1d5db;
          transition: all 0.3s ease-in-out;
        }

        .bottom-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .nav-button {
          font-size: 1.125rem;
          font-weight: 400;
          color: #000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .nav-button:hover {
          color: #f97316;
        }

        .next-arrow {
          font-size: 1.5rem;
          line-height: 1;
        }

        .right-content {
          flex: 1 1 50%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.5s ease-in-out;
        }

        .image-wrapper {
          max-width: 28rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.5s ease-in-out;
        }

        .image-wrapper img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          border-radius: 1rem;
          transition: all 0.5s ease-in-out;
        }

        /* ========== Mobile Overrides ========== */
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
             padding: 1.5rem 2rem 0rem 2rem;
             gap:1rem;
          }

          .left-content {
            align-items: center;
          }

          .bottom-row {
            display: none;
          }

          .carousel-indicators {
            justify-content: center;
                    margin: 0;
        padding: 0;
          }

          .image-wrapper {
          max-width: 28rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.5s ease-in-out;
        }

        .image-wrapper img {
          width: 95%;
          height: auto;
          object-fit: contain;
          display: block;
          border-radius: 1rem;
          transition: all 0.5s ease-in-out;
        }
        }
      `}</style>

      <div className="hero-container">
        {/* Show image first on mobile */}
        {isMobile && (
          <div className="right-content">
            <div className="image-wrapper">
              <img src={slides[currentSlide].image} alt="Fashion models" />
            </div>
          </div>
        )}

        <div className="left-content">
          <div className="icon-wrapper">
            <img src={slides[currentSlide].icon} alt="icon" />
          </div>

          <h2 className="heading">{slides[currentSlide].heading}</h2>

          <p className="paragraph">{slides[currentSlide].paragraph}</p>

          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={
                  index === currentSlide
                    ? "indicator-active"
                    : "indicator-inactive"
                }
              />
            ))}
          </div>

          <div className="bottom-row">
            <button className="nav-button" onClick={handlePrev}>
              ‹ Previous
            </button>

            <button className="nav-button" onClick={handleNext}>
              Next <span className="next-arrow">›</span>
            </button>
          </div>
        </div>

        {!isMobile && (
          <div className="right-content">
            <div className="image-wrapper">
              <img src={slides[currentSlide].image} alt="Fashion models" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
