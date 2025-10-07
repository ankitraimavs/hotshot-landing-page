"use client";
import React, { useState, useEffect } from "react";

const slides = [
    {
        heading: "Discover",
        paragraph:
            "Check out the latest fashion trends and discover the forefront of fashion. Uncover the bold styles and innovative looks.",
        image: "/landing-7.png",
        icon: "/icons/icon-1.png",
        color: "#6366f1",
    },
    {
        heading: "Explore",
        paragraph:
            "Dive into the world of exclusive designs and standout outfits. Fashion meets creativity at every step.",
        image: "/landing-9.png",
        icon: "/icons/icon-2.png",
        color: "#BFB74C",
    },
    {
        heading: "Inspire",
        paragraph:
            "Be the trendsetter with our curated collection. Express yourself through bold, innovative styles.",
        image: "/landing-6.png",
        icon: "/icons/icon-3.png",
        color: "#FDBC17",
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

    // Preload all slide images on mount
    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image;
        });
    }, []);

    // Handle responsive detection and auto slide
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');



        .top-banner {
  background-color: #ffffffff;
  padding: 0.5rem 0rem 0rem 0rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  text-align: center;
  margin: 0.2rem auto;
  max-width: 80vw;
  color: #0f172a;
}

.top-banner strong {
  font-weight: 600;
  color: #0f172a;
}

        .hero-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 0rem 2rem 2rem 2rem;
          border-radius: 1rem;
          max-width: 72rem;
          margin: 0 auto;
          justify-content: start;
          align-items: flex-start;
          font-family: 'Poppins', sans-serif;
        }

        @media (min-width: 768px) {
          .hero-container {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        .left-content {
          flex: 1 1 50%;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0rem 0rem 0rem 0rem;
          justify-content: center;
        }

        .icon-wrapper {
          margin-bottom: 0.1rem;
        }

        .icon-wrapper img {
          width: 45px;
          height: 45px;
        }

        .headline-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 0.6rem;
        }

        .headline-gradient {
          position: absolute;
          top: -1.5rem;
          left: -1.5rem;
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          z-index: 0;
          filter: blur(15px);
          opacity: 0.6;
        }

        .heading {
          font-weight: 600;
          font-size: clamp(24px, 4vw, 48px);
          color: #171717;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .paragraph {
          font-weight: 400;
          font-size: clamp(14px, 2vw, 18px);
          color: #171717;
          line-height: 1.5;
          margin-bottom: 1rem;
          margin-top: 0.2rem;
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
        }

        .image-wrapper {
          max-width: 28rem;
          width: 100%;
          height: auto;
          position: relative;
        }

 .image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.8s ease-in-out, transform 0.5s ease-in-out;
  border-radius: 1rem;
  z-index: 1;
}

.image-wrapper img.active {
  position: relative;
  opacity: 1;
  transform: translateX(-12px); /* Subtle left movement */
  z-index: 2;
}


        /* ========== Mobile Overrides ========== */
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 2rem 0rem 2rem;
            gap: 1rem;
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
            max-width: 23rem;
            width: 100%;
            justify-content: center;
            align-items: center;
          }

          .image-wrapper img {
            width: 95%;
          }
        }
      `}</style>

            <div className="top-banner">
                <p>
                    <em>A new social media app to </em>
                    <strong>see, create</strong>
                    <em> and </em>
                    <strong>try the latest fashions!</strong>
                </p>
            </div>

            <div className="hero-container">
                {isMobile && (
                    <div className="right-content">
                        <div className="image-wrapper">
                            {slides.map((slide, index) => (
                                <img
                                    key={index}
                                    src={slide.image}
                                    alt={`Slide ${index}`}
                                    className={index === currentSlide ? "active" : ""}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="left-content">
                    <div className="icon-wrapper">
                        <img src={slides[currentSlide].icon} alt="icon" />
                    </div>

                    <div className="headline-wrapper">
                        <div
                            className="headline-gradient"
                            style={{
                                background: `radial-gradient(circle, ${slides[currentSlide].color}bb 0%, transparent 95%)`,
                            }}
                        />
                        <h2 className="heading">{slides[currentSlide].heading}</h2>
                    </div>

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
                            {slides.map((slide, index) => (
                                <img
                                    key={index}
                                    src={slide.image}
                                    alt={`Slide ${index}`}
                                    className={index === currentSlide ? "active" : ""}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Hero;
