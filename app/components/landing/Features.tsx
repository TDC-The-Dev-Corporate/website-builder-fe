"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Palette,
  Wrench,
  LineChart,
  MessageSquare,
  Smartphone,
  Award,
} from "lucide-react";
import MotionBox from "../animations/MotionBox";

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.3s ease-in-out",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    "&::after": {
      transform: "translateY(0)",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    transform: "translateY(4px)",
    transition: "transform 0.3s ease-in-out",
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  background: theme.palette.background.default,
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
}));

const features = [
  {
    icon: <Palette size={24} />,
    color: "#0A84FF",
    title: "Professional Templates",
    description:
      "Choose from dozens of trade-specific templates designed to showcase your work professionally.",
  },
  {
    icon: <Wrench size={24} />,
    color: "#34C759",
    title: "Trade-Specific Features",
    description:
      "Tools tailored for tradesmen like quote builders, service listings, and project galleries.",
  },
  {
    icon: <LineChart size={24} />,
    color: "#FF9500",
    title: "Business Growth",
    description:
      "Built-in SEO tools, booking systems, and analytics to grow your customer base.",
  },
  {
    icon: <MessageSquare size={24} />,
    color: "#AF52DE",
    title: "Client Communication",
    description:
      "Integrated messaging, quote requests, and contact forms to connect with potential clients easily.",
  },
  {
    icon: <Smartphone size={24} />,
    color: "#FF3B30",
    title: "Mobile-First Design",
    description:
      "Websites that look amazing on any device, ensuring clients can find you wherever they are.",
  },
  {
    icon: <Award size={24} />,
    color: "#5856D6",
    title: "Showcase Your Work",
    description:
      "Beautiful project galleries to highlight your quality craftsmanship with before/after comparisons.",
  },
];

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Features = () => {
  const theme = useTheme();

  return (
    <Box
      id="features"
      sx={{
        py: 12,
        position: "relative",
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.light}15 0%, rgba(255,255,255,0) 70%)`,
          top: "-200px",
          right: "-100px",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
            business online and showcase their skills to potential clients.
          </Typography>
        </MotionBox>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionBox
                component={motion.div}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                sx={{ height: "100%" }}
              >
                <FeatureCard elevation={2}>
                  <IconBox sx={{ backgroundColor: `${feature.color}15` }}>
                    <Box sx={{ color: feature.color }}>{feature.icon}</Box>
                  </IconBox>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
