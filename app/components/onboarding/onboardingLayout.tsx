"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MotionBox from "../animations/MotionBox";
import { GlassMorphism } from "../animations/GlassMorphism";
import LoadingSpinner from "../animations/LoadingSpinner";
interface OnboardingLayoutProps {
  children: React.ReactNode;
  activeStep: number;
  title: string;
  description?: string;
}

const steps = [
  "Your Details",
  "Business Info",
  "Trade Type",
  "Goals",
  "Template",
];

const StepConnector = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.divider,
  height: 3,
  flex: 1,
  margin: "0 8px",
}));

const OnboardingLayout = ({
  children,
  activeStep,
  title,
  description,
}: OnboardingLayoutProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading between steps
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeStep]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.light}10 0%, rgba(255,255,255,0) 70%)`,
          top: "-400px",
          right: "-200px",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.appleBlue.light}10 0%, rgba(255,255,255,0) 70%)`,
          bottom: "-300px",
          left: "-100px",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          py: 6,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 5 }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
            >
              {description}
            </Typography>
          )}

          <Box sx={{ width: "100%", mt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </MotionBox>

        <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <GlassMorphism
            sx={{
              width: "100%",
              maxWidth: 700,
              p: { xs: 3, sm: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 4,
            }}
          >
            {loading ? (
              <Box sx={{ py: 8 }}>
                <LoadingSpinner message="Preparing your next step..." />
              </Box>
            ) : (
              <MotionBox
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                sx={{ width: "100%" }}
              >
                {children}
              </MotionBox>
            )}
          </GlassMorphism>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingLayout;
