import { Metadata } from "next";

import { authMetadata } from "@/lib/metadata";
import OTPVerificationForm from "@/app/components/auth/OTPVerificationForm";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Verify OTP | TradesBuilder",
  description: "Verify your identity to reset your password.",
};

export default function OTPVerification() {
  return <OTPVerificationForm />;
}
