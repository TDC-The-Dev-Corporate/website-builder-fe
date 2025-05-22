"use client";

import { useRef } from "react";

import { Box } from "@mui/material";

import Navbar from "@/app/components/landing/Navbar";
import Hero from "@/app/components/landing/Hero";
import Features from "@/app/components/landing/Features";
import Showcase from "@/app/components/landing/Showcase";
import CallToAction from "@/app/components/landing/CallToAction";
import ScrollToTop from "@/app/components/landing/ScrollToTop";
import Footer from "@/app/components/landing/Footer";
import JsonLd from "./JsonLd";

export default function HomePage() {
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
    <Box sx={{ overflow: "hidden" }}>
      <JsonLd data={websiteSchema} />
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
