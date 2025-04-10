"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";

import { ProtectRoute } from "./protectRoute";

import { useAppDispatch } from "@/lib/redux/hooks";
import { clearError } from "@/lib/redux/slices/authSlice";
import { store } from "@/lib/redux/store";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../app/globals.css";

function ErrorClearer() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(clearError());
  }, [pathname, dispatch]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}
    >
      <body style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}>
        <Provider store={store}>
          <ErrorClearer />
          <ProtectRoute>
            <div
              style={{
                height: "100vh",
                position: "relative",
                overflow: "visible", // Add this
                isolation: "isolate", // Creates new stacking context
              }}
            >
              {children}
            </div>
          </ProtectRoute>
        </Provider>
      </body>
    </html>
  );
}
