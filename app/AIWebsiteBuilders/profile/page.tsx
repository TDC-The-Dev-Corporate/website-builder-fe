"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Dice1 as License,
  Briefcase,
  Edit,
  Globe,
} from "lucide-react";

import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Link,
} from "@mui/material";

import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";
import { generateOrganizationSchema } from "@/lib/metadata";
import JsonLd from "@/app/components/JsonLd";

export default function ViewProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!user) return;
      try {
        const response = getPortfolioByUserName(user.username);
        if (!response) {
          localStorage.setItem("published", "false");
          throw new Error("Failed to fetch portfolio");
        }
        const data = await response;
        setPortfolio(data);
        data
          ? localStorage.setItem("published", "true")
          : localStorage.setItem("published", "false");
      } catch (error) {
        localStorage.setItem("published", "false");
        console.error("Error fetching portfolio:", error);
      }
    }
    fetchPortfolio();
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "#0f172a" }}>
        <Typography>Please log in to view your profile.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: "100%", position: "relative" }}>
      {user && <JsonLd data={generateOrganizationSchema(user)} />}
      <GlassMorphism blur={10} opacity={0.06}>
        <Tooltip title="Edit Profile" arrow>
          <IconButton
            onClick={() => router.push("/AIWebsiteBuilders/profile/edit")}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
              },
              zIndex: 1,
            }}
          >
            <Edit size={20} color="white" />
          </IconButton>
        </Tooltip>

        <Grid container>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: { xs: 150, md: 200 },
                  height: { xs: 150, md: 200 },
                  borderRadius: "50%",
                  overflow: "hidden",
                  mb: 3,
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid rgba(2,6,23,0.06)",
                }}
              >
                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={`${user.name} - Professional ${user.tradeSpecialization}`}
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <User size={80} color="white" />
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{ color: "#0f172a", mb: 1, fontWeight: 700 }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#0b61d6", mb: 3, fontWeight: 600 }}
              >
                {user.companyName}
              </Typography>

              <Divider
                sx={{ borderColor: "rgba(15,23,42,0.06)", my: 3 }}
              />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Mail size={20} color="#3b82f6" />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(15,23,42,0.6)" }}
                      >
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#0f172a" }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Phone size={20} color="#3b82f6" />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(15,23,42,0.6)" }}
                      >
                        Phone
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#0f172a" }}>
                        {user.phoneNumber}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <License size={20} color="#3b82f6" />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(15,23,42,0.6)" }}
                      >
                        License Number
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#0f172a" }}>
                        {user.licenseNumber}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Briefcase size={20} color="#3b82f6" />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(15,23,42,0.6)" }}
                      >
                        Trade Specialization
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#0f172a" }}>
                        {user.tradeSpecialization}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <MapPin size={20} color="#3b82f6" />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(15,23,42,0.6)" }}
                      >
                        Business Address
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#0f172a" }}>
                        {user.address}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {portfolio && (
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Globe size={20} color="#3b82f6" />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(15,23,42,0.6)" }}
                        >
                          Website URL
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#0f172a" }}>
                          <Link
                            href={`${process.env.NEXT_PUBLIC_APP_URL ||
                              "https://tradesbuilderpro.com"
                              }/AIWebsiteBuilders/portfolio/${user.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{ color: "#0f172a", fontWeight: 500 }}
                          >
                            {`${process.env.NEXT_PUBLIC_APP_URL ||
                              "https://tradesbuilderpro.com"
                              }/AIWebsiteBuilders/portfolio/${user.username}`}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </GlassMorphism>
    </Box>
  );
}
