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
import { Layout, Sparkles, ArrowLeft } from "lucide-react";
import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

interface TemplateOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

interface TemplateScreenProps {
  onSelect: (template: string) => void;
  onBack: () => void;
  transition: "entering" | "exiting" | "idle";
}

export default function TemplateScreen({
  onSelect,
  onBack,
  transition,
}: TemplateScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  const options: TemplateOption[] = [
    {
      id: "template",
      title: "Select a Template",
      icon: <Layout size={32} />,
      description:
        "Choose from pre-designed professional templates tailored for tradesmen.",
      image:
        "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "ai",
      title: "Start with AI",
      icon: <Sparkles size={32} />,
      description:
        "Let our AI build a custom website based on your specific needs and brand.",
      image:
        "https://img.freepik.com/free-photo/futuristic-new-year-s-eve-celebration_23-2151084843.jpg?ga=GA1.1.2073206093.1735733696&semt=ais_hybrid&w=740",
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
          How would you like to start?
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            mb: 5,
          }}
        >
          Choose the best option for building your website.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {options.map((option) => (
            <Grid item xs={12} md={6} key={option.id}>
              <OptionCard
                option={option}
                isSelected={selectedOption === option.id}
                onSelect={() => handleSelect(option.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!selectedOption}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "8px",
              background: selectedOption
                ? "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)"
                : "rgba(255, 255, 255, 0.1)",
              color: selectedOption ? "white" : "rgba(255, 255, 255, 0.5)",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                background: selectedOption
                  ? "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)"
                  : "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </GlassMorphism>
    </MotionBox>
  );
}

interface OptionCardProps {
  option: TemplateOption;
  isSelected: boolean;
  onSelect: () => void;
}

const OptionCard = ({ option, isSelected, onSelect }: OptionCardProps) => {
  const isDisabled = option.id === "ai";
  return (
    <MotionBox
      component={Paper}
      onClick={onSelect}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: isDisabled ? "not-allowed" : "pointer",
        backgroundColor: "transparent",
        border: `2px solid ${
          isSelected ? "#3b82f6" : "rgba(255, 255, 255, 0.1)"
        }`,
        borderRadius: "16px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        pointerEvents: isDisabled ? "none" : "auto",
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
              zIndex: 2,
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
              zIndex: 2,
            }
          : {},
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          },
        }}
      >
        <Box
          component="img"
          src={option.image}
          alt={option.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            ...(isSelected && {
              transform: "scale(1.05)",
            }),
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "white",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {option.title}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 3,
          backgroundColor: isSelected
            ? "rgba(59, 130, 246, 0.2)"
            : "rgba(255, 255, 255, 0.05)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: isSelected
                ? "rgba(59, 130, 246, 0.3)"
                : "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              color: isSelected ? "#3b82f6" : "rgba(255, 255, 255, 0.7)",
              transition: "all 0.3s ease",
            }}
          >
            {option.icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "white",
            }}
          >
            {option.title}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.6,
          }}
        >
          {option.description}
        </Typography>
      </Box>
    </MotionBox>
  );
};
