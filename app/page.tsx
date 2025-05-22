import { Metadata } from "next";

import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "TradesBuilder | Create Professional Websites for Tradespeople",
  description:
    "Create professional, customizable websites for your trade business in minutes. No coding required.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
