"use client";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { forgetPassword } from "@/lib/redux/slices/authSlice";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (values: any) => {
    const payload = {
      email: localStorage.getItem("email"),
      ...values,
    };
    const result = await dispatch(forgetPassword(payload));
    if (result) {
      router.push("/AIWebsiteBuilders/auth/login");
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
          Reset Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <Formik
          initialValues={{
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                error={touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                sx={{ mb: 2 }}
              />

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Confirm Password"
                name="confirmNewPassword"
                type="password"
                error={
                  touched.confirmNewPassword && !!errors.confirmNewPassword
                }
                helperText={
                  touched.confirmNewPassword && errors.confirmNewPassword
                }
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
