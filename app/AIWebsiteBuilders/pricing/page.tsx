"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Check, Star, Zap, Shield } from "lucide-react";

import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";

import { motion } from "framer-motion";

import PaymentForm from "@/app/components/payment/PaymentForm";
import { useAppDispatch } from "@/lib/redux/hooks";
import { doPayment } from "@/lib/redux/api/payment";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const pricingPlans = [
  {
    id: "essential",
    name: "Essential Plan",
    icon: <Zap size={32} />,
    description: "For tradesmen who want a fast DIY setup",
    monthlyPrice: 49,
    yearlyPrice: 499,
    color: "primary",
    features: [
      "Drag-and-drop builder",
      "Mobile-responsive trade templates",
      "Domain connection",
      "Hosting & SSL included",
      "Service list, photo gallery, and contact form",
      "Email + chat support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Plan",
    icon: <Star size={32} />,
    description: "For growing businesses that want automation",
    monthlyPrice: 99,
    yearlyPrice: 999,
    color: "secondary",
    features: [
      "Everything in Essential, plus:",
      "Online booking + calendar sync",
      "Automated quote & invoice generation",
      "CRM + lead tracking dashboard",
      "Service area map",
      "SEO tools & analytics",
      "Priority email support",
    ],
    popular: true,
  },
  {
    id: "white-glove",
    name: "White Glove Plan",
    icon: <Shield size={32} />,
    description: "Done-for-you setup + dedicated support",
    monthlyPrice: 129,
    yearlyPrice: 1548, // 129 * 12
    setupFee: 1499,
    color: "appleGreen",
    features: [
      "Everything in Pro, plus:",
      "1-on-1 onboarding call with dedicated developer",
      "Full website customization",
      "Content writing, image sourcing & setup",
      "Logo cleanup or design",
      "Google Business optimization",
      "Direct access to your assigned web expert",
      "Ongoing edits, updates & backups",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [activePlan, setActivePlan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handlePlanSelect = async (planId: string) => {
    setLoading(true);
    setActivePlan(true);
    const selectedPlan = pricingPlans.find((p) => p.id === planId);
    const amount = isYearly
      ? selectedPlan.yearlyPrice * 100
      : selectedPlan.monthlyPrice * 100;
    const data = { amount, currency: "usd" };
    const { clientSecret } = await doPayment(data);
    setClientSecret(clientSecret);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        py: 8,
      }}
    >
      {!activePlan && (
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: 4,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "16px", mb: 5 }}
            >
              <Box
                sx={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "24px", height: "17px", objectFit: "cover" }}
                  alt="Logo"
                  src="/images/Logo.png"
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
                  fontWeight: 800,
                  color: "white",
                  fontSize: "64px",
                }}
              >
                TRADES BUILDER PRO
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 400,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Skip the hassle. Launch your site in minutes - or let us do it all
              for you.
            </Typography>
          </Box>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{ display: "flex", justifyContent: "center", mb: 6 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 6,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isYearly}
                    onChange={(e) => setIsYearly(e.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#34C759",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#34C759",
                        },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ color: "white" }}>Monthly</Typography>
                    <Typography sx={{ color: "white" }}>Yearly</Typography>
                    <Chip
                      label="Save 15%"
                      size="small"
                      sx={{
                        backgroundColor: "#34C759",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                }
              />
            </Paper>
          </MotionBox>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={plan.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  sx={{
                    height: "100%",
                    position: "relative",
                    background: plan.popular
                      ? "linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(10, 132, 255, 0.1) 100%)"
                      : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: plan.popular
                      ? "2px solid #34C759"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#34C759",
                        color: "white",
                        fontWeight: 600,
                        zIndex: 1,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 4, height: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          color: plan.popular ? "#34C759" : "#0A84FF",
                          mr: 2,
                        }}
                      >
                        {plan.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: 600 }}
                      >
                        {plan.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 3 }}
                    >
                      {plan.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "baseline", mb: 1 }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            color: "white",
                            fontWeight: 700,
                            mr: 1,
                          }}
                        >
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          /{isYearly ? "year" : "month"}
                        </Typography>
                      </Box>

                      {plan.setupFee && (
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          + ${plan.setupFee} setup fee
                        </Typography>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={() => handlePlanSelect(plan.id)}
                      sx={{
                        mb: 3,
                        py: 1.5,
                        background: plan.popular
                          ? "linear-gradient(135deg, #34C759 0%, #30B350 100%)"
                          : "linear-gradient(135deg, #0A84FF 0%, #007AFF 100%)",
                        "&:hover": {
                          background: plan.popular
                            ? "linear-gradient(135deg, #4CD964 0%, #34C759 100%)"
                            : "linear-gradient(135deg, #5AC8FA 0%, #0A84FF 100%)",
                        },
                      }}
                    >
                      Get Started
                    </Button>

                    <List sx={{ p: 0 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <Check
                              size={16}
                              color={plan.popular ? "#34C759" : "#0A84FF"}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            sx={{
                              "& .MuiListItemText-primary": {
                                color: feature.includes("Everything")
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "rgba(255, 255, 255, 0.8)",
                                fontSize: "0.9rem",
                                fontWeight: feature.includes("Everything")
                                  ? 600
                                  : 400,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            sx={{ textAlign: "center" }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 6,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: 600, mb: 3 }}
              >
                Questions about pricing?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 4 }}
              >
                All plans include free SSL certificates, reliable hosting, and
                our industry-leading support. No hidden fees, no surprises.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  cursor: "not-allowed",
                  borderColor: "#34C759",
                  color: "#34C759",
                }}
              >
                Contact Sales
              </Button>
            </Paper>
          </MotionBox>
        </Container>
      )}

      {activePlan && <PaymentForm clientSecret={clientSecret} />}
    </Box>
  );
}
