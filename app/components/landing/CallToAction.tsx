import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useRouter } from "next/navigation";

export const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 1280,
        height: "513px",
        mx: "auto",
        // my: 4,
        mb: 4,
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/CallToActionFrame.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 1,
          p: isMobile ? 4 : 10,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          sx={{
            fontFamily: "['Montserrat',Helvetica]",
            fontWeight: 700,
            fontSize: "64px !important",
            width: 800,
            lineHeight: "100&",
            letterSpacing: "2%",
          }}
        >
          TAKE YOUR TRADE BUSINESS TO THE NEXT LEVEL
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "['Montserrat',Helvetica]",
            fontWeight: 500,
            color: "#f0f0f0",
            fontSize: "20px",
            lineHeight: 1.6,
          }}
        >
          Your Trade Skills Deserve Professional Digital Representation.
        </Typography>

        <Button
          variant="outlined"
          onClick={() => {
            if (!localStorage.getItem("token"))
              router.push("/AIWebsiteBuilders/auth/login");
            else router.push("/AIWebsiteBuilders/home");
          }}
          sx={{
            width: "200px",
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
              fontFamily: '"Inter", Helvetica, Arial, sans-serif',
              fontWeight: 400,
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            Start Now
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
      </CardContent>
    </Card>
  );
};
