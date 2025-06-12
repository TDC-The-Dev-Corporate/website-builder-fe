"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Chip,
} from "@mui/material";
import {
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Check,
} from "lucide-react";

import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import MotionBox from "@/app/components/animations/MotionBox";

interface PurchaseFormData {
  domain: string;
  price: number;
  period: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: "card" | "paypal";
  cardInfo: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
}

const DomainPurchaseFlow = ({
  domain = "example.com",
  price = 12.99,
  onComplete,
  onCancel,
}: {
  domain?: string;
  price?: number;
  onComplete?: () => void;
  onCancel?: () => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<PurchaseFormData>({
    domain,
    price,
    period: 1,
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    },
    paymentMethod: "card",
    cardInfo: {
      number: "",
      expiry: "",
      cvc: "",
      name: "",
    },
  });

  const steps = [
    "Domain Selection",
    "Contact Information",
    "Payment Details",
    "Confirmation",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (
    section: keyof PurchaseFormData,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value,
      },
    }));
  };

  const totalPrice = formData.price * formData.period;

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Paper
              sx={{ p: 3, mb: 3, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {formData.domain}
                </Typography>
                <Chip label="Available" color="success" />
              </Box>

              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "white", mb: 2 }}>
                  Registration Period
                </FormLabel>
                <RadioGroup
                  value={formData.period}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      period: parseInt(e.target.value),
                    }))
                  }
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: 200,
                        }}
                      >
                        <span>1 Year</span>
                        <span>${price}/year</span>
                      </Box>
                    }
                    sx={{ color: "white" }}
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: 200,
                        }}
                      >
                        <span>2 Years</span>
                        <span>${(price * 2).toFixed(2)} (Save 10%)</span>
                      </Box>
                    }
                    sx={{ color: "white" }}
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: 200,
                        }}
                      >
                        <span>3 Years</span>
                        <span>${(price * 3 * 0.85).toFixed(2)} (Save 15%)</span>
                      </Box>
                    }
                    sx={{ color: "white" }}
                  />
                </RadioGroup>
              </FormControl>
            </Paper>

            <Paper sx={{ p: 3, backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
              <Typography variant="h6" sx={{ color: "#3b82f6", mb: 2 }}>
                Included with your domain:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  "Free SSL Certificate",
                  "DNS Management",
                  "Email Forwarding",
                  "Domain Privacy Protection",
                  "24/7 Support",
                ].map((feature) => (
                  <Box
                    key={feature}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Check
                      size={16}
                      style={{ color: "#10b981", marginRight: 8 }}
                    />
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "firstName",
                      e.target.value
                    )
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "lastName",
                      e.target.value
                    )
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "email", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "phone", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.personalInfo.address}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "address", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.personalInfo.city}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "city", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  value={formData.personalInfo.state}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "state", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={formData.personalInfo.zip}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "zip", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Payment Information
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ color: "white" }}>
                Payment Method
              </FormLabel>
              <RadioGroup
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value as "card" | "paypal",
                  }))
                }
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                  sx={{ color: "white" }}
                />
              </RadioGroup>
            </FormControl>

            {formData.paymentMethod === "card" && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardInfo.number}
                    onChange={(e) =>
                      handleInputChange("cardInfo", "number", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={formData.cardInfo.expiry}
                    onChange={(e) =>
                      handleInputChange("cardInfo", "expiry", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CVC"
                    placeholder="123"
                    value={formData.cardInfo.cvc}
                    onChange={(e) =>
                      handleInputChange("cardInfo", "cvc", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name on Card"
                    value={formData.cardInfo.name}
                    onChange={(e) =>
                      handleInputChange("cardInfo", "name", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            <Paper
              sx={{ p: 3, mt: 3, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ color: "white" }}>
                  {formData.domain} ({formData.period} year
                  {formData.period > 1 ? "s" : ""})
                </Typography>
                <Typography sx={{ color: "white" }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider
                sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography sx={{ color: "#3b82f6", fontWeight: "bold" }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Check size={64} style={{ color: "#10b981", marginBottom: 16 }} />
            <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
              Purchase Complete!
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 4 }}
            >
              Your domain {formData.domain} has been successfully purchased and
              is being configured.
            </Typography>
            <Paper sx={{ p: 3, backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
              <Typography variant="h6" sx={{ color: "#3b82f6", mb: 2 }}>
                What's Next?
              </Typography>
              <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
                1. We'll configure your domain automatically
                <br />
                2. You'll receive a confirmation email
                <br />
                3. Your website will be live within 24 hours
              </Typography>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassMorphism blur={10} opacity={0.1}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 4, color: "white", textAlign: "center" }}
          >
            Purchase Domain
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ "& .MuiStepLabel-label": { color: "white" } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 400 }}>{renderStepContent(activeStep)}</Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={activeStep === 0 ? onCancel : handleBack}
              sx={{ color: "white" }}
            >
              {activeStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? onComplete : handleNext
              }
              startIcon={
                activeStep === 2 ? <CreditCard size={16} /> : undefined
              }
            >
              {activeStep === steps.length - 1
                ? "Done"
                : activeStep === 2
                ? "Complete Purchase"
                : "Next"}
            </Button>
          </Box>
        </CardContent>
      </GlassMorphism>
    </MotionBox>
  );
};

export default DomainPurchaseFlow;
