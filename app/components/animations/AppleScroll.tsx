"use client";

import { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

interface AppleScrollProps {
  children: React.ReactNode;
  speed?: number;
}

const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflowX: "hidden",
  width: "100%",
  height: "100%",
}));

const AppleScroll = ({ children, speed = 0.5 }: AppleScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  let lastScrollTop = 0;
  let animationFrame: number;

  // Smooth scroll implementation inspired by Apple's websites
  const smoothScroll = () => {
    if (!scrollRef.current || !contentRef.current) return;

    const scrollTop = window.scrollY;
    const direction = scrollTop > lastScrollTop ? 1 : -1;
    const distance = Math.abs(scrollTop - lastScrollTop);
    const speedFactor = speed * direction * (distance * 0.01);

    lastScrollTop = scrollTop;

    // Apply parallax effect to child elements
    Array.from(contentRef.current.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const factor = 1 - (index + 1) * 0.1;

      element.style.transform = `translateY(${speedFactor * factor}px)`;
      element.style.transition =
        "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    });

    animationFrame = requestAnimationFrame(smoothScroll);
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        animationFrame = requestAnimationFrame(smoothScroll);
      },
      { passive: true }
    );

    return () => {
      window.removeEventListener("scroll", () => {});
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <StyledBox ref={scrollRef}>
      <Box ref={contentRef}>{children}</Box>
    </StyledBox>
  );
};

export default AppleScroll;
