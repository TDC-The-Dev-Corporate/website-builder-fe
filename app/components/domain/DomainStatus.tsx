"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Globe,
  Check,
  X,
  AlertCircle,
  Clock,
  ExternalLink,
  RefreshCw as Refresh,
  Copy,
  Shield,
  Zap,
} from "lucide-react";

import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import MotionBox from "@/app/components/animations/MotionBox";

interface DomainInfo {
  domain: string;
  status: "pending" | "verified" | "failed" | "expired";
  dnsStatus: "configuring" | "propagating" | "active" | "error";
  sslStatus: "pending" | "active" | "error";
  expiryDate: string;
  autoRenew: boolean;
  lastChecked: string;
  dnsRecords: {
    type: string;
    name: string;
    value: string;
    status: "active" | "pending" | "error";
  }[];
  features: {
    name: string;
    status: "active" | "pending" | "error";
    description: string;
  }[];
}

const DomainStatus = ({ domain }: { domain?: string }) => {
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if (domain) {
      fetchDomainInfo();
    }
  }, [domain]);

  const fetchDomainInfo = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      const mockInfo: DomainInfo = {
        domain: domain || "example.com",
        status: "verified",
        dnsStatus: "active",
        sslStatus: "active",
        expiryDate: "2025-12-15",
        autoRenew: true,
        lastChecked: new Date().toISOString(),
        dnsRecords: [
          { type: "A", name: "@", value: "76.76.19.61", status: "active" },
          {
            type: "CNAME",
            name: "www",
            value: "your-app.vercel.app",
            status: "active",
          },
          {
            type: "MX",
            name: "@",
            value: "mail.your-domain.com",
            status: "active",
          },
        ],
        features: [
          {
            name: "SSL Certificate",
            status: "active",
            description: "Secure HTTPS connection",
          },
          {
            name: "CDN",
            status: "active",
            description: "Global content delivery",
          },
          {
            name: "Email Forwarding",
            status: "active",
            description: "Forward emails to your inbox",
          },
          {
            name: "DNS Management",
            status: "active",
            description: "Full DNS control",
          },
          {
            name: "Domain Privacy",
            status: "active",
            description: "WHOIS privacy protection",
          },
        ],
      };

      setTimeout(() => {
        setDomainInfo(mockInfo);
        setLoading(false);
        setLastRefresh(new Date());
      }, 1000);
    } catch (error) {
      console.error("Error fetching domain info:", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
        return "success";
      case "pending":
      case "configuring":
      case "propagating":
        return "warning";
      case "error":
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
        return <Check size={16} />;
      case "pending":
      case "configuring":
      case "propagating":
        return <Clock size={16} />;
      case "error":
      case "failed":
        return <X size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!domainInfo) {
    return (
      <GlassMorphism blur={10} opacity={0.1}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Globe size={48} style={{ color: "#3b82f6", marginBottom: 16 }} />
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            No Domain Connected
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Connect a custom domain to get started
          </Typography>
        </CardContent>
      </GlassMorphism>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        {/* Main Status Card */}
        <Grid item xs={12}>
          <GlassMorphism blur={10} opacity={0.1}>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Globe
                    size={24}
                    style={{ marginRight: 12, color: "#3b82f6" }}
                  />
                  <Box>
                    <Typography variant="h5" sx={{ color: "white" }}>
                      {domainInfo.domain}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Last checked:{" "}
                      {new Date(domainInfo.lastChecked).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Refresh status">
                    <IconButton
                      onClick={fetchDomainInfo}
                      disabled={loading}
                      sx={{ color: "#3b82f6" }}
                    >
                      <Refresh size={20} />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    startIcon={<ExternalLink size={16} />}
                    onClick={() =>
                      window.open(`https://${domainInfo.domain}`, "_blank")
                    }
                  >
                    Visit Site
                  </Button>
                </Box>
              </Box>

              {loading && <LinearProgress sx={{ mb: 3 }} />}

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
                    >
                      Domain Status
                    </Typography>
                    <Chip
                      label={domainInfo.status}
                      color={getStatusColor(domainInfo.status)}
                      icon={getStatusIcon(domainInfo.status)}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
                    >
                      DNS Status
                    </Typography>
                    <Chip
                      label={domainInfo.dnsStatus}
                      color={getStatusColor(domainInfo.dnsStatus)}
                      icon={getStatusIcon(domainInfo.dnsStatus)}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
                    >
                      SSL Status
                    </Typography>
                    <Chip
                      label={domainInfo.sslStatus}
                      color={getStatusColor(domainInfo.sslStatus)}
                      icon={getStatusIcon(domainInfo.sslStatus)}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              {domainInfo.status === "verified" && (
                <Alert severity="success" sx={{ mt: 3 }}>
                  Your domain is live and working perfectly! All systems are
                  operational.
                </Alert>
              )}

              {domainInfo.dnsStatus === "propagating" && (
                <Alert severity="info" sx={{ mt: 3 }}>
                  DNS changes are propagating. This can take up to 48 hours to
                  complete globally.
                </Alert>
              )}
            </CardContent>
          </GlassMorphism>
        </Grid>

        {/* DNS Records */}
        <Grid item xs={12} md={6}>
          <GlassMorphism blur={10} opacity={0.1}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                DNS Records
              </Typography>
              <List>
                {domainInfo.dnsRecords.map((record, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon>
                      <Chip
                        label={record.type}
                        size="small"
                        color={getStatusColor(record.status)}
                        sx={{ minWidth: 60 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: "white" }}>
                          {record.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontFamily: "monospace",
                          }}
                        >
                          {record.value}
                        </Typography>
                      }
                    />
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(record.value)}
                      sx={{ color: "#3b82f6" }}
                    >
                      <Copy size={16} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </GlassMorphism>
        </Grid>

        {/* Features */}
        <Grid item xs={12} md={6}>
          <GlassMorphism blur={10} opacity={0.1}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                Features & Services
              </Typography>
              <List>
                {domainInfo.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon>
                      <Chip
                        icon={getStatusIcon(feature.status)}
                        label=""
                        size="small"
                        color={getStatusColor(feature.status)}
                        sx={{
                          minWidth: 32,
                          "& .MuiChip-label": { display: "none" },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: "white" }}>
                          {feature.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          {feature.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </GlassMorphism>
        </Grid>

        {/* Domain Info */}
        <Grid item xs={12}>
          <GlassMorphism blur={10} opacity={0.1}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                Domain Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
                    >
                      Expiry Date
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      {new Date(domainInfo.expiryDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
                    >
                      Auto Renewal
                    </Typography>
                    <Chip
                      label={domainInfo.autoRenew ? "Enabled" : "Disabled"}
                      color={domainInfo.autoRenew ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </GlassMorphism>
        </Grid>
      </Grid>
    </MotionBox>
  );
};

export default DomainStatus;
