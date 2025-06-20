import { Metadata } from "next";

import { authMetadata } from "@/lib/metadata";
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Forgot Password | TradesBuilder",
  description: "Reset your TradesBuilder account password.",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
