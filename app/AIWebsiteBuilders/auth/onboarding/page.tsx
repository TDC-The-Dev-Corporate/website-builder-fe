import { Metadata } from "next";

import { authMetadata } from "@/lib/metadata";
import OnboardingFlow from "@/app/components/auth/OnboardingFlow";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Welcome to TradesBuilder",
  description: "Set up your trade business website in minutes.",
};

export default function Onboarding() {
  return <OnboardingFlow />;
}
