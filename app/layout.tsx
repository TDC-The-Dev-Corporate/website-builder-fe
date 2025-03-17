"use client";

import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { ProtectRoute } from "./protectRoute";

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
          <ProtectRoute>{children}</ProtectRoute>
        </Provider>
      </body>
    </html>
  );
}
