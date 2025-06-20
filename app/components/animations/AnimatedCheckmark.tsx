"use client";

import { Box, keyframes } from "@mui/material";

interface AnimatedCheckmarkProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function AnimatedCheckmark({
  size = 100,
  color = "#34C759",
  strokeWidth = 8,
}: AnimatedCheckmarkProps) {
  const circleAnimation = keyframes`
    from {
      stroke-dashoffset: 314;
    }
    to {
      stroke-dashoffset: 0;
    }
  `;

  const checkAnimation = keyframes`
    from {
      stroke-dashoffset: 75;
    }
    to {
      stroke-dashoffset: 0;
    }
  `;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="314"
          strokeDashoffset="0"
          style={{
            animation: `${circleAnimation} 0.8s ease-in-out forwards`,
            transformOrigin: "center",
          }}
        />
        <polyline
          points="30,50 45,65 70,40"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="75"
          strokeDashoffset="0"
          style={{
            animation: `${checkAnimation} 0.5s ease-in-out 0.8s forwards`,
          }}
        />
      </svg>
    </Box>
  );
}
