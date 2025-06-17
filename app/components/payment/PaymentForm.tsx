"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: cardElement! },
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push("/"), 3000);
    setLoading(false);
  };

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
            <Typography color="#34C759" variant="body1">
              ✅ Payment successful! Thank you.
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2} mb={2}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
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
                    <CardNumberElement options={ELEMENT_OPTIONS} />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
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
                    <CardExpiryElement options={ELEMENT_OPTIONS} />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
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
                    <CardCvcElement options={ELEMENT_OPTIONS} />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    ZIP / Postal Code
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="ZIP Code"
                    sx={{
                      input: {
                        color: "white",
                      },
                      fieldset: {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              </Box>

              {error && (
                <Typography color="error" sx={{ mb: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
                disabled={!stripe || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Pay Now"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
