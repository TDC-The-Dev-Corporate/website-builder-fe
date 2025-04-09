"use client";

import { useEffect, useState } from "react";
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

import ImageCropper from "@/app/components/ImageEditModal/imageEditModal";

import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteAccount, update } from "@/lib/redux/slices/authSlice";
import { logoutUser } from "@/lib/utils";

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
  const [user, setUser] = useState<any>(null);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [openCropper, setOpenCropper] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setImagePreview(JSON.parse(storedUser).profileImage);
      }
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImage(reader.result as string);
        setOpenCropper(true);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleAccountDeletion = async () => {
    setDeleting(true);
    const result = await dispatch(deleteAccount());
    if (result.type === "user/delete/fulfilled") {
      await logoutUser();
      setDeleting(false);
    }
  };

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

            <Grid item xs={12} sx={{ mt: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
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
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  disabled={deleting}
                  onClick={() => handleAccountDeletion()}
                >
                  {loading ? <CircularProgress size={24} /> : "Delete Account"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {openCropper && rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCancel={() => setOpenCropper(false)}
          onCropComplete={(croppedBlob) => {
            formik.setFieldValue("profileImage", croppedBlob);
            setImagePreview(URL.createObjectURL(croppedBlob));
            setOpenCropper(false);
          }}
        />
      )}
    </Container>
  );
}
