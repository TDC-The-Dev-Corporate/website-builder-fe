"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import { tradeSpecializations } from "@/app/types/constants";
import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { register as registerUser } from "@/lib/redux/slices/authSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Full name is required"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^\S*$/, "Username should not contain spaces"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  companyName: Yup.string().required("Company name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9]{7,15}$/,
      "Phone number must be valid and contain 7 to 15 digits"
    ),
  address: Yup.string().required("Business address is required"),
  licenseNumber: Yup.string().required("License number is required"),
  tradeSpecialization: Yup.string().required(
    "Trade specialization is required"
  ),
  profileImage: Yup.mixed().notRequired(),
});

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      companyName: "",
      phoneNumber: "",
      address: "",
      licenseNumber: "",
      tradeSpecialization: "",
      profileImage: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.profileImage) {
          const formData = new FormData();
          formData.append("file", values.profileImage);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
          );

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          values.profileImage = data.secure_url;
        }

        const result = await dispatch(registerUser(values));
        if (result.payload.success) {
          router.push("/AIWebsiteBuilders/auth/verify-otp");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
        maxWidth="md"
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
                mb: 4,
                fontWeight: 700,
                color: "white",
              }}
            >
              Register Your Trade Business
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
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      border: "2px dashed rgba(255, 255, 255, 0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      overflow: "hidden",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    {imagePreview ? (
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Profile preview"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography color="rgba(255, 255, 255, 0.7)">
                        Upload Photo
                      </Typography>
                    )}
                  </Box>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-image"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-image">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Choose Photo
                    </Button>
                  </label>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        {...formik.getFieldProps("companyName")}
                        error={
                          formik.touched.companyName &&
                          Boolean(formik.errors.companyName)
                        }
                        helperText={
                          formik.touched.companyName &&
                          formik.errors.companyName
                        }
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
                        label="Username"
                        {...formik.getFieldProps("username")}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider
                    sx={{
                      my: 3,
                      color: "rgba(255, 255, 255, 0.5)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    Business Information
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...formik.getFieldProps("phoneNumber")}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="License Number"
                    {...formik.getFieldProps("licenseNumber")}
                    error={
                      formik.touched.licenseNumber &&
                      Boolean(formik.errors.licenseNumber)
                    }
                    helperText={
                      formik.touched.licenseNumber &&
                      formik.errors.licenseNumber
                    }
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Address"
                    {...formik.getFieldProps("address")}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Trade Specialization"
                    {...formik.getFieldProps("tradeSpecialization")}
                    error={
                      formik.touched.tradeSpecialization &&
                      Boolean(formik.errors.tradeSpecialization)
                    }
                    helperText={
                      formik.touched.tradeSpecialization &&
                      formik.errors.tradeSpecialization
                    }
                    sx={textFieldStyles}
                  >
                    {tradeSpecializations.map((trade) => (
                      <MenuItem
                        key={trade}
                        value={trade}
                        sx={{ color: "text.primary" }}
                      >
                        {trade}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    {loading ? <CircularProgress size={24} /> : "Register"}
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
