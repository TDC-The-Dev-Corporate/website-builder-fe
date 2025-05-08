"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Snackbar,
} from "@mui/material";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  resetPassword,
  sendOTP,
  verifyUser,
} from "@/lib/redux/slices/authSlice";

export default function VerifyOTP() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [isVerified, setIsVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      data = { ...data, email: localStorage.getItem("email") };
      const result = await dispatch(resetPassword(data));
      console.log("result", result);
      if (result.type === "auth/resetForgetPassword/fulfilled") {
        setIsVerified(true);
        setTimeout(() => {
          router.push("/AIWebsiteBuilders/auth/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  return (
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
            {isVerified ? (
              <ResetSuccess />
            ) : (
              <>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  Reset Your Password
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 4,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Please enter your new password
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
                        label="Password"
                        type="password"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={errors.email ? "Password is required" : ""}
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="Password"
                        {...register("confirmPassword", { required: true })}
                        error={!!errors.confirmPassword}
                        helperText={
                          errors.verificationCode
                            ? "Confirm Password is required"
                            : ""
                        }
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
                          "Reset Password"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </GlassMorphism>
        </MotionBox>
      </Container>
    </Box>
  );
}

const ResetSuccess = () => (
  <MotionBox
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    sx={{ textAlign: "center" }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        backgroundColor: "rgba(52, 199, 89, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        mb: 3,
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: "3rem",
          color: "#34C759",
        }}
      >
        ✓
      </Box>
    </Box>
    <Typography
      variant="h4"
      sx={{
        color: "white",
        fontWeight: 700,
        mb: 2,
      }}
    >
      Password Reset Successful!
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "rgba(255, 255, 255, 0.7)",
        mb: 3,
      }}
    >
      Your password has been reset successfully. Redirecting to login...
    </Typography>
    <CircularProgress size={30} sx={{ color: "#34C759" }} />
  </MotionBox>
);

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
