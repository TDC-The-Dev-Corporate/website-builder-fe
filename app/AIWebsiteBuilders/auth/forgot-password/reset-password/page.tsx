import { Metadata } from "next";

import { authMetadata } from "@/lib/metadata";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Reset Password | TradesBuilder",
  description: "Create a new password for your TradesBuilder account.",
};

export default function ResetPassword() {
  return <ResetPasswordForm />;
}
