import { FC } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigLeft, Save, PlayCircle, Upload } from "lucide-react";
import { Box, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ActionButton, AppHeader } from "./helpingComponents";

export const EditorHeader: FC<{
  selectedTemplate: any;
  setSaveConfirmationOpen: any;
  setPublishConfirmationOpen: any;
  isSaving: any;
  isPublishing: any;
  onStartTutorial: () => void;
  isPublished?: boolean;
  portfolioId?: string;
}> = ({
  selectedTemplate,
  setSaveConfirmationOpen,
  setPublishConfirmationOpen,
  isSaving,
  isPublishing,
  onStartTutorial,
  isPublished = false,
  portfolioId,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Debug: Log all props
  console.log("EditorHeader props:", { 
    portfolioId, 
    isPublished, 
    isSaving, 
    isPublishing,
    setPublishConfirmationOpen: typeof setPublishConfirmationOpen
  });

  return (
    <AppHeader>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            backgroundColor: "white",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: 24, height: 17, objectFit: "cover" }}
            alt="Logo"
            src="/images/Logo.png"
          />
        </Box>
        <Typography
          variant={isMobile ? "h6" : "h4"}
          sx={{
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            color: "white",
            fontSize: isMobile ? "28px" : "48px",
          }}
        >
          TRADES BUILDER PRO
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1.5}>
        <Tooltip title="Back to Home">
          <span>
            <ActionButton
              variant="outlined"
              onClick={() => router.push("/AIWebsiteBuilders/home")}
              disabled={isSaving}
              data-tutorial="back-button"
              sx={{
                width: 44,
                height: 44,
                minWidth: 0,
                borderRadius: "50%",
                padding: 0,
                borderColor: "transparent",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                  borderColor: "transparent",
                },
              }}
            >
              <ArrowBigLeft size={20} />
            </ActionButton>
          </span>
        </Tooltip>

        <Tooltip title={isSaving ? "Saving..." : "Save Changes"}>
          <span>
            <ActionButton
              variant="outlined"
              onClick={() => {
                console.log("Save button clicked!");
                setSaveConfirmationOpen(true);
              }}
              disabled={isSaving || isPublishing}
              data-tutorial="save-button"
              sx={{
                width: 44,
                height: 44,
                minWidth: 0,
                borderRadius: "50%",
                padding: 0,
                borderColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                  borderColor: "transparent",
                },
                color: "white",
              }}
            >
              <Save size={20} />
            </ActionButton>
          </span>
        </Tooltip>

        {/* Publish button - only show for drafts or if no published portfolio exists */}
        {portfolioId && (
          <Tooltip title="Publish">
            <span>
              <ActionButton
                variant="outlined"
                onClick={() => {
                  console.log("Publish button clicked!", { portfolioId, isPublished });
                  console.log("setPublishConfirmationOpen function:", setPublishConfirmationOpen);
                  console.log("About to call setPublishConfirmationOpen(true)");
                  // Bypass modal for testing - call publish directly
                  if ((window as any).handlePublishConfirm) {
                    console.log("Calling handlePublishConfirm directly");
                    (window as any).handlePublishConfirm();
                  } else {
                    console.log("handlePublishConfirm not found on window, using modal");
                    setPublishConfirmationOpen(true);
                  }
                  console.log("Called setPublishConfirmationOpen(true)");
                }}
                disabled={isSaving || isPublishing}
                data-tutorial="publish-button"
                sx={{
                  width: 44,
                  height: 44,
                  minWidth: 0,
                  borderRadius: "50%",
                  padding: 0,
                  borderColor: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "scale(1.1)",
                    borderColor: "transparent",
                  },
                  color: "white",
                }}
              >
                <Upload size={20} />
              </ActionButton>
            </span>
          </Tooltip>
        )}

        <Tooltip title="Show Tutorial">
          <span>
            <ActionButton
              variant="outlined"
              onClick={onStartTutorial}
              sx={{
                width: 44,
                height: 44,
                minWidth: 0,
                borderRadius: "50%",
                borderColor: "transparent",
                padding: 0,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                  borderColor: "transparent",
                },
                color: "white",
              }}
            >
              <PlayCircle size={20} />
            </ActionButton>
          </span>
        </Tooltip>
      </Box>
    </AppHeader>
  );
};
