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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { googleLogin, login } from "@/lib/redux/slices/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
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

  const handleGoogleLogin = async () => {
    const result = await dispatch(googleLogin());
    if (result.payload.success) {
      router.push("/AIWebsiteBuilders/home");
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
            "url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        },
      }}
    >
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
                type="password"
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
  );
}
