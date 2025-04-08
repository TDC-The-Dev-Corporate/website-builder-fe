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

// Validation schema using Yup
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (values: any) => {
    // const result = await dispatch(sendOTP(values));
    // if (result.type === "auth/sendOTP/fulfilled") {
    //   router.push("/AIWebsiteBuilders/auth/verify-otp");
    // }
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
            confirmPassword: "",
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
                name="confirmPassword"
                type="password"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
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
                  "Send OTP"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
