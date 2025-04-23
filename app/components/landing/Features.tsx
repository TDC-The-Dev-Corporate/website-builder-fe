"use client";

import { useState } from "react";

import {
  Box,
  Container,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { motion, AnimatePresence } from "framer-motion";

import {
  Palette,
  Wrench,
  LineChart,
  MessageSquare,
  Smartphone,
  Award,
} from "lucide-react";

import MotionBox from "../animations/MotionBox";
import { GlassMorphism } from "../animations/GlassMorphism";

const features = [
  {
    icon: <Palette size={24} />,
    color: "#0A84FF",
    title: "Professional Templates",
    description:
      "Choose from dozens of trade-specific templates designed to showcase your work professionally.",
    details: [
      "Pre-designed layouts for various trades",
      "Customizable color schemes",
      "Responsive designs that work on all devices",
    ],
  },
  {
    icon: <Wrench size={24} />,
    color: "#34C759",
    title: "Trade-Specific Features",
    description:
      "Tools tailored for tradesmen like quote builders, service listings, and project galleries.",
    details: [
      "Quote and invoice generators",
      "Service area mapping",
      "Project timeline visualization",
    ],
  },
  {
    icon: <LineChart size={24} />,
    color: "#FF9500",
    title: "Business Growth",
    description:
      "Built-in SEO tools, booking systems, and analytics to grow your customer base.",
    details: [
      "SEO optimization wizard",
      "Online booking integration",
      "Customer analytics dashboard",
    ],
  },
  {
    icon: <MessageSquare size={24} />,
    color: "#AF52DE",
    title: "Client Communication",
    description:
      "Integrated messaging, quote requests, and contact forms to connect with potential clients easily.",
    details: [
      "Real-time messaging system",
      "Automated quote responses",
      "Client feedback collection",
    ],
  },
  {
    icon: <Smartphone size={24} />,
    color: "#FF3B30",
    title: "Mobile-First Design",
    description:
      "Websites that look amazing on any device, ensuring clients can find you wherever they are.",
    details: [
      "Mobile-optimized interfaces",
      "Touch-friendly navigation",
      "Fast loading on cellular networks",
    ],
  },
  {
    icon: <Award size={24} />,
    color: "#5856D6",
    title: "Showcase Your Work",
    description:
      "Beautiful project galleries to highlight your quality craftsmanship with before/after comparisons.",
    details: [
      "Image gallery with zoom",
      "Before/after slider",
      "Project categorization",
    ],
  },
];

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.paper,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
    "&::before": {
      opacity: 1,
    },
  },
}));

const Features = () => {
  const theme = useTheme();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
    document.body.style.overflow = "hidden";
  };

  const handleCloseFeature = () => {
    setSelectedFeature(null);
    document.body.style.overflow = "";
  };

  return (
    <Box
      id="features"
      sx={{
        py: 12,
        position: "relative",
        backgroundColor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.75rem" },
            }}
          >
            Built for Tradesmen,{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "6px",
                  bottom: "-2px",
                  left: 0,
                  backgroundColor: "primary.main",
                  opacity: 0.3,
                  borderRadius: "3px",
                },
              }}
            >
              By Experts
            </Box>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 2,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Powerful tools designed specifically for tradespeople to grow their
            business online.
          </Typography>
        </MotionBox>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Click to view details" placement="right">
                  <FeatureIcon
                    onClick={() => handleFeatureClick(index)}
                    sx={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Box sx={{ color: feature.color }}>{feature.icon}</Box>
                  </FeatureIcon>
                </Tooltip>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {feature.title}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        <AnimatePresence>
          {selectedFeature !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 1200,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflowY: "auto",
                }}
                onClick={handleCloseFeature}
              >
                <GlassMorphism
                  sx={{
                    p: 4,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    backgroundColor: "white",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "3px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        backgroundColor: `${features[selectedFeature].color}20`,
                      }}
                    >
                      <Box sx={{ color: features[selectedFeature].color }}>
                        {features[selectedFeature].icon}
                      </Box>
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        textAlign: "center",
                        color: "text.primary",
                      }}
                    >
                      {features[selectedFeature].title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "600px",
                      }}
                    >
                      {features[selectedFeature].description}
                    </Typography>

                    <Box sx={{ width: "100%", mt: 2 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Key Features:
                      </Typography>
                      <Grid container spacing={2}>
                        {features[selectedFeature].details.map((detail, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                                p: 1.5,
                                borderRadius: "8px",
                                backgroundColor: "rgba(255,255,255,0.05)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mr: 2,
                                  backgroundColor: `${features[selectedFeature].color}30`,
                                  color: features[selectedFeature].color,
                                }}
                              >
                                {i + 1}
                              </Box>
                              <Typography variant="body2">{detail}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </GlassMorphism>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Features;
