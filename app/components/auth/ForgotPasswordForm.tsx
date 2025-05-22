"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Mail } from "lucide-react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  Grid,
  Snackbar,
} from "@mui/material";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import JsonLd from "../JsonLd";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { sendOTP } from "@/lib/redux/slices/authSlice";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      localStorage.setItem("email", email);
      const result = await dispatch(sendOTP({ email }));
      if (result.type === "auth/sendOTP/fulfilled") {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 3000);
        setTimeout(() => {
          router.push(
            "/AIWebsiteBuilders/auth/forgot-password/otp-verification"
          );
        }, 1500);
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  // Structured data for the form
  const formSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Forgot Password",
    description: "Reset your TradesBuilder account password",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "/",
            name: "Home",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "/auth/forgot-password",
            name: "Forgot Password",
          },
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={formSchema} />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          py: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "url(https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          },
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassMorphism
              blur={15}
              opacity={0.1}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: "16px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Forget Password
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  mb: 4,
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Please enter your email address to receive a verification code
                to reset your password.
              </Typography>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    backgroundColor: "rgba(255, 99, 71, 0.1)",
                    color: "#ff6b6b",
                    border: "1px solid rgba(255, 99, 71, 0.3)",
                    "& .MuiAlert-icon": {
                      color: "#ff6b6b",
                    },
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      {...register("email", { required: true })}
                      error={!!errors.email}
                      helperText={errors.email ? "Email is required" : ""}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Mail size={20} color="rgba(255, 255, 255, 0.7)" />
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldStyles}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        mt: 2,
                        p: 1.5,
                        borderRadius: "8px",
                        background:
                          "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </GlassMorphism>
          </MotionBox>
        </Container>

        <Snackbar
          open={resendSuccess}
          autoHideDuration={3000}
          onClose={() => setResendSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            sx={{
              backgroundColor: "rgba(52, 199, 89, 0.2)",
              color: "#34C759",
              border: "1px solid rgba(52, 199, 89, 0.3)",
              "& .MuiAlert-icon": {
                color: "#34C759",
              },
            }}
          >
            New verification code has been sent to your email!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiFormHelperText-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .Mui-error": {
    color: "#ff6b6b",
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff6b6b",
  },
};
