// pages/oauth-redirect.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const OAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(pathname.split("?")[1]);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token as string);
      router.push("/AIWebsiteBuilders/home");
    }
  }, [token, router]);

  return <div>Loading...</div>;
};

export default OAuthRedirect;
