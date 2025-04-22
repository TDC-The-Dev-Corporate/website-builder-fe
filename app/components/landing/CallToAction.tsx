"use client";

import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getRandomQuote } from "@/lib/utils";
import MotionBox from "../animations/MotionBox";
import { useRouter } from "next/navigation";

const CTAWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(10, 0),
  background: `linear-gradient(135deg, ${theme.palette.appleBlue.dark} 0%, ${theme.palette.primary.main} 100%)`,
  overflow: "hidden",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 3,
  margin: theme.spacing(0, 2),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 4),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "url(https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0,
  },
}));

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

const ShinyText = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  color: theme.palette.common.white,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
    backgroundSize: "200% 100%",
    backgroundPosition: "100% 0",
    animation: "shine 3s infinite",
  },
  "@keyframes shine": {
    "0%": {
      backgroundPosition: "100% 0",
      opacity: 0,
    },
    "20%": {
      opacity: 1,
    },
    "100%": {
      backgroundPosition: "-100% 0",
      opacity: 0,
    },
  },
}));

const CallToAction = () => {
  const theme = useTheme();
  const quote = getRandomQuote();
  const router = useRouter();

  const handleStartBuilding = () => {
    const token = localStorage.getItem("token");
    if (token) router.push("/AIWebsiteBuilders/home");
    else router.push("/AIWebsiteBuilders/auth/login");
  };

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <CTAWrapper>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ mb: 4 }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: "common.white",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.75rem" },
                mb: 2,
              }}
            >
              Ready to <ShinyText>Elevate</ShinyText> Your Trade Business?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: 600,
                mx: "auto",
                fontWeight: 400,
              }}
            >
              {quote}
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                py: 1.75,
                px: 4,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor: theme.palette.common.white,
                // color: theme.palette.primary.main,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: theme.palette.common.white,
                },
              }}
              onClick={handleStartBuilding}
            >
              Start Building Now
            </Button>
          </MotionBox>
        </Container>
      </CTAWrapper>
    </Container>
  );
};

export default CallToAction;
