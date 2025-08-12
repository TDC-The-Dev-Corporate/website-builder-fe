"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Grid,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

import { useFormik } from "formik";
import * as Yup from "yup";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  clearError,
  register as registerUser,
} from "@/lib/redux/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Full name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const formik = useFormik<RegisterData>({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(registerUser(values));
        if (result.payload.success) {
          router.push(
            `/AIWebsiteBuilders/auth/verify-otp?email=${encodeURIComponent(
              values.email
            )}`
          );
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

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
        py: 8,
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
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
                Create Your Account
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, textAlign: "left" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...formik.getFieldProps("name")}
                      error={
                        formik.touched.name && Boolean(formik.errors.name)
                      }
                      helperText={formik.touched.name && formik.errors.name}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...formik.getFieldProps("email")}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      sx={textFieldStyles}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
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
                        "Create Account"
                      )}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Link
                        href="/AIWebsiteBuilders/auth/login"
                        style={{
                          textDecoration: "none",
                          color: "#60a5fa",
                          fontWeight: 500,
                        }}
                      >
                        Already have an account? Sign in
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </GlassMorphism>
          </MotionBox>
        </Container>
      </Box>
    </Container>
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
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiFormHelperText-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
};
