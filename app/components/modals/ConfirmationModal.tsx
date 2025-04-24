import { ReactNode, useState } from "react";

import { X } from "lucide-react";

import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  useTheme,
  TextField,
} from "@mui/material";

import { motion } from "framer-motion";

import { GlassMorphism } from "../animations/GlassMorphism";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string | ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: (draftName: string) => void;
  severity?: "info" | "success" | "warning" | "error";
  draftNameLabel?: string;
  defaultDraftName?: string;
}

export default function ConfirmationModal({
  open,
  onClose,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  severity = "info",
  draftNameLabel = "Draft name",
  defaultDraftName = "",
}: ConfirmationModalProps) {
  const theme = useTheme();
  const [draftName, setDraftName] = useState(defaultDraftName);
  const [isDraftNameEmpty, setIsDraftNameEmpty] = useState(false);

  const getColor = () => {
    switch (severity) {
      case "success":
        return theme.palette.success.main;
      case "warning":
        return theme.palette.warning.main;
      case "error":
        return theme.palette.error.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  const getGradient = () => {
    switch (severity) {
      case "success":
        return `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`;
      case "warning":
        return `linear-gradient(135deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.main} 100%)`;
      case "error":
        return `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`;
      default:
        return "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)";
    }
  };

  const handleConfirm = () => {
    if (!draftName.trim()) {
      setIsDraftNameEmpty(true);
      return;
    }
    onConfirm(draftName);
  };

  const handleDraftNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftName(e.target.value);
    if (isDraftNameEmpty && e.target.value.trim()) {
      setIsDraftNameEmpty(false);
    }
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          sx={{
            width: { xs: "90%", sm: "450px" },
            maxWidth: "95vw",
            maxHeight: "90vh",
            overflow: "auto",
            outline: "none",
            mx: 2,
          }}
        >
          <GlassMorphism
            blur={15}
            opacity={0.85}
            borderColor="rgba(255, 255, 255, 0.2)"
            sx={{
              p: 0,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: 6,
                width: "100%",
                background: getGradient(),
              }}
            />

            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    color: getColor(),
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                >
                  {title}
                </Typography>
                <Button
                  onClick={onClose}
                  sx={{
                    minWidth: "auto",
                    p: 1,
                    borderRadius: "50%",
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <X size={20} />
                </Button>
              </Box>

              <Box sx={{ my: 3 }}>
                {typeof message === "string" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {message}
                  </Typography>
                ) : (
                  message
                )}

                <TextField
                  fullWidth
                  label={draftNameLabel}
                  value={draftName}
                  onChange={handleDraftNameChange}
                  sx={{ mt: 3 }}
                  variant="outlined"
                  autoFocus
                  error={isDraftNameEmpty}
                  helperText={isDraftNameEmpty ? "Draft name is required" : ""}
                  required
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 3,
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
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
                  {cancelText}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                    background: getGradient(),
                    color: "#fff",
                    fontWeight: 600,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {confirmText}
                </Button>
              </Box>
            </Box>
          </GlassMorphism>
        </Box>
      </Fade>
    </Modal>
  );
}
