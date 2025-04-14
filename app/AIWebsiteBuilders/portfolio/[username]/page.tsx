"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Box, Typography } from "@mui/material";

import Portfolio from "./portfolio";
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
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Portfolio not found
          </Typography>
        </Box>
      )}
    </AppLoader>
  );
}
