"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { User, Briefcase, ArrowLeft } from "lucide-react";
import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

interface UsageTypeOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface UsageTypeScreenProps {
  onSelect: (usageType: string) => void;
  onBack: () => void;
  transition: "entering" | "exiting" | "idle";
}

export default function UsageTypeScreen({
  onSelect,
  onBack,
  transition,
}: UsageTypeScreenProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  const usageTypes: UsageTypeOption[] = [
    {
      id: "personal",
      title: "Personal Use",
      icon: <User size={48} />,
      description:
        "You're an individual tradesperson or sole proprietor. You want a website for your personal business and services.",
    },
    {
      id: "professional",
      title: "Professional Use",
      icon: <Briefcase size={48} />,
      description:
        "You represent a trade company with multiple employees. You need a website to represent your organization.",
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
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <IconButton
          onClick={onBack}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ArrowLeft />
        </IconButton>
      </Box>

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
          Who is this website for?
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            mb: 5,
          }}
        >
          This helps us create the right features and content for your website.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {usageTypes.map((type) => (
            <Grid item xs={12} md={6} key={type.id}>
              <UsageTypeCard
                type={type}
                isSelected={selectedType === type.id}
                onSelect={() => handleSelect(type.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!selectedType}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "8px",
              background: selectedType
                ? "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)"
                : "rgba(255, 255, 255, 0.1)",
              color: selectedType ? "white" : "rgba(255, 255, 255, 0.5)",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                background: selectedType
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

interface UsageTypeCardProps {
  type: UsageTypeOption;
  isSelected: boolean;
  onSelect: () => void;
}

const UsageTypeCard = ({ type, isSelected, onSelect }: UsageTypeCardProps) => {
  return (
    <MotionBox
      component={Paper}
      onClick={onSelect}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      sx={{
        p: 4,
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
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: isSelected
            ? "rgba(59, 130, 246, 0.3)"
            : "rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          color: isSelected ? "#3b82f6" : "rgba(255, 255, 255, 0.7)",
          transition: "all 0.3s ease",
        }}
      >
        {type.icon}
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "white",
          mb: 2,
        }}
      >
        {type.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          lineHeight: 1.6,
        }}
      >
        {type.description}
      </Typography>
    </MotionBox>
  );
};
