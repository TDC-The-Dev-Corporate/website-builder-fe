"use client";

import { Box } from "@mui/material";
import MotionBox from "@/app/components/animations/MotionBox";

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
}

export default function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      {Array.from({ length: steps }).map((_, index) => (
        <MotionBox
          key={index}
          animate={{
            scale: currentStep === index ? [1, 1.2, 1] : 1,
            opacity: currentStep === index ? 1 : 0.5,
          }}
          transition={{
            scale: {
              repeat: currentStep === index ? Infinity : 0,
              repeatType: "reverse",
              duration: 1.5,
            },
          }}
          sx={{
            width: currentStep === index ? 12 : 8,
            height: currentStep === index ? 12 : 8,
            borderRadius: "50%",
            backgroundColor:
              currentStep === index ? "#3b82f6" : "rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </Box>
  );
}
