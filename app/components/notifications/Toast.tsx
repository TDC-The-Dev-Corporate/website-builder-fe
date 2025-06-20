"use client";

import { forwardRef, ReactNode } from "react";

import { X } from "lucide-react";

import {
  Snackbar,
  Alert as MuiAlert,
  AlertProps,
  AlertTitle,
  Typography,
  IconButton,
} from "@mui/material";

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = "Alert";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  severity: "success" | "info" | "warning" | "error";
  title?: string;
  message: string | ReactNode;
  action?: ReactNode;
  duration?: number;
  position?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export default function Toast({
  open,
  onClose,
  severity,
  title,
  message,
  action,
  duration = 5000,
  position = { vertical: "bottom", horizontal: "right" },
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
      sx={{
        "& .MuiAlert-root": {
          width: "100%",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor:
            severity === "success"
              ? "rgba(52, 199, 89, 0.95)"
              : severity === "error"
              ? "rgba(255, 59, 48, 0.95)"
              : severity === "warning"
              ? "rgba(255, 149, 0, 0.95)"
              : "rgba(10, 132, 255, 0.95)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <Alert
        severity={severity}
        sx={{
          width: "100%",
          alignItems: "flex-start",
          "& .MuiAlert-icon": {
            pt: 0.5,
            color: "#fff",
          },
          "& .MuiAlert-message": {
            width: "100%",
          },
          "& .MuiAlert-action": {
            pt: 0.5,
            color: "#fff",
          },
        }}
        action={
          action || (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onClose}
            >
              <X size={18} />
            </IconButton>
          )
        }
      >
        {title && (
          <AlertTitle sx={{ fontWeight: 600, color: "#fff" }}>
            {title}
          </AlertTitle>
        )}
        {typeof message === "string" ? (
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {message}
          </Typography>
        ) : (
          message
        )}
      </Alert>
    </Snackbar>
  );
}
