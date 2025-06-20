import { Metadata } from "next";

import { profileMetadata } from "@/lib/metadata";
import EditProfileForm from "@/app/components/profile/EditProfileForm";

export const metadata: Metadata = {
  ...profileMetadata,
  title: "Edit Profile | TradesBuilder",
  description: "Update your trade business profile information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditProfile() {
  return <EditProfileForm />;
}
