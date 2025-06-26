"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "white",
      fontSize: "16px",
      "::placeholder": {
        color: "#aaa",
      },
    },
    invalid: {
      color: "#ff6b6b",
    },
  },
};

export default function PaymentForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Real-time completion states
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);

  const formik = useFormik({
    initialValues: {
      zip: "",
    },
    validationSchema: Yup.object({
      zip: Yup.string().required("ZIP / Postal Code is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setStripeError(null);

      const cardNumber = elements?.getElement(CardNumberElement);

      const { error, paymentIntent } = await stripe!.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber!,
            billing_details: {
              address: {
                postal_code: values.zip,
              },
            },
          },
        }
      );

      if (error) {
        setStripeError(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
      setLoading(false);
    },
  });

  const allStripeFieldsComplete =
    cardNumberComplete && cardExpiryComplete && cardCvcComplete;

  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 3,
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Enter Payment Details
          </Typography>

          {success ? (
            <Typography color="#34C759" variant="body1" sx={{ mb: 5 }}>
              ✅ Payment successful! Thank you.
            </Typography>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2} mb={2}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ textAlign: "left" }}
                  >
                    Card Number
                  </Typography>
                  <Box
                    sx={{
                      p: 1.5,
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <CardNumberElement
                      options={ELEMENT_OPTIONS}
                      onChange={(e) => setCardNumberComplete(e.complete)}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ textAlign: "left" }}
                  >
                    Expiration Date
                  </Typography>
                  <Box
                    sx={{
                      p: 1.5,
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <CardExpiryElement
                      options={ELEMENT_OPTIONS}
                      onChange={(e) => setCardExpiryComplete(e.complete)}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ textAlign: "left" }}
                  >
                    CVC
                  </Typography>
                  <Box
                    sx={{
                      p: 1.5,
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <CardCvcElement
                      options={ELEMENT_OPTIONS}
                      onChange={(e) => setCardCvcComplete(e.complete)}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ textAlign: "left" }}
                  >
                    ZIP / Postal Code
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="ZIP Code"
                    name="zip"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
                    sx={{
                      input: {
                        color: "white",
                      },
                      fieldset: {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                      mb: 5,
                    }}
                  />
                </Box>
              </Box>

              {stripeError && (
                <Typography color="error" sx={{ mb: 1 }}>
                  {stripeError}
                </Typography>
              )}

              <Button
                variant="contained"
                // color="success"
                fullWidth
                type="submit"
                disabled={
                  !stripe ||
                  !elements ||
                  loading ||
                  !allStripeFieldsComplete ||
                  !formik.isValid
                }
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Pay Now"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
