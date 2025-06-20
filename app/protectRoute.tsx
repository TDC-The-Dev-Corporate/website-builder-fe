"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const protectedRoutes = [
    "/AIWebsiteBuilders/home",
    "/AIWebsiteBuilders/editor",
    "/AIWebsiteBuilders/profile/edit",
    "/AIWebsiteBuilders/template-selector",
  ];

  const isRouteProtected = (route: string) =>
    protectedRoutes.some((protectedRoute) => route.startsWith(protectedRoute));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && isRouteProtected(pathname)) {
      router.replace("/AIWebsiteBuilders/auth/login");
    }
  }, [pathname]);

  return <>{children}</>;
};
