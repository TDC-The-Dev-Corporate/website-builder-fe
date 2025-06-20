"use client";

import { useRef, useEffect } from "react";

import { Box } from "@mui/material";

import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "@/app/components/landing/Hero";
import ScrollToTop from "@/app/components/landing/ScrollToTop";
import JsonLd from "./JsonLd";
import { Navbar } from "./landing/Navbar";
import { Features } from "./landing/Features";
import { Showcase } from "./landing/Showcase";
import { CallToAction } from "./landing/CallToAction";
import { Footer } from "./landing/Footer";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const sections = [
    { id: "hero", label: "Home", ref: heroRef },
    { id: "features", label: "Features", ref: featuresRef },
    { id: "showcase", label: "Showcase", ref: showcaseRef },
    { id: "cta", label: "Contact", ref: ctaRef },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TradesBuilder",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    description:
      "Create professional, customizable websites for your trade business in minutes. No coding required.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Box sx={{ overflow: "hidden", bgcolor: "black", minHeight: "100vh" }}>
      <JsonLd data={websiteSchema} />
      <Navbar sections={sections} />
      <Box ref={heroRef} id="hero" data-aos="fade-up">
        <Hero />
      </Box>
      <Box ref={featuresRef} id="features" data-aos="fade-up">
        <Features />
      </Box>
      <Box ref={showcaseRef} id="showcase" data-aos="fade-up">
        <Showcase />
      </Box>
      <Box ref={ctaRef} id="cta" data-aos="fade-up">
        <CallToAction />
      </Box>
      <Footer />
      <ScrollToTop />
    </Box>
  );
}
