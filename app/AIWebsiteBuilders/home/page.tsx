"use client";

import { useEffect, useState } from "react";

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

import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";
import AppLoader from "@/app/components/loader/AppLoader";

import { logoutUser } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUsername(JSON.parse(storedUser).username);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!username) return;

      try {
        const response = getPortfolioByUserName(username);
        if (!response) {
          localStorage.setItem("published", "false");
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response;
        setPortfolio(data);
        setLoading(false);
        data
          ? localStorage.setItem("published", "true")
          : localStorage.setItem("published", "false");
      } catch (error) {
        localStorage.setItem("published", "false");
        console.error("Error fetching portfolio:", error);
      }
    }

    fetchPortfolio();
  }, [username]);

  const handleTemplateSelecion = () => {
    router.push("/AIWebsiteBuilders/template-selector");
  };

  return (
    <AppLoader loading={loading}>
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
          {portfolio && (
            <Paper elevation={3} sx={{ p: 5, mb: 2 }}>
              <ProfileURLCard
                url={`http://localhost:3000/AIWebsiteBuilders/portfolio/${username}`}
              />
            </Paper>
          )}
          <Paper elevation={3} sx={{ p: 5 }}>
            <Button
              sx={{ color: "#0d47a1" }}
              onClick={() => handleTemplateSelecion()}
            >
              Choose a Template
            </Button>
            {/* <Typography variant="h5" sx={{ mb: 2 }}>
              Choose a Template
            </Typography>
            <TemplateSelector /> */}
          </Paper>
        </Container>
      </Box>
    </AppLoader>
  );
}
