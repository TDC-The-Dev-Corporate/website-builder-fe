"use client";

import { Box } from "@mui/material";

import { useRef } from "react";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import Showcase from "./components/landing/Showcase";
import CallToAction from "./components/landing/CallToAction";
import ScrollToTop from "./components/landing/ScrollToTop";
import Footer from "./components/landing/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "hero", label: "Home", ref: heroRef },
    { id: "features", label: "Features", ref: featuresRef },
    { id: "showcase", label: "Showcase", ref: showcaseRef },
    { id: "cta", label: "Contact", ref: ctaRef },
  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Navbar sections={sections} />
      <Box ref={heroRef} id="hero">
        <Hero />
      </Box>
      <Box ref={featuresRef} id="features">
        <Features />
      </Box>
      <Box ref={showcaseRef} id="showcase">
        <Showcase />
      </Box>
      <Box ref={ctaRef} id="cta">
        <CallToAction />
      </Box>
      <Footer />
      <ScrollToTop />
    </Box>
  );
}
