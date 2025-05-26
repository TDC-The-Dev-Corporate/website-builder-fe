"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 677,
          height: 677,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          backgroundImage: "url('/images/Textures.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: "30%",
          zIndex: 0,
          color: "white",
        }}
      />

      {/* Content Layer */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            fontFamily: "['Montserrat',Helvetica]",
            fontWeight: 500,
            fontSize: "16px",
            color: "#f0f0f0",
            mb: 3,
            mt: 5,
          }}
        >
          Skip The Hassle. Build & Launch Your Trade Site In 10 Minutes.
        </Typography>

        <Typography
          sx={{
            fontFamily: "['Montserrat',Helvetica]",
            fontWeight: 700,
            fontSize: "64px",
            color: "white",
            mb: 4,
          }}
        >
          FOCUS ON YOUR CRAFT — WE'LL BUILD THE WEBSITE
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 8 }}>
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
                  transform: "rotate(45deg)", // horizontal
                },
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Poppins", Helvetica, Arial, sans-serif',
                fontWeight: 400,
                fontSize: "16px",
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
              borderColor: "white",
              color: "white",
              backgroundColor: "#FFFFFF33",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Poppins", Helvetica, Arial, sans-serif',
                fontWeight: 400,
                fontSize: "16px",
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
          sx={{
            fontFamily: "['Montserrat',Helvetica]",
            fontWeight: 500,
            fontSize: "16px",
            color: "#f0f0f0",
            mb: 3,
            mt: 5,
          }}
        >
          Trusted by more than 100 companies
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image src="/images/Hero.png" alt="Logos" width={1089} height={474} />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
