"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";

import { Edit, Camera, Trash2, ArrowLeft } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import ImageCropper from "@/app/components/ImageEditModal/imageEditModal";
import MotionBox from "@/app/components/animations/MotionBox";
import JsonLd from "../JsonLd";

import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteAccount, update } from "@/lib/redux/slices/authSlice";

import { logoutUser } from "@/lib/utils";
import { tradeSpecializations } from "@/app/types/constants";

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

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.05)",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-focused": {
      color: "#3b82f6",
    },
    "&.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.3)",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "rgba(255, 255, 255, 0.5)",
    "&.Mui-error": {
      color: "#ef4444",
    },
  },
};

export default function EditProfileForm() {
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
          router.push("/AIWebsiteBuilders/home");
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

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Edit Profile",
    description: "Update your trade business profile information",
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
            "@id": "/profile",
            name: "Profile",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": "/profile/edit",
            name: "Edit Profile",
          },
        },
      ],
    },
    mainEntity: {
      "@type": "ProfilePage",
      name: "Trade Business Profile",
      description: "Edit your professional trade business profile",
    },
  };

  return (
    <>
      <JsonLd data={profileSchema} />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          p: 3,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="text"
            startIcon={<ArrowLeft size={20} />}
            onClick={() => router.push("/AIWebsiteBuilders/home")}
            sx={{
              color: "white",
              mb: 3,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Back to Dashboard
          </Button>

          <GlassMorphism blur={10} opacity={0.1}>
            <Box sx={{ p: 4 }}>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 4,
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 220,
                        height: 220,
                        position: "relative",
                        margin: "0 auto",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "20px",
                          overflow: "hidden",
                          background:
                            "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                          border: "4px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Profile"
                            width={220}
                            height={220}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Edit size={80} color="white" />
                          </Box>
                        )}
                      </Box>
                      <IconButton
                        sx={{
                          position: "absolute",
                          right: "10px",
                          bottom: "10px",
                          background:
                            "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                          },
                          width: 44,
                          height: 44,
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                        }}
                        component="label"
                      >
                        <Camera size={20} color="white" />
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
                    <Typography
                      variant="h5"
                      sx={{ color: "white", mb: 3, fontWeight: 600 }}
                    >
                      Personal Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          {...formik.getFieldProps("name")}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={
                            formik.touched.name && formik.errors.name
                              ? formik.errors.name.toString()
                              : undefined
                          }
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled
                          fullWidth
                          label="User Name"
                          {...formik.getFieldProps("username")}
                          error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                          }
                          helperText={
                            formik.touched.username && formik.errors.username
                              ? formik.errors.username.toString()
                              : undefined
                          }
                          sx={inputStyles}
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
                              ? formik.errors.companyName.toString()
                              : undefined
                          }
                          sx={inputStyles}
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
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                              ? formik.errors.phoneNumber.toString()
                              : undefined
                          }
                          sx={inputStyles}
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
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                          sx={inputStyles}
                        >
                          {tradeSpecializations.map((trade) => (
                            <MenuItem
                              key={trade}
                              value={trade}
                              sx={{
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                },
                              }}
                            >
                              {trade}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Business Address"
                          {...formik.getFieldProps("address")}
                          error={
                            formik.touched.address &&
                            Boolean(formik.errors.address)
                          }
                          helperText={
                            formik.touched.address && formik.errors.address
                              ? formik.errors.address.toString()
                              : undefined
                          }
                          sx={inputStyles}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          sx={{
                            background:
                              "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                            "&:hover": {
                              background:
                                "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                            },
                            px: 4,
                            py: 1.5,
                            minWidth: 140,
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => router.push("/AIWebsiteBuilders/home")}
                          sx={{
                            color: "white",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            "&:hover": {
                              borderColor: "white",
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                            px: 4,
                            py: 1.5,
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>

                      <Button
                        variant="contained"
                        onClick={handleAccountDeletion}
                        disabled={deleting}
                        startIcon={<Trash2 size={18} />}
                        sx={{
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                          color: "#ef4444",
                          "&:hover": {
                            backgroundColor: "rgba(239, 68, 68, 0.2)",
                          },
                          px: 4,
                          py: 1.5,
                          minWidth: 160,
                        }}
                      >
                        {deleting ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Delete Account"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </GlassMorphism>
        </MotionBox>

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
      </Box>
    </>
  );
}
