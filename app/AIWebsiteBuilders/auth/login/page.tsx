"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { googleLogin, login } from "@/lib/redux/slices/authSlice";

export default function Login() {
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
      router.push("/AIWebsiteBuilders/home");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(googleLogin());
    if (result.payload.success) {
      router.push("/AIWebsiteBuilders/home");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>

          {/* Google Login Button */}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/AIWebsiteBuilders/auth/register">
              Don't have an account? Sign Up
            </Link>
            <Link href="/AIWebsiteBuilders/auth/forgot-password">
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
