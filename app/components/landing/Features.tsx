import React, { JSX } from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export const Features = (): JSX.Element => {
  const featureCards = [
    {
      id: 1,
      title: "Professional Templates",
      description:
        "Choose from dozens of responsive, trade specific templates with customizable colours, designed to showcase your work professionally.",
      row: 1,
      column: 1,
      image: "/images/professional.png",
    },
    {
      id: 2,
      title: "Trade-Specific Features",
      description:
        "Tools tailored for tradesmen, including quote and invoice generators, service area mapping, and project timeline visualization.",
      row: 1,
      column: 2,
      image: "/images/trade-specific.png",
    },
    {
      id: 3,
      title: "Business Growth",
      description:
        "Grow your customer base with built-in SEO tools, online booking integration, and a customer analytics dashboard.",
      row: 1,
      column: 3,
      image: "/images/business.png",
    },
    {
      id: 4,
      title: "Client Communication",
      description:
        "Choose from dozens of responsive, trade specific templates with customizable colours, designed to showcase your work professionally.",
      row: 2,
      column: 1,
      image: "/images/communication.png",
    },
    {
      id: 5,
      title: "Mobile-First Design",
      description:
        "Mobile-optimized websites with touch-friendly navigation and fast loading, so clients can reach you on any device, anywhere.",
      row: 2,
      column: 2,
      image: "/images/responsive.png",
    },
    {
      id: 6,
      title: "Showcase your Work",
      description:
        "Showcase your craftsmanship with stunning project galleries, before/after sliders, and organized categories to impress every visitor.",
      row: 2,
      column: 3,
      image: "/images/showcase.png",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        backgroundColor: "black",
        pb: { xs: "40px", md: "70px" }, // 80px on desktop, 40px on mobile
        pt: { xs: "40px", md: "100px" },
        px: { xs: "1.25rem", md: "5rem" }, // 20px on mobile, 80px on desktop
      }}
    >
      <Box
        sx={{
          maxWidth: "1440px",
          mx: "auto",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            maxWidth: "923px",
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 700,
            color: "white",
            fontSize: { xs: "2.25rem", md: "3.75rem", lg: "4rem" }, // 36px, 60px, 64px
            letterSpacing: "1.28px",
            mb: "30px",
            lineHeight: "1.1",
          }}
        >
          DIGITAL SOLUTIONS FOR TRADESMEN
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "16px !important",
            color: "#808080",
            letterSpacing: "0.32px",
            mb: "50px",
          }}
        >
          Professional Tools That Help You Showcase Your Work And Win More
          Clients
        </Typography>

        <Grid container spacing={{ xs: 1.25, md: 2.5 }}>
          {featureCards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={card.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-aos-duration="800"
            >
              <Card
                sx={{
                  maxWidth: "413px",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  border: "none",
                  boxShadow: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "215px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  alt={card.title}
                  src={card.image}
                />
                <CardContent
                  sx={{
                    pt: "1.25rem",
                    pb: "1.5rem",
                    px: "1.5rem",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
                      fontWeight: 500,
                      color: "white",
                      fontSize: "20px !important",
                      letterSpacing: "0.4px",
                      mb: "0.75rem",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      color: "#808080",
                      fontSize: "16px !important",
                      lineHeight: "17.5px",
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
