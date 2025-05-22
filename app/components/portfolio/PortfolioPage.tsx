"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Box, Typography, Container } from "@mui/material";

import AppLoader from "@/app/components/loader/AppLoader";

import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";

export default function PortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const [portfolio, setPortfolio] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!username) return;

      try {
        const response = getPortfolioByUserName(username);
        if (!response) {
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response;
        setPortfolio(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [username]);

  return (
    <AppLoader loading={loading}>
      {loading ? null : portfolio ? (
        <Box
          sx={{
            minHeight: "100vh",
            padding: 4,
          }}
          dangerouslySetInnerHTML={{ __html: portfolio.htmlContent }}
        />
      ) : (
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
            }}
          >
            <Typography variant="h4" color="text.primary" gutterBottom>
              Portfolio Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              The portfolio you're looking for is either unavailable or doesn't
              exist.
            </Typography>
          </Box>
        </Container>
      )}
    </AppLoader>
  );
}
