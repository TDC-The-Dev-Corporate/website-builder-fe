"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getRandomQuote } from "@/lib/utils";
import { GlassMorphism } from "../animations/GlassMorphism";
import MotionBox from "../animations/MotionBox";
import { useRouter } from "next/navigation";

const HeroWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  background: `linear-gradient(135deg, ${theme.palette.appleBlue.dark} 0%, ${theme.palette.primary.main} 100%)`,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "url(https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0,
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  backgroundImage: `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${theme.palette.appleGray.light} 100%)`,
  display: "inline-block",
}));

const CircleDecoration = styled(Box)<{
  size: number;
  top: number;
  left: number;
  opacity: number;
}>(({ theme, size, top, left, opacity }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.appleGreen.main} 0%, ${theme.palette.appleBlue.light} 100%)`,
  filter: "blur(60px)",
  opacity: opacity,
  top: `${top}%`,
  left: `${left}%`,
  zIndex: 0,
}));

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { scrollY } = useScroll();
  const [quote, setQuote] = useState("");

  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Button hover animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  };

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) router.push("/AIWebsiteBuilders/home");
    else router.push("/AIWebsiteBuilders/auth/login");
  };

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <HeroWrapper>
      <CircleDecoration size={300} top={10} left={-10} opacity={0.4} />
      <CircleDecoration size={200} top={60} left={70} opacity={0.3} />
      <CircleDecoration size={400} top={70} left={20} opacity={0.2} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              sx={{ mb: 2 }}
            >
              <GlassMorphism
                elevation={0}
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 1,
                  mb: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "common.white" }}
                >
                  The Ultimate Website Builder for Tradesmen
                </Typography>
              </GlassMorphism>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  fontWeight: 700,
                  color: "common.white",
                  mb: 2,
                  lineHeight: 1.1,
                }}
              >
                Showcase Your <GradientText>Craftsmanship</GradientText> Online
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              sx={{ mb: 4 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  fontWeight: 400,
                  maxWidth: 600,
                }}
              >
                {quote}
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
            >
              <Button
                component={motion.button}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                size="large"
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
                sx={{
                  py: 1.5,
                  px: 3,
                  boxShadow: "0 10px 20px rgba(52, 199, 89, 0.3)",
                  borderRadius: "12px",
                  backgroundColor: theme.palette.appleGreen.main,
                  fontSize: "1rem",
                }}
                onClick={handleGetStarted}
              >
                Get Started
              </Button>

              <Button
                disabled
                component={motion.button}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                size="large"
                variant="outlined"
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: "12px",
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  fontSize: "1rem",
                  "&:hover": {
                    borderColor: "white",
                  },
                }}
                href="#features"
              >
                Explore Features
              </Button>
            </MotionBox>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: { xs: "none", md: "block" },
              position: "relative",
            }}
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ y }}
            >
              <Box
                component="img"
                src="https://img.freepik.com/free-photo/young-businessman-working-from-his-office_181624-24379.jpg?ga=GA1.1.2073206093.1735733696&semt=ais_hybrid&w=740"
                alt="Tradesman at work"
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  height: "150%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "24px",
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  border: "10px solid rgba(255, 255, 255, 0.1)",
                }}
              />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
};

export default Hero;
