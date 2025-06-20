"use client";

import { useState, useEffect } from "react";
import { Box, Fab, Zoom } from "@mui/material";
import { ChevronUp } from "lucide-react";
import { keyframes } from "@mui/system";
import MotionBox from "../animations/MotionBox";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={visible}>
      <Box
        onClick={scrollToTop}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 30 },
          right: { xs: 20, md: 30 },
          zIndex: 999,
        }}
      >
        <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Fab
            color="primary"
            aria-label="scroll back to top"
            sx={{
              background: "linear-gradient(145deg, #6366f1, #3b82f6)",
              animation: `${pulse} 2s infinite`,
              "&:hover": {
                background: "linear-gradient(145deg, #3b82f6, #2563eb)",
              },
            }}
          >
            <ChevronUp size={24} />
          </Fab>
        </MotionBox>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;
