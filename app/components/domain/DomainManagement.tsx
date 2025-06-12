"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Alert,
  Divider,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from "@mui/material";
import {
  Globe,
  Check,
  X,
  Copy,
  AlertCircle,
  ExternalLink,
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";

import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import MotionBox from "@/app/components/animations/MotionBox";

interface DomainStatus {
  domain: string | null;
  status: "none" | "pending" | "verified" | "failed";
  dnsRecords?: {
    type: string;
    name: string;
    value: string;
  }[];
}

interface DomainSuggestion {
  domain: string;
  price: number;
  available: boolean;
  popular?: boolean;
}

const DomainManagement = () => {
  const [domainStatus, setDomainStatus] = useState<DomainStatus>({
    domain: null,
    status: "none",
  });
  const [customDomain, setCustomDomain] = useState("");
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainSuggestions, setDomainSuggestions] = useState<
    DomainSuggestion[]
  >([]);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing domain status
    fetchDomainStatus();
  }, []);

  const fetchDomainStatus = async () => {
    // Mock API call - replace with actual API
    try {
      // const response = await fetch('/api/domain/status');
      // const data = await response.json();

      // Mock data
      const mockStatus: DomainStatus = {
        domain: null,
        status: "none",
      };
      setDomainStatus(mockStatus);
    } catch (error) {
      console.error("Error fetching domain status:", error);
    }
  };

  const searchDomains = async (query: string) => {
    if (!query.trim()) {
      setDomainSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual domain search API
      const mockSuggestions: DomainSuggestion[] = [
        {
          domain: `${query}.com`,
          price: 12.99,
          available: true,
          popular: true,
        },
        { domain: `${query}.net`, price: 14.99, available: true },
        { domain: `${query}.org`, price: 13.99, available: false },
        { domain: `${query}.co`, price: 24.99, available: true },
        { domain: `${query}pro.com`, price: 12.99, available: true },
        { domain: `${query}services.com`, price: 12.99, available: true },
      ];

      setTimeout(() => {
        setDomainSuggestions(mockSuggestions);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error searching domains:", error);
      setLoading(false);
    }
  };

  const handleDomainSearch = () => {
    searchDomains(searchQuery);
  };

  const handlePurchaseDomain = async (domain: string, price: number) => {
    // Mock purchase process
    console.log(`Purchasing ${domain} for $${price}`);
    setShowPurchaseDialog(false);

    // Update domain status to pending
    setDomainStatus({
      domain,
      status: "pending",
      dnsRecords: [
        { type: "CNAME", name: "www", value: "your-app.vercel.app" },
        { type: "A", name: "@", value: "76.76.19.61" },
      ],
    });

    setShowVerificationDialog(true);
  };

  const handleConnectCustomDomain = async () => {
    if (!customDomain.trim()) return;

    setLoading(true);
    try {
      // Mock API call to add custom domain
      setTimeout(() => {
        setDomainStatus({
          domain: customDomain,
          status: "pending",
          dnsRecords: [
            { type: "CNAME", name: "www", value: "your-app.vercel.app" },
            { type: "A", name: "@", value: "76.76.19.61" },
          ],
        });
        setShowVerificationDialog(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error connecting domain:", error);
      setLoading(false);
    }
  };

  const handleVerifyDomain = async () => {
    setLoading(true);
    try {
      // Mock verification process
      setTimeout(() => {
        setDomainStatus((prev) => ({
          ...prev,
          status: "verified",
        }));
        setShowVerificationDialog(false);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error verifying domain:", error);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const steps = [
    "Choose Domain",
    "Configure DNS",
    "Verify Connection",
    "Go Live",
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "white", fontWeight: 700 }}
        >
          Domain Management
        </Typography>

        {/* Current Domain Status */}
        <GlassMorphism blur={10} opacity={0.1} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Globe size={24} style={{ marginRight: 12, color: "#3b82f6" }} />
              <Typography variant="h6" sx={{ color: "white" }}>
                Current Domain
              </Typography>
            </Box>

            {domainStatus.status === "none" ? (
              <Alert severity="info" sx={{ mb: 3 }}>
                Your website is currently accessible at:{" "}
                <strong>yourapp.com/username</strong>
                <br />
                Add a custom domain to make it truly yours!
              </Alert>
            ) : (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ color: "white", mr: 2 }}>
                    {domainStatus.domain}
                  </Typography>
                  <Chip
                    label={domainStatus.status}
                    color={
                      domainStatus.status === "verified"
                        ? "success"
                        : domainStatus.status === "pending"
                        ? "warning"
                        : "error"
                    }
                    icon={
                      domainStatus.status === "verified" ? (
                        <Check size={16} />
                      ) : domainStatus.status === "pending" ? (
                        <AlertCircle size={16} />
                      ) : (
                        <X size={16} />
                      )
                    }
                  />
                </Box>

                {domainStatus.status === "verified" && (
                  <Alert severity="success">
                    Your custom domain is live and working perfectly!
                    <Button
                      size="small"
                      startIcon={<ExternalLink size={16} />}
                      sx={{ ml: 2 }}
                      onClick={() =>
                        window.open(`https://${domainStatus.domain}`, "_blank")
                      }
                    >
                      Visit Site
                    </Button>
                  </Alert>
                )}
              </Box>
            )}
          </CardContent>
        </GlassMorphism>

        <Grid container spacing={4}>
          {/* Domain Search & Purchase */}
          <Grid item xs={12} md={6}>
            <GlassMorphism blur={10} opacity={0.1}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, color: "white" }}>
                  Purchase New Domain
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Enter your business name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleDomainSearch()
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleDomainSearch}
                    disabled={loading}
                    sx={{ minWidth: 100 }}
                  >
                    Search
                  </Button>
                </Box>

                {domainSuggestions.length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 2, color: "white" }}
                    >
                      Available Domains
                    </Typography>
                    <List>
                      {domainSuggestions.map((suggestion) => (
                        <Paper
                          key={suggestion.domain}
                          sx={{
                            mb: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: suggestion.popular
                              ? "2px solid #3b82f6"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <ListItem
                            secondaryAction={
                              suggestion.available ? (
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<CreditCard size={16} />}
                                  onClick={() => {
                                    setShowPurchaseDialog(true);
                                    // Set selected domain for purchase
                                  }}
                                >
                                  ${suggestion.price}/year
                                </Button>
                              ) : (
                                <Chip
                                  label="Taken"
                                  color="error"
                                  size="small"
                                />
                              )
                            }
                          >
                            <ListItemText
                              primary={
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Typography sx={{ color: "white", mr: 1 }}>
                                    {suggestion.domain}
                                  </Typography>
                                  {suggestion.popular && (
                                    <Chip
                                      label="Popular"
                                      size="small"
                                      color="primary"
                                    />
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                        </Paper>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </GlassMorphism>
          </Grid>

          {/* Connect Existing Domain */}
          <Grid item xs={12} md={6}>
            <GlassMorphism blur={10} opacity={0.1}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, color: "white" }}>
                  Connect Existing Domain
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mb: 3, color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Already own a domain? Connect it to your website.
                </Typography>

                <TextField
                  fullWidth
                  placeholder="yourdomain.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleConnectCustomDomain}
                  disabled={loading || !customDomain.trim()}
                  startIcon={<Globe size={16} />}
                >
                  Connect Domain
                </Button>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#3b82f6", mb: 1 }}
                  >
                    💡 Pro Tip
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    Make sure you have access to your domain's DNS settings
                    before connecting.
                  </Typography>
                </Box>
              </CardContent>
            </GlassMorphism>
          </Grid>
        </Grid>

        {/* Domain Verification Dialog */}
        <Dialog
          open={showVerificationDialog}
          onClose={() => setShowVerificationDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Domain Configuration
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{ mt: 2 }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{ "& .MuiStepLabel-label": { color: "white" } }}
                  >
                    {label}
                  </StepLabel>
                  <StepContent>
                    {index === 1 && domainStatus.dnsRecords && (
                      <Box>
                        <Typography sx={{ color: "white", mb: 2 }}>
                          Add these DNS records to your domain:
                        </Typography>
                        {domainStatus.dnsRecords.map((record, idx) => (
                          <Paper
                            key={idx}
                            sx={{
                              p: 2,
                              mb: 2,
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={2}>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#3b82f6" }}
                                >
                                  {record.type}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "white" }}
                                >
                                  {record.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "white",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {record.value}
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  size="small"
                                  onClick={() => copyToClipboard(record.value)}
                                  sx={{ color: "#3b82f6" }}
                                >
                                  <Copy size={16} />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}
                      </Box>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}>
            <Button onClick={() => setShowVerificationDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleVerifyDomain}
              disabled={loading}
            >
              Verify Domain
            </Button>
          </DialogActions>
        </Dialog>

        {/* Purchase Dialog */}
        <Dialog
          open={showPurchaseDialog}
          onClose={() => setShowPurchaseDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Purchase Domain
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}>
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CreditCard
                size={48}
                style={{ color: "#3b82f6", marginBottom: 16 }}
              />
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Complete Your Purchase
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 4 }}
              >
                You'll be redirected to our secure payment processor to complete
                your domain purchase.
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-around", mb: 4 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Shield
                    size={24}
                    style={{ color: "#10b981", marginBottom: 8 }}
                  />
                  <Typography variant="body2" sx={{ color: "white" }}>
                    SSL Included
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Zap
                    size={24}
                    style={{ color: "#f59e0b", marginBottom: 8 }}
                  />
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Auto Setup
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Globe
                    size={24}
                    style={{ color: "#3b82f6", marginBottom: 8 }}
                  />
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Global CDN
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}>
            <Button onClick={() => setShowPurchaseDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={<CreditCard size={16} />}
              onClick={() => handlePurchaseDomain("example.com", 12.99)}
            >
              Continue to Payment
            </Button>
          </DialogActions>
        </Dialog>
      </MotionBox>
    </Box>
  );
};

export default DomainManagement;
