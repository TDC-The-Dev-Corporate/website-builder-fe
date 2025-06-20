import { styled, Typography } from "@mui/material";

export const ShinyText = styled(Typography)(({ color }: { color: string }) => ({
  position: "relative",
  display: "inline-block",
  color: color,
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
