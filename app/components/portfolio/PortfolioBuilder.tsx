"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Wand2, Image as ImageIcon } from "lucide-react";

import { Box, Dialog, DialogContent, Fab, Tooltip } from "@mui/material";

import { generateFullHtml, generateAllPagesHtml, getProjectData } from "./utils/htmlGenerator";
import { editorHelpers } from "./utils/editorHelpers";
import { builderSchema } from "./utils/schemas";
import {
  createAssetManagerConfig
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
  useEffect(() => {
    return () => {
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
      const firstPageHtml = projectData.pages && projectData.pages.length > 0 
        ? projectData.pages[0].html 
        : generateFullHtml(editorRef.current);
      
      // Safe guard for null selectedTemplate (blank canvas)
      const selectedId = selectedTemplate?.id;
      const isDefault = !selectedTemplate || isDefaultTemplate(selectedId);

      const data = {
        userId: user.id,
        htmlContent: firstPageHtml,
        projectData: JSON.stringify(projectData.projectData),
        pagesData: JSON.stringify(projectData.pages),
        name: isDefault ? draftName : selectedTemplate?.name || "",
      };

      console.log("Save data prepared:", data);

      let response;

      if (isDefault) {
        console.log("=== CREATING NEW PORTFOLIO ===");
        response = await dispatch(generatePortfolio(data));
      } else {
        console.log("=== UPDATING EXISTING PORTFOLIO ===");
        console.log("Portfolio ID:", selectedId);
        response = await dispatch(updateExistingPortfolio({ id: selectedId, data }));
      }

      console.log("Redux response:", response);
      console.log("Response type:", response.type);
      console.log("Response meta:", response.meta);

      // Check for both fulfilled and rejected cases
      if (generatePortfolio.fulfilled.match(response) || updateExistingPortfolio.fulfilled.match(response)) {
        console.log("=== SAVE SUCCESSFUL ===");
        console.log("Response payload:", response.payload);

        setPortfolioId(response.payload.id);
        
        const updatedTemplate = {
          ...(selectedTemplate || {}),
          id: response.payload.id,
          name: data.name,
          // prefer server returned fields, fallback to the current editor snapshot
          htmlContent: response.payload.htmlContent || firstPageHtml,
          projectData: response.payload.projectData || data.projectData,
          pagesData: response.payload.pagesData || data.pagesData,
          isPublished: response.payload.published || false,
          deployUrl: response.payload.deployUrl || (selectedTemplate && selectedTemplate.deployUrl) || "",
        };
        console.log("Updated template for localStorage:", updatedTemplate);

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

                // Load the selected template if present; otherwise clear editor to avoid default fallback
                if (selectedTemplate) {
                  loadTemplate(editor, selectedTemplate);
                } else {
                  try {
                    // Clear components, styles and assets so the canvas is empty
                    editor.DomComponents && editor.DomComponents.clear && editor.DomComponents.clear();
                    editor.CssComposer && editor.CssComposer.clear && editor.CssComposer.clear();
                    editor.AssetManager && editor.AssetManager.clear && editor.AssetManager.clear();
                    // No storage clear - avoid calling non-existent API
                  } catch (e) {
                    console.warn('Failed to clear editor on empty template', e);
                  }
                }

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
                licenseKey: licenseKey, 
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
                    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
                    
                    // Search parameters for YouTube videos
                    searchParams: ({ searchValue }) => {
                      console.log('🔍 YouTube search triggered with:', searchValue);
                      return {
                        q: searchValue || 'professional portfolio construction trades',
                        maxResults: 20,
                        order: 'relevance',
                        safeSearch: 'strict',
                        type: ['video'],
                        videoEmbeddable: 'true',
                        videoDuration: 'medium' // 4-20 minutes
                      };
                    },
                    
                    // Thumbnail quality preference
                    thumbnailQuality: 'high',
                    
                    // Keep the YouTube search button in video component properties
                    skipVideoComponent: false
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
                    // Enhanced table block configuration with editable cells
                    block: { 
                      category: 'Basic', 
                      label: '📊 Table',
                      media: `<svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                      </svg>`,
                      content: `
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                          <thead>
                            <tr style="background-color: #f5f5f5;">
                              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;" data-gjs-editable='true' data-gjs-type='text'>Header 1</th>
                              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;" data-gjs-editable='true' data-gjs-type='text'>Header 2</th>
                              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;" data-gjs-editable='true' data-gjs-type='text'>Header 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style="border: 1px solid #ddd; padding: 12px;" data-gjs-editable='true' data-gjs-type='text'>Data 1</td>
                              <td style="border: 1px solid #ddd; padding: 12px;" data-gjs-editable='true' data-gjs-type='text'>Data 2</td>
                              <td style="border: 1px solid #ddd; padding: 12px;" data-gjs-editable='true' data-gjs-type='text'>Data 3</td>
                            </tr>
                            <tr>
                              <td style="border: 1px solid #ddd; padding: 12px;" data-gjs-editable='true' data-gjs-type='text'>Data 4</td>
                              <td style="border: 1px solid #ddd; padding: 12px;" data-gjs-editable='true' data-gjs-type='text'>Data 5</td>
                              <td style="border: 1px solid #ddd; padding: 12px;" data-gjs-editable='true' data-gjs-type='text'>Data 6</td>
                            </tr>
                          </tbody>
                        </table>
                      `
                    },
                    
                    // Custom settings layout - opens in a nice dialog
                    openSettings: ({ editor, layoutProps }) => {
                      console.log('🔧 Opening table settings in dialog');
                      editor.runCommand('studio:layoutToggle', {
                        ...layoutProps,
                        header: false,
                        style: { 
                          marginLeft: -20, 
                          marginRight: -20,
                          maxWidth: '500px',
                          maxHeight: '600px'
                        },
                        placer: { 
                          type: 'dialog', 
                          title: layoutProps.header?.label || 'Table Settings',
                          modal: true
                        },
                      });
                    }
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
                  ).filter(Boolean),
                  // Add Global Styles panel on editor ready
                  editor =>
                    editor.onReady(() => {
                      console.log('🎯 Editor ready - Setting up Studio SDK features');
                      
                      // Check if YouTube provider is available
                      const assetManager = editor.AssetManager;
                      console.log('📦 Asset Manager:', assetManager);
                      console.log('🎥 Available asset providers:', Object.keys(assetManager.getAll()));
                      
                      // Store editor reference globally for testing
                      (window as any).editor = editor;
                      console.log('🔧 Editor stored globally for testing');
                      
                      // Show the global styles panel by default
                      editor.runCommand('studio:layoutToggle', {
                        id: 'gs',
                        layout: 'panelGlobalStyles',
                        header: { label: 'Global Styles' },
                        placer: { type: 'absolute', position: 'right' }
                      });
                    })
                ],
                // Global Styles configuration
                globalStyles: {
                  default: [
                    // Typography - Headings
                    {
                      id: 'h1Color',
                      property: 'color',
                      field: 'color',
                      selector: 'h1',
                      label: 'H1 Color',
                      defaultValue: '#1a1a1a',
                      category: { id: 'typography', label: 'Typography', open: true }
                    },
                    {
                      id: 'h1Size',
                      property: 'font-size',
                      field: { type: 'number', min: 1, max: 6, step: 0.1, units: ['rem', 'px'] },
                      selector: 'h1',
                      label: 'H1 Size',
                      defaultValue: '2.5rem',
                      category: { id: 'typography' }
                    },
                    {
                      id: 'h2Color',
                      property: 'color',
                      field: 'color',
                      selector: 'h2',
                      label: 'H2 Color',
                      defaultValue: '#1a1a1a',
                      category: { id: 'typography' }
                    },
                    {
                      id: 'h2Size',
                      property: 'font-size',
                      field: { type: 'number', min: 1, max: 5, step: 0.1, units: ['rem', 'px'] },
                      selector: 'h2',
                      label: 'H2 Size',
                      defaultValue: '2rem',
                      category: { id: 'typography' }
                    },
                    {
                      id: 'h3Color',
                      property: 'color',
                      field: 'color',
                      selector: 'h3',
                      label: 'H3 Color',
                      defaultValue: '#1a1a1a',
                      category: { id: 'typography' }
                    },
                    {
                      id: 'h3Size',
                      property: 'font-size',
                      field: { type: 'number', min: 1, max: 4, step: 0.1, units: ['rem', 'px'] },
                      selector: 'h3',
                      label: 'H3 Size',
                      defaultValue: '1.75rem',
                      category: { id: 'typography' }
                    },
                    
                    // Typography - Body Text
                    {
                      id: 'bodyColor',
                      property: 'color',
                      field: 'color',
                      selector: 'body, p',
                      label: 'Body Text Color',
                      defaultValue: '#333333',
                      category: { id: 'typography' }
                    },
                    {
                      id: 'bodySize',
                      property: 'font-size',
                      field: { type: 'number', min: 0.8, max: 2, step: 0.1, units: ['rem', 'px'] },
                      selector: 'body, p',
                      label: 'Body Text Size',
                      defaultValue: '1rem',
                      category: { id: 'typography' }
                    },
                    {
                      id: 'bodyLineHeight',
                      property: 'line-height',
                      field: { type: 'number', min: 1, max: 3, step: 0.1 },
                      selector: 'body, p',
                      label: 'Body Line Height',
                      defaultValue: '1.6',
                      category: { id: 'typography' }
                    },
                    
                    // Colors - Brand
                    {
                      id: 'primaryColor',
                      property: '--primary-color',
                      field: 'color',
                      selector: ':root',
                      label: 'Primary Brand Color',
                      defaultValue: '#3b82f6',
                      category: { id: 'colors', label: 'Brand Colors', open: false }
                    },
                    {
                      id: 'secondaryColor',
                      property: '--secondary-color',
                      field: 'color',
                      selector: ':root',
                      label: 'Secondary Brand Color',
                      defaultValue: '#64748b',
                      category: { id: 'colors' }
                    },
                    {
                      id: 'accentColor',
                      property: '--accent-color',
                      field: 'color',
                      selector: ':root',
                      label: 'Accent Color',
                      defaultValue: '#f59e0b',
                      category: { id: 'colors' }
                    },
                    
                    // Buttons
                    {
                      id: 'btnPrimaryBg',
                      property: 'background-color',
                      field: 'color',
                      selector: 'button, .btn, input[type="submit"]',
                      label: 'Button Background',
                      defaultValue: '#3b82f6',
                      category: { id: 'buttons', label: 'Buttons', open: false }
                    },
                    {
                      id: 'btnPrimaryColor',
                      property: 'color',
                      field: 'color',
                      selector: 'button, .btn, input[type="submit"]',
                      label: 'Button Text Color',
                      defaultValue: '#ffffff',
                      category: { id: 'buttons' }
                    },
                    {
                      id: 'btnRadius',
                      property: 'border-radius',
                      field: {
                        type: 'select',
                        options: [
                          { id: '0', label: 'None' },
                          { id: '4px', label: 'Small' },
                          { id: '8px', label: 'Medium' },
                          { id: '16px', label: 'Large' },
                          { id: '50px', label: 'Pill' }
                        ]
                      },
                      selector: 'button, .btn, input[type="submit"]',
                      label: 'Button Border Radius',
                      defaultValue: '8px',
                      category: { id: 'buttons' }
                    },
                    {
                      id: 'btnPadding',
                      property: 'padding',
                      field: { type: 'text' },
                      selector: 'button, .btn, input[type="submit"]',
                      label: 'Button Padding',
                      defaultValue: '12px 24px',
                      category: { id: 'buttons' }
                    },
                    
                    // Links
                    {
                      id: 'linkColor',
                      property: 'color',
                      field: 'color',
                      selector: 'a',
                      label: 'Link Color',
                      defaultValue: '#3b82f6',
                      category: { id: 'links', label: 'Links', open: false }
                    },
                    {
                      id: 'linkHoverColor',
                      property: 'color',
                      field: 'color',
                      selector: 'a:hover',
                      label: 'Link Hover Color',
                      defaultValue: '#1d4ed8',
                      category: { id: 'links' }
                    },
                    {
                      id: 'linkDecoration',
                      property: 'text-decoration',
                      field: {
                        type: 'select',
                        options: [
                          { id: 'none', label: 'None' },
                          { id: 'underline', label: 'Underline' },
                          { id: 'overline', label: 'Overline' },
                          { id: 'line-through', label: 'Strike Through' }
                        ]
                      },
                      selector: 'a',
                      label: 'Link Decoration',
                      defaultValue: 'underline',
                      category: { id: 'links' }
                    },
                    
                    // Layout
                    {
                      id: 'containerMaxWidth',
                      property: 'max-width',
                      field: { type: 'number', min: 800, max: 1400, step: 50, units: ['px'] },
                      selector: '.container, .main-content',
                      label: 'Container Max Width',
                      defaultValue: '1200px',
                      category: { id: 'layout', label: 'Layout', open: false }
                    },
                    {
                      id: 'sectionPadding',
                      property: 'padding',
                      field: { type: 'text' },
                      selector: 'section, .section',
                      label: 'Section Padding',
                      defaultValue: '60px 0',
                      category: { id: 'layout' }
                    }
                  ]
                },
                templates: selectedTemplate
                  ? createTemplatesConfig(
                      carpenterTemplate,
                      hvacTemplate,
                      plumberTemplate,
                      electricianTemplate,
                      landscaperTemplate,
                      painterTemplate
                    )
                  : undefined,
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
        defaultDraftName={
          selectedTemplate?.name || `Untitled ${businessName || "project"}`
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
