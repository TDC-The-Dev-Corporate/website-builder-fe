import { Metadata } from "next";

import { authMetadata } from "@/lib/metadata";
import LoginForm from "@/app/components/LoginForm";

export const metadata: Metadata = {
  ...authMetadata,
  title: "Sign In | TradesBuilder",
};

export default function Login() {
  return <LoginForm />;
}
