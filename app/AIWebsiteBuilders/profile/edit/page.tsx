"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  MenuItem,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Edit as EditIcon } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { update } from "@/lib/redux/slices/authSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^\S*$/, "Username should not contain spaces"),
  companyName: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
  address: Yup.string().optional(),
  licenseNumber: Yup.string().optional(),
  tradeSpecialization: Yup.string().optional(),
});

const tradeSpecializations = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "HVAC Technician",
  "Painter",
  "General Contractor",
  "Other",
];

export default function EditProfile() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      companyName: user?.companyName || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      licenseNumber: user?.licenseNumber || "",
      tradeSpecialization: user?.tradeSpecialization || "",
      profileImage: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        let imageUrl = user?.profileImage;

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
          imageUrl = data.secure_url;
        }

        const updatedProfiledata = {
          ...values,
          profileImage: imageUrl,
          id: JSON.parse(localStorage.getItem("user")).id,
        };

        const profileResponse = await dispatch(update(updatedProfiledata));

        if (profileResponse.type === "user/update/fulfilled")
          router.push("/AIWebsiteBuilders/template-selector");
        else throw new Error("Failed to update profile");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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

  if (!user) {
    return (
      <Container>
        <Typography>Please log in to edit your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  margin: "0 auto",
                  mb: 2,
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  {imagePreview && (
                    <Image
                      src={imagePreview || "/default-avatar.png"}
                      alt="Profile"
                      width={200}
                      height={200}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  {!imagePreview && (
                    <AccountCircleIcon
                      sx={{ fontSize: 200, color: "#9e9e9e" }}
                    />
                  )}
                </Box>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "10px",
                    bottom: "10px",
                    backgroundColor: "primary.main",
                    zIndex: 2,
                    "&:hover": { backgroundColor: "primary.dark" },
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                  }}
                  component="label"
                >
                  <EditIcon color="white" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name.toString()
                        : undefined
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled
                    fullWidth
                    label="User Name"
                    {...formik.getFieldProps("username")}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                        ? formik.errors.username.toString()
                        : undefined
                    }
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
                      formik.touched.companyName && formik.errors.companyName
                        ? formik.errors.companyName.toString()
                        : undefined
                    }
                  />
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
                        ? formik.errors.phoneNumber.toString()
                        : undefined
                    }
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
                        ? formik.errors.licenseNumber.toString()
                        : undefined
                    }
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
                    helperText={
                      formik.touched.address && formik.errors.address
                        ? formik.errors.address.toString()
                        : undefined
                    }
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
                        ? formik.errors.tradeSpecialization.toString()
                        : undefined
                    }
                  >
                    {tradeSpecializations.map((trade) => (
                      <MenuItem key={trade} value={trade}>
                        {trade}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Business Hours
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Open Time</TableCell>
                        <TableCell>Close Time</TableCell>
                        <TableCell>Open/Closed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {businessHours.map((hours) => (
                        <TableRow key={hours.day}>
                          <TableCell>{hours.day}</TableCell>
                          <TableCell>
                            <TimePicker
                              disabled={!hours.isOpen}
                              value={new Date(`2024-01-01T${hours.openTime}`)}
                              onChange={(newValue) => {
                                if (newValue) {
                                  const timeString = newValue
                                    .toLocaleTimeString("en-US", {
                                      hour12: false,
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                    .replace("24:", "00:");
                                  handleHoursChange(
                                    hours.day,
                                    "openTime",
                                    timeString
                                  );
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TimePicker
                              disabled={!hours.isOpen}
                              value={new Date(`2024-01-01T${hours.closeTime}`)}
                              onChange={(newValue) => {
                                if (newValue) {
                                  const timeString = newValue
                                    .toLocaleTimeString("en-US", {
                                      hour12: false,
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                    .replace("24:", "00:");
                                  handleHoursChange(
                                    hours.day,
                                    "closeTime",
                                    timeString
                                  );
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={hours.isOpen}
                              onChange={(e) =>
                                handleHoursChange(
                                  hours.day,
                                  "isOpen",
                                  e.target.checked
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </LocalizationProvider>
            </Grid> */}

            <Grid item xs={12} sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  router.push("/AIWebsiteBuilders/template-selector")
                }
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
