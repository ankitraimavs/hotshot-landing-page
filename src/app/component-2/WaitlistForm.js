'use client';
import React, { useState, useEffect } from "react";
import posthog from "posthog-js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"; 

const getStyles = (isMobile,showForm) => ({
   container: {
    fontFamily: "sans-serif",
    padding: isMobile ? "1rem 1rem" : "1rem",
    display: "flex",
    justifyContent: "center",
    overflowX: "hidden",
    boxSizing: "border-box",
    backgroundColor: isMobile && showForm ? "#fff" : "transparent", // ← Add background when mobile & form is open
    borderRadius: isMobile && showForm ? "12px" : "0", // Optional: rounded corners on mobile
    boxShadow: isMobile && showForm ? "0 4px 12px rgba(0,0,0,0.1)" : "none", // Optional: subtle shadow
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  innerWrapper: {
    width: "100%",
    maxWidth: "1200px",
    boxSizing: "border-box",
  },
  heading: {
    color: "#1c1c1c",
    fontWeight: "600",
    fontSize: isMobile ? "22px" : "32px",
    marginBottom: "1.5rem",
    lineHeight: 1.4,
    marginTop: "0.5rem",
    textAlign: isMobile ? "center" : "left",
  },
  boldSpan: {
    fontWeight: "700",
  },
  form: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "0.75rem 1.7rem 0.75rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid #2B2B2B",
    fontSize: "16px",
    outline: "none",
    width: isMobile ? "100%" : "270px",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 0.75rem 0.75rem 0.75rem",
    backgroundColor: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "30px",
    fontSize: isMobile ? "18px" : "20px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    width: isMobile ? "100%" : "240px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  icon: {
    width: "36px",
    height: "36px",
    objectFit: "contain",
    flexShrink: 0,
  },
  message: {
    marginTop: "1rem",
    color: "#1c1c1c",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: isMobile ? "center" : "left",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "0.5rem",
  },
  toggleButton: {
    backgroundColor: "#2B2B2B",
    color: "#fff",
    borderRadius: "30px",
    fontSize: "18px",
    fontWeight: "500",
    padding: "0.75rem 1.5rem",
    border: "none",
    cursor: "pointer",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  }
});

const WaitlistForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [showForm, setShowForm] = useState(false); // controls form visibility on mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowForm(true); // always show form on desktop/tablet
      } else {
        setShowForm(false); // hide form initially on mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = getStyles(isMobile,showForm);

  const validate = () => {
    let nameError = "";
    let emailError = "";

    if (!formData.name.trim()) {
      nameError = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      emailError = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      emailError = "Enter a valid email address.";
    }

    setErrors({ name: nameError, email: emailError });

    return !nameError && !emailError;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const handleInputClick = (fieldName) => {
    posthog.capture("waitlist_input_clicked", { field: fieldName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    posthog.capture("waitlist_form_submitted", {
      name: formData.name,
      email: formData.email,
    });

    try {
      await addDoc(collection(db, "waitlist"), {
        name: formData.name,
        email: formData.email,
        timestamp: new Date(),
      });

      setMessage("Your response has been saved!");
      setFormData({ name: "", email: "" });
      if (isMobile) {
      setTimeout(() => {
        setShowForm(false);
        setMessage(""); 
      }, 4000);
    }
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Error submitting form. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrapper}>
        {!showForm && isMobile ? (
          // Only show button on mobile if form is hidden
          <button
            style={styles.toggleButton}
            onClick={() => setShowForm(true)}
            aria-label="Show waitlist form"
          >
            Join the waitlist
            {/* <img src="/icons/icon-4.png" alt="Arrow" style={styles.icon} /> */}
          </button>
        ) : (
          <>
            <h2 style={styles.heading}>
              Sounds like you?{" "}
              <span style={styles.boldSpan}>Join our waitlist to know more</span>
            </h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{ width: isMobile ? "100%" : "auto" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  onClick={() => handleInputClick("name")}
                  style={styles.input}
                  required
                />
                {errors.name && <div style={styles.error}>{errors.name}</div>}
              </div>

              <div style={{ width: isMobile ? "100%" : "auto" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  onClick={() => handleInputClick("email")}
                  style={styles.input}
                  required
                />
                {errors.email && <div style={styles.error}>{errors.email}</div>}
              </div>

              <button type="submit" style={styles.button}>
                Join the waitlist
                {/* <img src="/icons/icon-4.png" alt="Arrow" style={styles.icon} /> */}
              </button>
            </form>

            {message && <div style={styles.message}>{message}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistForm;
