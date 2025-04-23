"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { motion, useScroll, useTransform } from "framer-motion";

import { ArrowRight } from "lucide-react";

import MotionBox from "../animations/MotionBox";
import { ShinyText } from "../animations/ShinyText";

import { websiteExamples } from "@/app/types/constants";

const ShowcaseWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  overflow: "hidden",
}));

const DeviceFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 700,
  margin: "0 auto",
  borderRadius: "40px",
  background: "#111",
  padding: "12px",
  boxShadow:
    "0 50px 100px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 255, 255, 0.1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "0px",
    width: "40%",
    height: "30px",
    left: "30%",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    background: "#000",
    zIndex: 2,
  },
}));

const DeviceScreen = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: "30px",
  position: "relative",
  zIndex: 1,
  aspectRatio: "16/9",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  backgroundImage: `linear-gradient(135deg, ${theme.palette.appleGreen.main} 0%, ${theme.palette.appleGray.main} 100%)`,
  display: "inline-block",
}));

const Showcase = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const router = useRouter();

  const handleExploreTemplates = () => {
    const token = localStorage.getItem("token");
    if (token) router.push("/AIWebsiteBuilders/home");
    else router.push("/AIWebsiteBuilders/auth/login");
  };

  return (
    <ShowcaseWrapper ref={containerRef}>
      <Box
        sx={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.appleBlue.light}15 0%, rgba(255,255,255,0) 70%)`,
          bottom: "-400px",
          left: "-200px",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={8}
          alignItems="center"
          direction={isSmallScreen ? "column-reverse" : "row"}
        >
          <Grid item xs={12} md={6}>
            <MotionBox style={{ y }}>
              <DeviceFrame>
                <DeviceScreen>
                  <motion.img
                    key={activeIndex}
                    src={websiteExamples[activeIndex].image}
                    alt={websiteExamples[activeIndex].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </DeviceScreen>
              </DeviceFrame>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ mb: 2 }}
            >
              <Typography sx={{ fontWeight: "700px", color: "primary.main" }}>
                <ShinyText color="primary.main">
                  <GradientText>Showcase Your Work</GradientText>
                </ShinyText>
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Websites Tailored For Your Trade
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{ mb: 4 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Create a website that's perfectly suited to your specific trade.
                Whether you're a carpenter, plumber, electrician, or any other
                tradesperson, our templates are designed to highlight your
                unique skills and services.
              </Typography>
            </MotionBox>

            <Box sx={{ mb: 4 }}>
              {websiteExamples.map((example, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor:
                        activeIndex === index
                          ? "background.default"
                          : "transparent",
                      border:
                        activeIndex === index
                          ? `1px solid ${theme.palette.divider}`
                          : "1px solid transparent",
                      "&:hover": {
                        backgroundColor: "background.default",
                      },
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {example.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {example.description}
                    </Typography>
                  </Box>
                </MotionBox>
              ))}
            </Box>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: "12px",
                }}
                onClick={handleExploreTemplates}
              >
                Explore Templates
              </Button>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </ShowcaseWrapper>
  );
};

export default Showcase;
