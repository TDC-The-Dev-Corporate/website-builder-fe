"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Box, Typography, Container } from "@mui/material";

import AppLoader from "@/app/components/loader/AppLoader";

import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";

export default function PortfolioPage() {
  console.log('🚀 PortfolioPage.tsx: Component loaded');
  
  const params = useParams();
  const username = params.username as string;
  const [portfolio, setPortfolio] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('🔍 PortfolioPage.tsx: Username from params:', username);

  useEffect(() => {
    function handleClick(e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.dataset.action;
      const modalId = btn.dataset.modalId;

      if (action === "open-drawer") {
        document.getElementById("drawer")?.classList.add("active");
        document.getElementById("overlay")?.classList.add("active");
      }

      if (action === "close-drawer") {
        document.getElementById("drawer")?.classList.remove("active");
        document.getElementById("overlay")?.classList.remove("active");
      }

      if (action === "open-modal" && modalId) {
        document.getElementById(modalId)?.classList.add("active");
        document.getElementById("overlay")?.classList.add("active");
      }

      if (action === "close-modal" && modalId) {
        document.getElementById(modalId)?.classList.remove("active");
        document.getElementById("overlay")?.classList.remove("active");
      }
    }

    function handleOverlayClick() {
      document.getElementById("drawer")?.classList.remove("active");

      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        modal.classList.remove("active");
      });

      document.getElementById("overlay")?.classList.remove("active");
    }

    function handleModalClick(e) {
      e.stopPropagation();
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      alert("Thank you for your submission! We will contact you shortly.");
      e.target.reset();

      const modal = e.target.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
        document.getElementById("overlay")?.classList.remove("active");
      }
    }

    document.addEventListener("click", handleClick);
    document
      .getElementById("overlay")
      ?.addEventListener("click", handleOverlayClick);

    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal.addEventListener("click", handleModalClick);
    });

    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", handleFormSubmit);
    });

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
      document
        .getElementById("overlay")
        ?.removeEventListener("click", handleOverlayClick);

      modals.forEach((modal) => {
        modal.removeEventListener("click", handleModalClick);
      });

      forms.forEach((form) => {
        form.removeEventListener("submit", handleFormSubmit);
      });
    };
  }, []);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!username) return;

      console.log('🔍 PortfolioPage.tsx: Fetching portfolio for username:', username);

      try {
        const response = getPortfolioByUserName(username);
        if (!response) {
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response;
        console.log('✅ PortfolioPage.tsx: Portfolio data received:', !!data);
        console.log('📄 PortfolioPage.tsx: Has pagesData:', !!data?.pagesData);
        
        if (data?.pagesData) {
          try {
            const pagesData = JSON.parse(data.pagesData);
            console.log('🔍 PortfolioPage.tsx: Parsed pages data:', pagesData);
            
            // Handle different data formats
            let pages = [];
            if (Array.isArray(pagesData)) {
              pages = pagesData;
            } else if (pagesData.pages && Array.isArray(pagesData.pages)) {
              pages = pagesData.pages;
            } else if (typeof pagesData === 'object') {
              pages = Object.values(pagesData);
            }
            
            console.log('=== PORTFOLIOPAGE: AVAILABLE ROUTES ===');
            console.log(`🏠 Home Page: http://localhost:3000/AIWebsiteBuilders/portfolio/${username}`);
            
            pages.forEach((page: any, index) => {
              if (index === 0) {
                console.log(`📄 "${page.name}" (Home): http://localhost:3000/AIWebsiteBuilders/portfolio/${username}`);
              } else {
                const pageSlug = page.name.toLowerCase().replace(/\s+/g, '-');
                console.log(`📄 "${page.name}": http://localhost:3000/AIWebsiteBuilders/portfolio/${username}/${pageSlug}`);
              }
            });
            console.log('==========================================');
          } catch (parseError) {
            console.error('❌ PortfolioPage.tsx: Error parsing pages data:', parseError);
          }
        }
        
        setPortfolio(data);
        setLoading(false);
      } catch (error) {
        console.error("❌ PortfolioPage.tsx: Error fetching portfolio:", error);
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
