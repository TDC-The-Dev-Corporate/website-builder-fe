"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Wand2, Image as ImageIcon } from "lucide-react";

import { Box, Dialog, DialogContent, Fab, Tooltip } from "@mui/material";

// Import link utilities and components
// Removed custom editors - using Studio SDK built-in editors now
import { generateFullHtml, generateAllPagesHtml, getProjectData } from "./utils/htmlGenerator";
import { editorHelpers } from "./utils/editorHelpers";
import { builderSchema } from "./utils/schemas";
import {
  createAssetManagerConfig,
  deviceManagerConfig,
  panelsConfig,
  layerManagerConfig,
  selectorManagerConfig
} from "./config/editorConfig";
import { createEditorPlugins } from "./config/editorPlugins";
import { createTemplatesConfig, loadSelectedTemplate as loadTemplate } from "./config/templateConfig";

import StudioEditor from "@grapesjs/studio-sdk/react";
import { 
  youtubeAssetProvider, 
  layoutSidebarButtons, 
  canvasGridMode, 
  canvasFullSize, 
  canvasEmptyState, 
  rteProseMirror, 
  flexComponent, 
  accordionComponent, 
  iconifyComponent, 
  swiperComponent, 
  lightGalleryComponent, 
  fsLightboxComponent, 
  listPagesComponent, 
  tableComponent 
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { hvacTemplate } from "@/lib/templates/hvac";
import { plumberTemplate } from "@/lib/templates/plumber";
import { electricianTemplate } from "@/lib/templates/electrician";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import { painterTemplate } from "@/lib/templates/painter";

import DeploySuccessModal from "@/app/components/modals/DeploySuccessModal";
import ConfirmationModal from "@/app/components/modals/ConfirmationModal";
import FileUploadManager from "@/app/components/FileUploadManager";
import LoadingSpinner from "@/app/components/animations/LoadingSpinner";
import ContentGenerator from "@/app/components/AI/ContentGenerator";
import JsonLd from "../JsonLd";
import {
  addTooltips,
  grapesJsStyles,
  LoadingScreen,
  waitForElement,
} from "@/app/AIWebsiteBuilders/template-selector/helpingComponents";
import { EditorHeader } from "@/app/AIWebsiteBuilders/template-selector/EditorHeader";

import { useAppDispatch } from "@/lib/redux/hooks";
import {
  generatePortfolio,
  publishPortfolio,
  resetCache,
  updateExistingPortfolio,
} from "@/lib/redux/slices/portfolioSlice";
import { useToast } from "@/hooks/use-toast";

import { isDefaultTemplate, uploadToCloudinary } from "@/lib/utils";
import TutorialOverlay from "../tutorial/TutorialOverlay";
import { tutorialSteps } from "../tutorial/TutorialSteps";

export default function PortfolioBuilder() {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);

  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [publishConfirmationOpen, setPublishConfirmationOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [portfolioId, setPortfolioId] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [showContentGenerator, setShowContentGenerator] = useState(false);

  const [userTrade, setUserTrade] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Debug: Track publishConfirmationOpen state changes
  useEffect(() => {
    console.log("publishConfirmationOpen state changed:", publishConfirmationOpen);
  }, [publishConfirmationOpen]);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const template = localStorage.getItem("selectedTemplate");
    if (template) {
      const parsedTemplate = JSON.parse(template);
      setSelectedTemplate(parsedTemplate);

      // Set portfolio ID if it exists (for saved drafts/published portfolios)
      if (parsedTemplate.id && !isDefaultTemplate(parsedTemplate.id)) {
        setPortfolioId(parsedTemplate.id);
        console.log("Portfolio ID loaded from template:", parsedTemplate.id);
      }

      // Check if this portfolio is already published
      const publishedStatus = localStorage.getItem("published");
      const isTemplatePublished = parsedTemplate.isPublished || parsedTemplate.deployUrl || publishedStatus === "true";
      setIsPublished(isTemplatePublished);
      console.log("Portfolio published status:", isTemplatePublished);
    }

    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserTrade(userData.tradeSpecialization || "tradesman");
      setBusinessName(
        userData.businessName || userData.name || "your business"
      );
    }
  }, []);

  // Template loading is now handled by modular config

  const licenseKey = process.env.NEXT_PUBLIC_GRAPESJS_LICENSE_KEY;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup effect to ensure cache is cleared when component unmounts
  useEffect(() => {
    return () => {
      // Clear any pending operations or caches when component unmounts
      dispatch(resetCache());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!tutorialActive) return;

    const step = tutorialSteps[currentStep];

    const runStep = async () => {
      document.querySelectorAll(".tutorial-highlight").forEach((el) => {
        el.classList.remove("tutorial-highlight");
      });

      if (step.triggerBefore) {
        step.triggerBefore();
      }

      try {
        const element = await waitForElement(step.selector);

        element.classList.add("tutorial-highlight");
        setHighlightedElement(element);
      } catch (error) {
        console.warn(error);
      }
    };

    runStep();

    return () => {
      document.querySelectorAll(".tutorial-highlight").forEach((el) => {
        el.classList.remove("tutorial-highlight");
      });
    };
  }, [tutorialActive, currentStep]);

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setTutorialActive(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const startTutorial = () => {
    setTutorialActive(true);
    setCurrentStep(0);
  };

  const getFullHtml = () => generateFullHtml(editorRef.current);

  const handleSaveConfirm = async (draftName) => {
    setSaveConfirmationOpen(false);
    setIsSaving(true);

    try {
      // Get all pages data from GrapesJS - no need to fix links manually with Studio SDK
      const projectData = getProjectData(editorRef.current);
      if (!projectData) {
        console.error("Failed to get project data");
        toast({
          title: "Error",
          description: "Failed to generate project data. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Project data generated:", {
        totalPages: projectData.totalPages,
        currentPageId: projectData.currentPageId,
        pages: Object.keys(projectData.pages || {})
      });

      console.log("Clearing cache...");
      await dispatch(resetCache());

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found in localStorage");
        toast({
          title: "Error",
          description: "User session not found. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      console.log("User found:", user.id);

      // Get the first page HTML for backward compatibility (don't use current page)
      const firstPageHtml = projectData.pages && projectData.pages.length > 0 
        ? projectData.pages[0].html 
        : generateFullHtml(editorRef.current);
      
      const data = {
        userId: user.id,
        htmlContent: firstPageHtml, // Always use first page for backward compatibility
        projectData: JSON.stringify(projectData.projectData), // Complete GrapesJS project data
        pagesData: JSON.stringify(projectData.pages), // All pages HTML data
        name: isDefaultTemplate(selectedTemplate.id)
          ? draftName
          : selectedTemplate.name || "",
      };

      console.log("Save data prepared:", data);

      let response;

      if (isDefaultTemplate(selectedTemplate.id)) {
        console.log("=== CREATING NEW PORTFOLIO ===");
        response = await dispatch(generatePortfolio(data));
      } else {
        console.log("=== UPDATING EXISTING PORTFOLIO ===");
        console.log("Portfolio ID:", selectedTemplate.id);
        response = await dispatch(
          updateExistingPortfolio({ id: selectedTemplate.id, data })
        );
      }

      console.log("Redux response:", response);
      console.log("Response type:", response.type);
      console.log("Response meta:", response.meta);

      // Check for both fulfilled and rejected cases
      if (generatePortfolio.fulfilled.match(response) || updateExistingPortfolio.fulfilled.match(response)) {
        console.log("=== SAVE SUCCESSFUL ===");
        console.log("Response payload:", response.payload);

        setPortfolioId(response.payload.id);

        // Update localStorage with the new portfolio info
        const updatedTemplate = {
          ...selectedTemplate,
          id: response.payload.id,
          name: data.name
        };
        console.log("Updated template:", updatedTemplate);

        localStorage.setItem("selectedTemplate", JSON.stringify(updatedTemplate));
        setSelectedTemplate(updatedTemplate);

        setIsSaving(false);

        // Just show toast notification, no modal
        toast({
          title: "Success",
          description: "Portfolio saved successfully!",
        });
      } else {
        // Handle error case
        console.error("=== SAVE FAILED ===");
        console.error("Response:", response);
        const errorMessage = response.payload || "Failed to save portfolio";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        setIsSaving(false);
      }
    } catch (error: any) {
      console.error("=== SAVE ERROR ===", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred while saving the portfolio",
        variant: "destructive",
      });
    } finally {
      // Always reset saving state in finally block to prevent stuck state
      console.log("=== RESETTING SAVING STATE ===");
      setIsSaving(false);
    }
  };

  const handlePublishConfirm = async () => {
    console.log("🚀 handlePublishConfirm called!");
    setPublishConfirmationOpen(false);
    setIsPublishing(true);

    try {
      console.log("=== PUBLISH STARTED ===");
      console.log("Portfolio ID:", portfolioId);
      console.log("Selected Template:", selectedTemplate);

      if (!portfolioId) {
        console.error("No portfolio ID found");
        throw new Error("Portfolio must be saved before publishing");
      }

      // Save current multi-page data before publishing
      console.log("=== SAVING CURRENT PROJECT DATA BEFORE PUBLISH ===");
      const projectData = getProjectData(editorRef.current);
      if (projectData && !isDefaultTemplate(selectedTemplate?.id)) {
        const updateData = {
          projectData: JSON.stringify(projectData.projectData),
          pagesData: JSON.stringify(projectData.pages),
        };
        
        try {
          await dispatch(updateExistingPortfolio({ id: portfolioId, data: updateData }));
          console.log("Project data saved before publish");
        } catch (saveError) {
          console.warn("Failed to save project data before publish:", saveError);
          // Continue with publish anyway, as the content might already be saved
        }
      }

      const response = await dispatch(publishPortfolio(portfolioId));
      console.log("Publish response:", response);

      if (publishPortfolio.fulfilled.match(response)) {
        console.log("=== PUBLISH SUCCESSFUL ===");
        // Update published status
        localStorage.setItem("published", "true");
        setIsPublished(true);

        // Update the selected template with published status
        const updatedTemplate = {
          ...selectedTemplate,
          isPublished: true,
          published: true,
          deployUrl: `https://tradesbuilderpro.com/AIWebsiteBuilders/portfolio/${response.payload.user.username}`
        };
        localStorage.setItem("selectedTemplate", JSON.stringify(updatedTemplate));
        setSelectedTemplate(updatedTemplate);

        setDeployUrl(
          `https://tradesbuilderpro.com/AIWebsiteBuilders/portfolio/${response.payload.user.username}`
        );
        setShowDeployModal(true);

        toast({
          title: "Success",
          description: "Portfolio published successfully!",
        });
      } else {
        // Handle error case
        console.error("=== PUBLISH FAILED ===");
        console.error("Response:", response);
        throw new Error("Failed to publish portfolio");
      }
    } catch (error: any) {
      console.error("Publish error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to publish portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Expose handlePublishConfirm on window for direct testing
  useEffect(() => {
    (window as any).handlePublishConfirm = handlePublishConfirm;
    return () => {
      delete (window as any).handlePublishConfirm;
    };
  }, [handlePublishConfirm]);

  const handleModalClose = () => {
    console.log("handleModalClose called");
    console.log("publishConfirmationOpen before close:", publishConfirmationOpen);
    setSaveConfirmationOpen(false);
    setPublishConfirmationOpen(false);
    setIsSaving(false); // Reset saving state when modal is closed
    setIsPublishing(false); // Reset publishing state when modal is closed
    console.log("Modal closed, saving and publishing state reset"); // Debug log
  };

  // Add a function to reset all states - useful for debugging
  const resetAllStates = () => {
    setIsSaving(false);
    setIsPublishing(false);
    setSaveConfirmationOpen(false);
    setPublishConfirmationOpen(false);
    console.log("All states reset");
  };

  // Reset states when component mounts or selectedTemplate changes
  useEffect(() => {
    resetAllStates();
  }, [selectedTemplate?.id]);

  const handleInsertContent = (content: string, type: string) => {
    if (!editorRef.current) return;
    editorHelpers.insertContent(editorRef.current, content, type);
  };

  // Editor helpers are now imported from utils/editorHelpers.ts

  // Schema is now imported from utils/schemas.ts
  return (
    <>
      <JsonLd data={builderSchema} />
      <Head>
        <title>Trade Portfolio Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isLoading ? (
        <LoadingScreen>
          <LoadingSpinner />
        </LoadingScreen>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            pointerEvents: tutorialActive ? "none" : "auto",
          }}
        >
          <EditorHeader
            selectedTemplate={selectedTemplate}
            setSaveConfirmationOpen={setSaveConfirmationOpen}
            setPublishConfirmationOpen={setPublishConfirmationOpen}
            isSaving={isSaving}
            isPublishing={isPublishing}
            onStartTutorial={startTutorial}
            isPublished={isPublished}
            portfolioId={portfolioId}
          />

          <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <StudioEditor
              onEditor={(editor) => {
                editorRef.current = editor;

                console.log('Editor initialized with Studio SDK');

                // Load the selected template
                loadTemplate(editor, selectedTemplate);

                // Studio SDK handles most component definitions automatically
                // Only keep minimal editor setup
                editor.on("load", () => {
                  const panelManager = editor.Panels;

                  const devicesElement = document.createElement("div");
                  devicesElement.className = "panel__devices";

                  panelManager
                    .getPanel("views-container")
                    ?.set("appendContent", devicesElement);

                  const canvasBody = editor.Canvas.getBody();

                  canvasBody.addEventListener("dragover", (event) => {
                    event.preventDefault();
                  });

                  canvasBody.addEventListener("drop", (event) => {
                    event.preventDefault();
                  });

                  console.log("Editor loaded successfully");
                });

                editor.on("canvas:dragdata", async (dataTransfer, result) => {
                  if (
                    dataTransfer &&
                    dataTransfer.files &&
                    dataTransfer.files.length
                  ) {
                    result.content = null;

                    const files = Array.from(dataTransfer.files) as File[];

                    const uploadedAssets = await uploadToCloudinary(files);

                    editorHelpers.clearSelection(editor);

                    uploadedAssets.forEach((asset) => {
                      if (asset.isImage) {
                        editorHelpers.addImageComponent(editor, asset);
                      } else if (asset.type?.startsWith("video")) {
                        editorHelpers.addVideoComponent?.(editor, asset);
                      } else {
                        editorHelpers.addFileLinkComponent(editor, asset);
                      }
                    });
                  }
                });
              }}
              options={{
                licenseKey: licenseKey || 'DEMO_LOCALHOST_KEY', // Use your environment variable first, fallback to demo
                theme: 'light',
                project: {
                  type: 'web',
                  // Generate unique project ID based on selected template or current time
                  id: selectedTemplate?.id || `project_${Date.now()}`
                },
                identity: {
                  // Generate unique user ID from logged-in user or fallback to timestamp
                  id: (() => {
                    try {
                      const user = JSON.parse(localStorage.getItem("user") || '{}');
                      return user.id ? `user_${user.id}` : `user_${Date.now()}`;
                    } catch {
                      return `user_${Date.now()}`;
                    }
                  })()
                },
                assets: createAssetManagerConfig(uploadToCloudinary, editorRef) as any,
                storage: {
                  type: 'cloud',
                  autosaveChanges: 100,
                  autosaveIntervalMs: 10000
                },
                plugins: [
                  // GrapesJS Studio SDK plugins
                  youtubeAssetProvider.init({
                    // YouTube asset provider options
                  }),
                  layoutSidebarButtons.init({
                    // Layout sidebar buttons options
                  }),
                  canvasGridMode.init({
                    // Canvas grid mode options
                  }),
                  canvasFullSize.init({
                    // Canvas full size options
                  }),
                  canvasEmptyState.init({
                    // Canvas empty state options
                  }),
                  rteProseMirror.init({
                    // TinyMCE rich text editor options
                  }),
                  flexComponent.init({
                    // Flex component options
                  }),
                  accordionComponent.init({
                    // Accordion component options
                  }),
                  iconifyComponent.init({
                    // Iconify component options
                  }),
                  swiperComponent.init({
                    // Swiper component options
                  }),
                  lightGalleryComponent.init({
                    // Light gallery component options
                  }),
                  fsLightboxComponent.init({
                    // FS Lightbox component options
                  }),
                  listPagesComponent.init({
                    // List pages component options
                  }),
                  tableComponent.init({
                    // Table component options
                  }),
                  // Your existing custom plugins
                  ...createEditorPlugins(
                    selectedTemplate,
                    (editor) => loadTemplate(editor, selectedTemplate),
                    setShowContentGenerator,
                    tutorialActive,
                    tutorialSteps,
                    currentStep,
                    addTooltips,
                    tableComponent,
                    iconifyComponent,
                    accordionComponent
                  ).filter(Boolean)
                ],
                // Studio SDK might handle these configurations differently
                // Commenting out for now to avoid compatibility issues
                // layerManager: layerManagerConfig,
                // selectorManager: selectorManagerConfig,
                // deviceManager: deviceManagerConfig,
                // panels: panelsConfig,
                templates: createTemplatesConfig(
                  carpenterTemplate,
                  hvacTemplate,
                  plumberTemplate,
                  electricianTemplate,
                  landscaperTemplate,
                  painterTemplate
                ),
              }}
            />
            <FileUploadManager editor={editorRef.current} />

            {/* AI Floating Action Buttons */}
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                zIndex: 1000,
              }}
            >
              <Tooltip title="Generate Content with AI" placement="left">
                <Fab
                  color="primary"
                  onClick={() => setShowContentGenerator(true)}
                  data-tutorial="ai-generator"
                  sx={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                    },
                  }}
                >
                  <Wand2 size={24} />
                </Fab>
              </Tooltip>
            </Box>
          </Box>
        </div>
      )}

      <Dialog
        open={showContentGenerator}
        onClose={() => setShowContentGenerator(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <ContentGenerator
            onInsertContent={handleInsertContent}
            onClose={() => setShowContentGenerator(false)}
            userTrade={userTrade}
            businessName={businessName}
          />
        </DialogContent>
      </Dialog>

      {tutorialActive && (
        <TutorialOverlay
          steps={tutorialSteps}
          currentStep={currentStep}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onClose={() => setTutorialActive(false)}
        />
      )}

      {/* AI Image Generator Dialog */}

      <ConfirmationModal
        open={saveConfirmationOpen}
        onClose={handleModalClose}
        title="Save Portfolio"
        message="Do you want to save your changes?"
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSaveConfirm}
        severity="info"
        draftId={
          localStorage.getItem("selectedTemplate")
            ? JSON.parse(localStorage.getItem("selectedTemplate")).id
            : ""
        }
      />

      <ConfirmationModal
        open={publishConfirmationOpen}
        onClose={handleModalClose}
        title="Publish Portfolio"
        message="Do you want to publish your portfolio and make it live?"
        confirmText="Publish"
        cancelText="Cancel"
        onConfirm={handlePublishConfirm}
        severity="warning"
      />

      <DeploySuccessModal
        open={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        deployUrl={deployUrl}
      />

      <style jsx global>
        {grapesJsStyles}
      </style>
    </>
  );
}
