"use client";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import {
  Container,
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

import ViewProfile from "../profile/page";
import ProfileURLCard from "../profile/profileUrl";
import TemplateSelector from "@/app/components/TemplateSelector";

import { logoutUser } from "@/lib/utils";

export default function Home() {
  const username = JSON.parse(localStorage.getItem("user")).username;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static" elevation={1} color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Website Builders
          </Typography>
          <Button sx={{ color: "#0d47a1" }} onClick={() => logoutUser()}>
            <LogoutOutlinedIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={false}
        sx={{
          py: 4,
          width: "100%",
          mx: "auto",
        }}
      >
        <Paper elevation={3} sx={{ p: 5, mb: 2 }}>
          <ViewProfile />
        </Paper>
        <Paper elevation={3} sx={{ p: 5, mb: 2 }}>
          <ProfileURLCard
            url={`http://localhost:3000/AIWebsiteBuilders/portfolio/${username}`}
          />
        </Paper>
        <Paper elevation={3} sx={{ p: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Choose a Template
          </Typography>
          <TemplateSelector />
        </Paper>
      </Container>
    </Box>
  );
}
