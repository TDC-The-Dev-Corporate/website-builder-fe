"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { clearError, googleLogin, login } from "@/lib/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const result = await dispatch(login(data));
    if (result.payload.success) {
      if (!result.payload.data.is_emailVerified)
        router.push("/AIWebsiteBuilders/auth/verify-otp");
      else router.push("/AIWebsiteBuilders/home");
    }
  };

  // const handleGoogleLogin = async () => {
  //   const result = await dispatch(googleLogin());
  //   if (result.payload.success) {
  //     router.push("/AIWebsiteBuilders/home");
  //   }
  // };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: "url('/images/Texture.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Container
          component="main"
          maxWidth="xs"
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
                position: "relative",
              }}
            >
              <IconButton
                component={Link}
                href="/"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <HomeIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h4"
                sx={{
                  mb: 4,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Welcome Back
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email ? "Email is required" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password ? "Password is required" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
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
                    <ThreeDots
                      height="28"
                      width="40"
                      radius="9"
                      color="#FFFFFF"
                      ariaLabel="three-dots-loading"
                      visible
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Divider sx={{ my: 3, color: "rgba(255, 255, 255, 0.5)" }}>
                  or continue with
                </Divider>

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogleLogin}
                    sx={{
                      p: 1.5,
                      borderRadius: "8px",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Google
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Link
                    href="/AIWebsiteBuilders/auth/register"
                    style={{
                      textDecoration: "none",
                      color: "#60a5fa",
                      fontWeight: 500,
                    }}
                  >
                    Create account
                  </Link>
                  <Link
                    href="/AIWebsiteBuilders/auth/forgot-password"
                    style={{
                      textDecoration: "none",
                      color: "#60a5fa",
                      fontWeight: 500,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Stack>
              </Box>
            </GlassMorphism>
          </MotionBox>
        </Container>
      </Box>
    </Container>
  );
}
