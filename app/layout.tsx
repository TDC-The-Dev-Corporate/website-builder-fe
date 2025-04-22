// "use client";

// import { useEffect } from "react";
// import { Provider } from "react-redux";
// import { usePathname } from "next/navigation";

// import { ProtectRoute } from "./protectRoute";

// import { useAppDispatch } from "@/lib/redux/hooks";
// import { clearError } from "@/lib/redux/slices/authSlice";
// import { store } from "@/lib/redux/store";

// function ErrorClearer() {
//   const dispatch = useAppDispatch();
//   const pathname = usePathname();

//   useEffect(() => {
//     dispatch(clearError());
//   }, [pathname, dispatch]);

//   return null;
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}
//     >
//       <body style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}>
//         <Provider store={store}>
//           <ErrorClearer />
//           <ProtectRoute>{children}</ProtectRoute>
//         </Provider>
//       </body>
//     </html>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import theme from "@/lib/theme";
import LoadingSpinner from "./components/animations/LoadingSpinner";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { ProtectRoute } from "./protectRoute";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
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
