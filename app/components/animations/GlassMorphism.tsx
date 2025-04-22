"use client";

import { styled } from "@mui/material/styles";
import { Box, BoxProps, Paper, PaperProps } from "@mui/material";

interface GlassMorphismProps extends PaperProps {
  blur?: number;
  opacity?: number;
  borderColor?: string;
}

const GlassMorphism = styled(Paper)<GlassMorphismProps>(
  ({ theme, blur = 10, opacity = 0.7, borderColor }) => ({
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    borderRadius: theme.shape.borderRadius * 2,
    border: borderColor
      ? `1px solid ${borderColor}`
      : "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    padding: theme.spacing(3),
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
    },
    "&:hover": {
      boxShadow: "0 15px 35px 0 rgba(31, 38, 135, 0.2)",
      transform: "translateY(-3px)",
    },
  })
);

const DarkGlassMorphism = styled(Paper)<GlassMorphismProps>(
  ({ theme, blur = 10, opacity = 0.7, borderColor }) => ({
    background: `rgba(15, 23, 42, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    borderRadius: theme.shape.borderRadius * 2,
    border: borderColor
      ? `1px solid ${borderColor}`
      : "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
    padding: theme.spacing(3),
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    color: theme.palette.common.white,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
    },
    "&:hover": {
      boxShadow: "0 15px 35px 0 rgba(0, 0, 0, 0.35)",
      transform: "translateY(-3px)",
    },
  })
);

export { GlassMorphism, DarkGlassMorphism };
