import React, { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";

import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";

export const Showcase = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const tradeCards = [
    {
      id: 1,
      title: "Carpentry & Woodworking",
      description:
        "Showcase your craftsmanship with detailed project galleries.",
    },
    {
      id: 2,
      title: "Plumbing Services",
      description: "Highlight your plumbing expertise and emergency services.",
    },
    {
      id: 3,
      title: "Electrical Contractors",
      description: "Display your electrical projects and certifications.",
    },
  ];

  const carouselImages = [
    "/images/carousel1.png",
    "/images/carousel2.png",
    "/images/carousel3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        px: { xs: "1rem", md: "5rem" },
        mb: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Typography
        variant="h2"
        data-aos="fade-up"
        sx={{
          fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
          fontWeight: 700,
          color: "white",
          fontSize: { xs: "2.25rem", md: "64px !important" },
          textAlign: "center",
          letterSpacing: "1.28px",
          lineHeight: "1.1",
          maxWidth: "923px",
          mb: "2rem",
        }}
      >
        WEBSITES TAILORED FOR YOUR TRADE
      </Typography>

      <Typography
        data-aos="fade-up"
        sx={{
          fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
          fontWeight: 500,
          color: "#808080",
          fontSize: "16px !important",
          textAlign: "center",
          letterSpacing: "0",
          lineHeight: "20.5px",
          maxWidth: "1028px",
          mb: 2,
        }}
      >
        Create A Website That's Perfectly Suited To Your Specific Trade. Whether
        You're A Carpenter, Plumber, Electrician, Or Any Other Tradesperson, Our
        Templates Are Designed To Highlight Your Unique Skills And Services.
      </Typography>

      <Box
        sx={{
          width: "100%",
          mt: "4rem",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: "1.5rem",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: { xs: "100%", lg: "600px" },
          }}
        >
          {tradeCards.map((card, idx) => (
            <Card
              key={card.id}
              data-aos="fade-up"
              data-aos-delay={`${idx * 100}`}
              sx={{
                backgroundColor: "black",
                borderRadius: "20px",
                boxShadow: "none",
                height: "101px",
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "20px",
                  padding: "1px",
                  background: "linear-gradient(to bottom, #454545, #000000)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "1px",
                  background: "black",
                },
              }}
            >
              <CardContent sx={{ p: "1.5rem" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
                    fontWeight: 500,
                    color: "white",
                    fontSize: "20px !important",
                    letterSpacing: "0.4px",
                    lineHeight: "normal",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter", Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    color: "#808080",
                    fontSize: "16px",
                    letterSpacing: "0",
                    lineHeight: "17.5px",
                    mt: "0.5rem",
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outlined"
            data-aos="zoom-in"
            data-aos-delay="400"
            onClick={() => {
              if (!localStorage.getItem("token"))
                router.push("/AIWebsiteBuilders/auth/login");
              else router.push("/AIWebsiteBuilders/home");
            }}
            sx={{
              width: "200px",
              height: "40px",
              padding: "8px 24px",
              margin: "3% 0% 0% 5%",
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
                fontFamily: '"Inter", Helvetica, Arial, sans-serif',
                fontWeight: 400,
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Explore Templates
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
        </Box>

        <Box
          data-aos="fade-left"
          sx={{
            width: { xs: "100%", lg: "630px" },
            height: { xs: "300px", lg: "415px" },
            mt: { xs: "1.5rem", lg: 0 },
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          {carouselImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Carousel ${index + 1}`}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: index === activeIndex ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
                zIndex: index === activeIndex ? 1 : 0,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
