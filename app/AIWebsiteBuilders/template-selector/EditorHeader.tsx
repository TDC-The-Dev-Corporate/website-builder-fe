import { FC } from "react";
import { useRouter } from "next/navigation";

import { ArrowBigLeft, Save } from "lucide-react";

import { Avatar, Box, Chip } from "@mui/material";

import { ActionButton, AppHeader } from "./helpingComponents";

export const EditorHeader: FC<{
  selectedTemplate: any;
  setSaveConfirmationOpen: any;
  isSaving: any;
}> = ({ selectedTemplate, setSaveConfirmationOpen, isSaving }) => {
  const router = useRouter();
  return (
    <AppHeader>
      <Box display="flex" alignItems="center">
        <Avatar
          src="/images/TradesBuilderLogo.png"
          alt="logo"
          sx={{ width: 150, height: 50 }}
        />
        {selectedTemplate && (
          <Chip
            label={selectedTemplate.name || "New Portfolio"}
            color="primary"
            size="small"
            sx={{ color: "white" }}
          />
        )}
      </Box>

      <Box display="flex" alignItems="center">
        <ActionButton
          variant="contained"
          startIcon={<ArrowBigLeft size={18} />}
          onClick={() => router.push("/AIWebsiteBuilders/home")}
          disabled={isSaving}
          sx={{
            background: "linear-gradient(135deg, #34C759 0%, #30B350 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #30B350 0%, #2CA548 100%)",
            },
            minWidth: 180,
            color: "white",
          }}
        >
          {"Back to Home"}
        </ActionButton>
        <ActionButton
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={() => setSaveConfirmationOpen(true)}
          disabled={isSaving}
          sx={{
            background: isSaving
              ? "rgba(52, 199, 89, 0.7)"
              : "linear-gradient(135deg, #34C759 0%, #30B350 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #30B350 0%, #2CA548 100%)",
            },
            minWidth: 180,
            color: "white",
          }}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </ActionButton>
      </Box>
    </AppHeader>
  );
};
