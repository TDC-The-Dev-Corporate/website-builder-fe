"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface LoadingSpinnerProps {
  size?: number; // diameter of dot cluster
}

const LoadingSpinner = ({ size = 42 }: LoadingSpinnerProps) => {
  const dotSize = Math.max(6, Math.round(size / 6));

  // simple staggered vertical bounce for dots
  const dotAnimate = {
    y: [0, -8, 0],
  };

  return (
    <Box
      role="status"
      aria-label="Loading"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: 72,
      }}
    >
  <MotionBox
        whileHover={{ scale: 1.08 }}
        whileTap={{ rotate: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          cursor: "pointer",
          userSelect: "none",
          padding: 1,
          borderRadius: 2,
        }}
      >
        {[0, 1, 2].map((i) => (
          <MotionBox
            key={i}
            initial={{ y: 0, opacity: 0.9 }}
            animate={dotAnimate}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            sx={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              bgcolor: "primary.main",
              boxShadow: (theme) => `0 4px 10px ${theme.palette.primary.main}33`,
            }}
          />
        ))}
      </MotionBox>
    </Box>
  );
};

export default LoadingSpinner;
