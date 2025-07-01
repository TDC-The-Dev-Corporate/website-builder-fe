"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`;

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner = ({
  message = "Loading amazing things...",
  size = 40,
}: LoadingSpinnerProps) => {
  // Variants for staggered animation of dots
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    animate: (i: number) => ({
      y: i % 2 === 0 ? [-6, 6, -6] : [6, -6, 6],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: 3,
      }}
    >
      <Box
        component={motion.div}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(10px)",
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 500,
            mb: 1,
            color: "text.primary",
            fontSize: "1.1rem",
          }}
        >
          {message}
        </Typography>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            marginTop: 1,
          }}
        >
          {[0, 1, 2].map((i) => (
            <MotionBox
              key={i}
              custom={i}
              initial={{ y: 0 }}
              animate={{
                y: [0, -8, 0, 8, 0], // up -> center -> down -> center
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2, // wave-like delay
              }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "primary.main",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
