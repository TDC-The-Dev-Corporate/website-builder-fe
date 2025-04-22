"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import MotionBox from "@/app/components/animations/MotionBox";
import PurposeScreen from "./PurposeScreen";
import UsageTypeScreen from "./UsageTypeScreen";
import TemplateScreen from "./TemplateScreen";
import ProgressIndicator from "./ProgressIndicator";

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    purpose: "",
    usageType: "",
    startOption: "",
  });
  const [transition, setTransition] = useState<"entering" | "exiting" | "idle">(
    "idle"
  );

  const totalSteps = 3;

  const handlePurposeSelect = (purpose: string) => {
    handleNext({ purpose });
  };

  const handleUsageTypeSelect = (usageType: string) => {
    handleNext({ usageType });
  };

  const handleTemplateSelect = (startOption: string) => {
    handleNext({ startOption }, true);
  };

  const handleNext = (
    update: Partial<typeof selections>,
    isLastStep = false
  ) => {
    setTransition("exiting");

    setTimeout(() => {
      setSelections((prev) => ({ ...prev, ...update }));

      if (isLastStep) {
        console.log("Final selections:", { ...selections, ...update });
        router.push("/AIWebsiteBuilders/auth/login");
      } else {
        setCurrentStep((prev) => prev + 1);
        setTransition("entering");

        setTimeout(() => {
          setTransition("idle");
        }, 500);
      }
    }, 500);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setTransition("exiting");

      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setTransition("entering");

        setTimeout(() => {
          setTransition("idle");
        }, 500);
      }, 500);
    }
  };

  const getProgressPercentage = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PurposeScreen
            onSelect={handlePurposeSelect}
            onBack={handleBack}
            transition={transition}
          />
        );
      case 1:
        return (
          <UsageTypeScreen
            onSelect={handleUsageTypeSelect}
            onBack={handleBack}
            transition={transition}
          />
        );
      case 2:
        return (
          <TemplateScreen
            onSelect={handleTemplateSelect}
            onBack={handleBack}
            transition={transition}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "url(https://images.pexels.com/photos/3914752/pexels-photo-3914752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          filter: "blur(2px)",
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ py: 3 }}>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundImage:
                  "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                borderRadius: 3,
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: 500,
              }}
            >
              Step {currentStep + 1} of {totalSteps}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: 500,
              }}
            >
              {Math.round(getProgressPercentage())}% Complete
            </Typography>
          </Box>
        </Box>

        <MotionBox
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderCurrentStep()}
        </MotionBox>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 3,
          }}
        >
          <ProgressIndicator steps={totalSteps} currentStep={currentStep} />
        </Box>
      </Container>
    </Box>
  );
}
