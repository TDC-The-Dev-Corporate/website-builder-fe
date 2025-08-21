"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Box, Typography, Container, Chip, AppBar, Toolbar } from "@mui/material";

import AppLoader from "@/app/components/loader/AppLoader";

import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";

interface PageData {
  id: string;
  name: string;
  html: string;
  htmlContent: string;
  cssContent: string;
}

interface MultiPagePortfolioProps {
  username: string;
  requestedPage?: string;
}

export default function MultiPagePortfolio({ 
  username, 
  requestedPage 
}: MultiPagePortfolioProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [portfolio, setPortfolio] = useState<any | null>(null);
  const [pages, setPages] = useState<Record<string, PageData>>({});
  const [currentPageId, setCurrentPageId] = useState<string>("");
  const [currentPageData, setCurrentPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMultiplePages, setHasMultiplePages] = useState(false);

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

      try {
        const response = getPortfolioByUserName(username);
        if (!response) {
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response;
        setPortfolio(data);

        if (data.pagesData && typeof data.pagesData === 'string') {
          try {
            const pagesData = JSON.parse(data.pagesData);
            console.log('Parsed pages data:', pagesData);
            console.log('Requested page:', requestedPage);
            
            const pagesObj = {};
            if (Array.isArray(pagesData)) {
              // New format: array of pages
              console.log('Processing array format pages');
              pagesData.forEach(page => {
                pagesObj[page.id] = page;
              });
            } else if (pagesData.pages && Array.isArray(pagesData.pages)) {
              // Format with pages array property
              console.log('Processing nested pages array format');
              pagesData.pages.forEach(page => {
                pagesObj[page.id] = page;
              });
            } else if (typeof pagesData === 'object') {
              // Legacy object format
              console.log('Processing legacy object format');
              Object.assign(pagesObj, pagesData);
            }
            
            console.log('Final pages object:', pagesObj);
            console.log('Available page names:', Object.values(pagesObj).map((p: any) => p.name));
            console.log('Available page slugs:', Object.values(pagesObj).map((p: any) => p.name.toLowerCase().replace(/\s+/g, '-')));
            
            setPages(pagesObj);
            setHasMultiplePages(Object.keys(pagesObj).length > 1);

            // Find the appropriate page to display
            let targetPageId = Object.keys(pagesObj)[0]; // Default to first page

            // If a specific page is requested, try to find it
            if (requestedPage) {
              console.log('Looking for requested page:', requestedPage);
              const foundPageId = Object.keys(pagesObj).find(
                pageId => {
                  const pageSlug = pagesObj[pageId].name.toLowerCase().replace(/\s+/g, '-');
                  console.log(`Comparing "${pageSlug}" with "${requestedPage}"`);
                  return pageSlug === requestedPage;
                }
              );
              console.log('Found page ID:', foundPageId);
              if (foundPageId) {
                targetPageId = foundPageId;
              } else {
                console.warn(`Page "${requestedPage}" not found, using first page`);
              }
            }

            console.log('Setting current page ID:', targetPageId);
            setCurrentPageId(targetPageId);
            setCurrentPageData(pagesObj[targetPageId]);

            // Log all available routes for debugging
            console.log('=== AVAILABLE ROUTES ===');
            Object.values(pagesObj).forEach((page: any, index) => {
              const pageSlug = page.name.toLowerCase().replace(/\s+/g, '-');
              const isFirstPage = index === 0;
              const route = isFirstPage 
                ? `/AIWebsiteBuilders/portfolio/${username}`
                : `/AIWebsiteBuilders/portfolio/${username}/${pageSlug}`;
              console.log(`📄 "${page.name}" → ${route}`);
            });
            console.log('========================');
          } catch (error) {
            console.error('Failed to parse pages data:', error);
            setHasMultiplePages(false);
          }
        } else {
          // Single page portfolio
          console.log('No pagesData found, treating as single page');
          setHasMultiplePages(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [username, requestedPage]);

  const handlePageChange = (pageId: string, pageName: string) => {
    const pageSlug = pageName.toLowerCase().replace(/\s+/g, '-');
    const isFirstPage = Object.keys(pages)[0] === pageId;
    
    // Use clean URLs for navigation
    const newUrl = isFirstPage 
      ? `/AIWebsiteBuilders/portfolio/${username}`
      : `/AIWebsiteBuilders/portfolio/${username}/${pageSlug}`;
    
    setCurrentPageId(pageId);
    setCurrentPageData(pages[pageId]);
    
    // Navigate to the new URL
    router.push(newUrl);
  };

  const renderPageNavigation = () => {
    if (!hasMultiplePages || Object.keys(pages).length <= 1) return null;

    return (
      <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0,0,0,0.8)', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {portfolio?.user?.name || username}'s Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {Object.entries(pages).map(([pageId, pageData], index) => {
              const isFirstPage = index === 0;
              const pageSlug = pageData.name.toLowerCase().replace(/\s+/g, '-');
              console.log(`Navigation button for "${pageData.name}" (${pageSlug}), isFirst: ${isFirstPage}`);
              
              return (
                <Chip
                  key={pageId}
                  label={pageData.name}
                  onClick={() => handlePageChange(pageId, pageData.name)}
                  color={currentPageId === pageId ? "primary" : "default"}
                  variant={currentPageId === pageId ? "filled" : "outlined"}
                  sx={{ 
                    color: currentPageId === pageId ? 'white' : 'rgba(255,255,255,0.8)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                />
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

  const renderPageContent = () => {
    console.log('Rendering page content:', {
      hasMultiplePages,
      currentPageData: currentPageData?.name,
      portfolioHtmlContent: !!portfolio?.htmlContent
    });

    if (hasMultiplePages && currentPageData) {
      // Render the specific page content
      console.log('Rendering multi-page content for:', currentPageData.name);
      return (
        <Box
          sx={{ minHeight: "calc(100vh - 64px)" }}
          dangerouslySetInnerHTML={{ __html: currentPageData.html }}
        />
      );
    } else if (portfolio?.htmlContent) {
      // Fallback to single page content
      console.log('Rendering single page content');
      return (
        <Box
          sx={{ minHeight: "100vh" }}
          dangerouslySetInnerHTML={{ __html: portfolio.htmlContent }}
        />
      );
    } else {
      console.log('No content found, showing error message');
      return (
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
              {requestedPage ? `Page "${requestedPage}" Not Found` : "Portfolio Not Found"}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              {requestedPage 
                ? `The page "${requestedPage}" doesn't exist in this portfolio.`
                : "The portfolio you're looking for is either unavailable or doesn't exist."
              }
            </Typography>
            {requestedPage && hasMultiplePages && (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                Available pages: {Object.values(pages).map(p => p.name).join(', ')}
              </Typography>
            )}
          </Box>
        </Container>
      );
    }
  };

  return (
    <AppLoader loading={loading}>
      {loading ? null : (
        <>
          {/* {renderPageNavigation()} */}
          
          {/* Development Debug Panel */}
          {/* {process.env.NODE_ENV === 'development' && hasMultiplePages && (
            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
              <Typography variant="h6" gutterBottom>🔧 Debug: Available Routes</Typography>
              {Object.values(pages).map((page: any, index) => {
                const pageSlug = page.name.toLowerCase().replace(/\s+/g, '-');
                const isFirstPage = index === 0;
                const route = isFirstPage 
                  ? `/AIWebsiteBuilders/portfolio/${username}`
                  : `/AIWebsiteBuilders/portfolio/${username}/${pageSlug}`;
                return (
                  <Box key={page.id} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      📄 <strong>{page.name}</strong> → 
                      <a 
                        href={route} 
                        style={{ marginLeft: '8px', color: '#1976d2' }}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = route;
                        }}
                      >
                        {route}
                      </a>
                      {currentPageId === page.id && <span style={{ color: 'green', marginLeft: '8px' }}>← Current</span>}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )} */}
          
          {renderPageContent()}
        </>
      )}
    </AppLoader>
  );
}
