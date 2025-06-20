"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Container, Typography, Button } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const Hero = () => {
  const router = useRouter();

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: "url('/images/Texture.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          data-aos="fade-down"
          data-aos-delay="100"
          sx={{
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "16px !important",
            color: "#f0f0f0",
            mb: 4,
            mt: { xs: 2, md: 12 },
          }}
        >
          Skip The Hassle. Build & Launch Your Trade Site In 10 Minutes.
        </Typography>

        <Typography
          data-aos="zoom-in"
          data-aos-delay="200"
          sx={{
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 700,

            fontSize: {
              xs: "32px",
              sm: "42px",
              md: "52px",
              lg: "64px",
            },
            color: "white",
            mb: 4,
            lineHeight: "1.1",
          }}
        >
          FOCUS ON YOUR CRAFT — WE&apos;LL BUILD THE WEBSITE
        </Typography>

        <Box
          data-aos="fade-up"
          data-aos-delay="300"
          sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 8 }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              if (!localStorage.getItem("token"))
                router.push("/AIWebsiteBuilders/auth/login");
              else router.push("/AIWebsiteBuilders/home");
            }}
            sx={{
              height: "40px",
              padding: "8px 24px",
              borderRadius: "8px",
              backgroundColor: "white",
              color: "black",
              borderColor: "white",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderColor: "white",
                "& .rotate-icon": {
                  transform: "rotate(45deg)",
                },
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Start Building
            </Typography>
            <NorthEastIcon
              className="rotate-icon"
              sx={{
                width: "15px",
                height: "15px",
                marginLeft: "7px",
                transform: "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </Button>

          <Button
            variant="outlined"
            sx={{
              cursor: "not-allowed",
              height: "40px",
              padding: "8px 24px",
              borderRadius: "8px",
              border: "none",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Explore Features
            </Typography>
            <NorthEastIcon
              sx={{ width: "15px", height: "15px", marginLeft: "7px" }}
            />
          </Button>
        </Box>

        <Typography
          data-aos="fade-up"
          data-aos-delay="400"
          sx={{
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "16px !important",
            color: "#f0f0f0",
            mb: 3,
            mt: 5,
          }}
        >
          Trusted by more than 100 companies
        </Typography>

        <Box
          data-aos="zoom-in-up"
          data-aos-delay="500"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Image src="/images/Hero.png" alt="Logos" width={1089} height={474} />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
