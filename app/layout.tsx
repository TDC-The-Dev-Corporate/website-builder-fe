"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import LoadingSpinner from "./components/animations/LoadingSpinner";
import { ProtectRoute } from "./protectRoute";
import { initHotjar } from "@/lib/hotjar";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

import theme from "@/lib/theme";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initHotjar(
      Number(process.env.NEXT_PUBLIC_HOTJAR_ID),
      6 // Always 6 (Hotjar version)
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      }
    };
    handleRouteChange(window.location.pathname); // Initial pageview
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />

        {/* 🟡 Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
                  backgroundColor: "background.default",
                }}
              >
                <LoadingSpinner message="Getting the hammer & nails ready..." />
              </Box>
            ) : (
              <ProtectRoute>{children}</ProtectRoute>
            )}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
