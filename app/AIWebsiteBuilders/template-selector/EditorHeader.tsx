import { FC } from "react";
import { useRouter } from "next/navigation";

import { ArrowBigLeft, Save } from "lucide-react";

import { Box, Typography } from "@mui/material";

import { ActionButton, AppHeader } from "./helpingComponents";

export const EditorHeader: FC<{
  selectedTemplate: any;
  setSaveConfirmationOpen: any;
  isSaving: any;
}> = ({ selectedTemplate, setSaveConfirmationOpen, isSaving }) => {
  const router = useRouter();
  return (
    <AppHeader>
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Box
          sx={{
            width: "38px",
            height: "38px",
            backgroundColor: "white",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "24px", height: "17px", objectFit: "cover" }}
            alt="Logo"
            src="/images/Logo.png"
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            color: "white",
            fontSize: "64px",
          }}
        >
          TRADES BUILDER PRO
        </Typography>
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
