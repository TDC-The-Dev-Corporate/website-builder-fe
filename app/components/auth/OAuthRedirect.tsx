"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Box, CircularProgress, Typography } from "@mui/material";

const OAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(pathname.split("?")[1]);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token as string);
      router.push("/AIWebsiteBuilders/home");
    }
  }, [token, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <CircularProgress size={60} sx={{ color: "#3b82f6", mb: 4 }} />
      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontWeight: 600,
          mb: 2,
        }}
      >
        Completing your authentication
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Please wait while we redirect you...
      </Typography>
    </Box>
  );
};

export default OAuthRedirect;
