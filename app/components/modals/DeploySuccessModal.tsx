import { useState } from "react";

import { Check, Copy, ExternalLink } from "lucide-react";

import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";

import { motion } from "framer-motion";

import { GlassMorphism } from "../animations/GlassMorphism";

interface DeploySuccessModalProps {
  open: boolean;
  onClose: () => void;
  deployUrl: string;
}

export default function DeploySuccessModal({
  open,
  onClose,
  deployUrl,
}: DeploySuccessModalProps) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(deployUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleVisitSite = () => {
    window.open(deployUrl, "_blank");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
          sx={{
            width: { xs: "90%", sm: "480px" },
            maxWidth: "95vw",
            outline: "none",
            mx: 2,
          }}
        >
          <GlassMorphism
            blur={15}
            opacity={0.9}
            borderColor="rgba(255, 255, 255, 0.25)"
            sx={{ p: 0 }}
          >
            <Box
              sx={{
                height: 6,
                width: "100%",
                background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
              }}
            />

            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    boxShadow: `0 8px 24px ${theme.palette.success.main}40`,
                  }}
                >
                  <Check size={40} color="white" />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Deployment Successful!
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: "text.secondary",
                    lineHeight: 1.6,
                  }}
                >
                  Your portfolio is now live and ready to be shared with the
                  world.
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    p: 2,
                    borderRadius: theme.shape.borderRadius,
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 4,
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      color: "text.primary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {deployUrl}
                  </Typography>
                  <Tooltip
                    title={copied ? "Copied!" : "Copy URL"}
                    placement="top"
                  >
                    <IconButton
                      onClick={handleCopyUrl}
                      sx={{
                        color: copied
                          ? theme.palette.success.main
                          : "text.secondary",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Copy size={18} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                      borderColor: "rgba(0, 0, 0, 0.12)",
                      color: "text.primary",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "text.primary",
                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleVisitSite}
                    startIcon={<ExternalLink size={18} />}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                      color: "#fff",
                      fontWeight: 600,
                      boxShadow: "0px 4px 12px rgba(52, 199, 89, 0.2)",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        boxShadow: "0px 6px 15px rgba(52, 199, 89, 0.3)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Visit Site
                  </Button>
                </Box>
              </Box>
            </Box>
          </GlassMorphism>
        </Box>
      </Fade>
    </Modal>
  );
}
