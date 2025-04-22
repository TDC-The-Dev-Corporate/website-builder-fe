"use client";

import { useState } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import {
  Lightbulb,
  PencilRuler,
  Building2,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";
import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

interface PurposeOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface PurposeScreenProps {
  onSelect: (purpose: string) => void;
  onBack: () => void;
  transition: "entering" | "exiting" | "idle";
}

export default function PurposeScreen({
  onSelect,
  onBack,
  transition,
}: PurposeScreenProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);

  const handleSelect = (purpose: string) => {
    setSelectedPurpose(purpose);
  };

  const handleContinue = () => {
    if (selectedPurpose) {
      onSelect(selectedPurpose);
    }
  };

  const purposes: PurposeOption[] = [
    {
      id: "portfolio",
      title: "Showcase Work",
      icon: <PencilRuler size={28} />,
      description:
        "Create a professional portfolio to display your projects and services",
    },
    {
      id: "business",
      title: "Grow Business",
      icon: <Building2 size={28} />,
      description: "Establish online presence and attract more clients",
    },
    {
      id: "brand",
      title: "Build Brand",
      icon: <Star size={28} />,
      description: "Develop your personal or business brand identity",
    },
    {
      id: "clients",
      title: "Reach Clients",
      icon: <Users size={28} />,
      description: "Connect with potential customers in your area",
    },
    {
      id: "marketing",
      title: "Marketing",
      icon: <TrendingUp size={28} />,
      description: "Create marketing materials and online campaigns",
    },
    {
      id: "other",
      title: "Something Else",
      icon: <Lightbulb size={28} />,
      description: "Tell us about your unique needs",
    },
  ];

  const getAnimationProps = () => {
    if (transition === "entering") {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };
    } else if (transition === "exiting") {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 0, y: -20 },
        transition: { duration: 0.5 },
      };
    }
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    };
  };

  return (
    <MotionBox sx={{ width: "100%", maxWidth: 900 }} {...getAnimationProps()}>
      <GlassMorphism
        blur={15}
        opacity={0.1}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: "white",
            mb: 1,
          }}
        >
          Why are you creating a website?
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            mb: 5,
          }}
        >
          This helps us tailor the experience specifically for your needs.
        </Typography>

        <Grid container spacing={3}>
          {purposes.map((purpose) => (
            <Grid item xs={12} sm={6} md={4} key={purpose.id}>
              <PurposeCard
                purpose={purpose}
                isSelected={selectedPurpose === purpose.id}
                onSelect={() => handleSelect(purpose.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!selectedPurpose}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "8px",
              background: selectedPurpose
                ? "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)"
                : "rgba(255, 255, 255, 0.1)",
              color: selectedPurpose ? "white" : "rgba(255, 255, 255, 0.5)",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                background: selectedPurpose
                  ? "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)"
                  : "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </GlassMorphism>
    </MotionBox>
  );
}

interface PurposeCardProps {
  purpose: PurposeOption;
  isSelected: boolean;
  onSelect: () => void;
}

const PurposeCard = ({ purpose, isSelected, onSelect }: PurposeCardProps) => {
  return (
    <MotionBox
      component={Paper}
      onClick={onSelect}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isSelected
          ? "rgba(59, 130, 246, 0.2)"
          : "rgba(255, 255, 255, 0.05)",
        border: `2px solid ${
          isSelected ? "#3b82f6" : "rgba(255, 255, 255, 0.1)"
        }`,
        borderRadius: "12px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&::before": isSelected
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderTop: "60px solid #3b82f6",
              borderLeft: "60px solid transparent",
            }
          : {},
        "&::after": isSelected
          ? {
              content: '"✓"',
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
            }
          : {},
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: isSelected
            ? "rgba(59, 130, 246, 0.3)"
            : "rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          color: isSelected ? "#3b82f6" : "rgba(255, 255, 255, 0.7)",
          transition: "all 0.3s ease",
        }}
      >
        {purpose.icon}
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "white",
          mb: 1,
        }}
      >
        {purpose.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          lineHeight: 1.5,
        }}
      >
        {purpose.description}
      </Typography>
    </MotionBox>
  );
};
