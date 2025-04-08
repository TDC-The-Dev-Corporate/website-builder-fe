"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ViewProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  if (!user) {
    return (
      <Container>
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Grid container spacing={5} padding={3}>
      {/* <Paper elevation={3} sx={{ p: 4 }}> */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              mb: 2,
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt="Profile"
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 100, color: "#9e9e9e" }} />
            )}
          </Box>
          <Button
            variant="contained"
            onClick={() => router.push("/AIWebsiteBuilders/profile/edit")}
            sx={{
              mt: 2,
              backgroundColor: "#0d47a1 !important",
            }}
          >
            Edit Profile
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="h6" color="#0d47a1" gutterBottom>
            {user.companyName}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Business Address
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                License Number
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.licenseNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Trade Specialization
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.tradeSpecialization}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </Grid>
  );
}
