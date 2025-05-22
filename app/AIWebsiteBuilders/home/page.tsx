import { Metadata } from "next";

import { dashboardMetadata } from "@/lib/metadata";
import Dashboard from "@/app/components/dashboard/Dashboard";

export const metadata: Metadata = {
  ...dashboardMetadata,
  title: "Dashboard | TradesBuilder",
};

export default function HomePage() {
  return <Dashboard />;
}
