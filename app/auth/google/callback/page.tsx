"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/app/services/api";
import LoadingSpinner from "@/app/components/animations/LoadingSpinner";
import { LoadingScreen } from "@/app/AIWebsiteBuilders/template-selector/helpingComponents";

const Redirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code || hasRun.current) return;

    hasRun.current = true;

    const validateGoogleCode = async () => {
      try {
        const response = await api.post("/auth/google/validate", {
          code,
        });

        console.log("✅ response", response);

        const { user, token } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        router.push("/AIWebsiteBuilders/home");
      } catch (error) {
        console.error("❌ Validation failed:", error);
      }
    };

    validateGoogleCode();
  }, [searchParams, router]);

  return (
    <LoadingScreen>
      <LoadingSpinner />{" "}
    </LoadingScreen>
  );
};

export default Redirect;
