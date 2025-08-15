"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Wand2, Image as ImageIcon } from "lucide-react";

import { Box, Dialog, DialogContent, Fab, Tooltip } from "@mui/material";

// Import link utilities and components
import { createLinkEditor, fixAllLinks, processTemplateLinks } from "./utils/linkUtils";
import { defineLinkComponent, setupLinkEventHandlers } from "./components/LinkComponent";
import { createTextEditor, defineTextComponent, setupTextEventHandlers } from "./components/TextComponent";
import { generateFullHtml } from "./utils/htmlGenerator";
import { fixAllLinksBeforeOperation } from "./utils/linkMaintenance";
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
import { tableComponent } from "@grapesjs/studio-sdk-plugins";
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { accordionComponent } from "@grapesjs/studio-sdk-plugins";
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
      // Fix all links before saving using utility function
      fixAllLinksBeforeOperation(editorRef.current);

      const fullHtml = getFullHtml();
      if (!fullHtml) {
        console.error("Failed to get HTML content");
        toast({
          title: "Error",
          description: "Failed to generate HTML content. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("HTML generated, length:", fullHtml.length);

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

      const data = {
        userId: user.id,
        htmlContent: fullHtml,
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
      // Fix all links before publishing using utility function
      fixAllLinksBeforeOperation(editorRef.current);

      console.log("=== PUBLISH STARTED ===");
      console.log("Portfolio ID:", portfolioId);
      console.log("Selected Template:", selectedTemplate);

      if (!portfolioId) {
        console.error("No portfolio ID found");
        throw new Error("Portfolio must be saved before publishing");
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

                // CRITICAL: Override RTE for buttons before anything else
                // Override RTE enable to prevent it on buttons
                editor.on('rte:enable', (rte, component) => {
                  const el = component.getEl();
                  if (el && (el.tagName === 'BUTTON' || el.closest('button'))) {
                    console.log('🛑 Completely blocking RTE for button element');
                    rte.disable();
                    return false;
                  }
                });

                // Prevent component selection from enabling RTE on buttons
                editor.on('component:selected', (component) => {
                  const el = component.getEl();
                  if (el && (el.tagName === 'BUTTON' || el.closest('button'))) {
                    console.log('🛑 Preventing text editing on button selection');
                    component.set('editable', false);
                  }
                });

                // Use imported link utilities and component definition
                console.log('Registering link component before loading template...');

                // Define our custom link component
                defineLinkComponent(editor, (e, el, model) => createLinkEditor(e, el, model, editorRef));

                // Set up event handlers for link interaction
                setupLinkEventHandlers(editor, (e, el, model) => createLinkEditor(e, el, model, editorRef));

                // Define our custom text component
                defineTextComponent(editor, (e, el, model) => createTextEditor(e, el, model, editorRef));

                // Set up event handlers for text interaction
                setupTextEventHandlers(editor, (e, el, model) => createTextEditor(e, el, model, editorRef));

                // Process all existing links immediately when the editor loads
                // This ensures all links are properly initialized from the start
                setTimeout(() => {
                  fixAllLinks(editor);
                  editor.store(); // Store the changes
                }, 500);

                // Add event listener for storage to ensure links are properly saved
                editor.on('storage:start', () => fixAllLinks(editor));

                // Also process links before publishing
                editor.on('component:selected', (component) => {
                  if (component && component.get('type') === 'link') {
                    console.log('Link selected, ensuring href is set:', component.get('href'));
                    const href = component.get('href') || component.getAttributes().href || '';
                    component.set('href', href);
                    component.setAttributes({ href });
                    component.getEl().setAttribute('href', href);
                  }
                }); loadTemplate(editor, selectedTemplate, processTemplateLinks, createLinkEditor);

                editor.DomComponents.addType("modal", {
                  isComponent: (el) => el.classList?.contains("modal"),
                  model: {
                    defaults: {
                      name: "Modal",
                      traits: [
                        "id",
                        {
                          type: "checkbox",
                          label: "Visible in editor",
                          name: "visibleInEditor",
                          changeProp: true,
                        },
                      ],
                      visibleInEditor: false,
                      script: function () {
                        const modal = this;
                        const closeBtns = modal.querySelectorAll(
                          '[data-bs-dismiss="modal"], .btn-close'
                        );

                        closeBtns.forEach((btn) => {
                          btn.addEventListener("click", () => {
                            modal.classList.remove("show");
                            modal.style.display = "none";
                          });
                        });

                        document
                          .querySelectorAll('[data-bs-toggle="modal"]')
                          .forEach((trigger) => {
                            const target =
                              trigger.getAttribute("data-bs-target");
                            if (target === `#${modal.id}`) {
                              trigger.addEventListener("click", () => {
                                modal.classList.add("show");
                                modal.style.display = "block";
                              });
                            }
                          });
                      },
                    },

                    init() {
                      this.on("change:visibleInEditor", () => {
                        const el = this.view?.el;
                        if (el) {
                          const val = this.get("visibleInEditor");
                          el.classList.toggle("show", val);

                          if (val) {
                            // Make modal visible and properly positioned for editing
                            el.style.display = "block";
                            el.style.opacity = "1";
                            el.style.visibility = "visible";
                            el.style.position = "fixed";
                            el.style.top = "50%";
                            el.style.left = "50%";
                            el.style.transform = "translate(-50%, -50%)";
                            el.style.zIndex = "1050";
                            el.style.minHeight = "300px";
                            el.style.minWidth = "400px";
                            el.style.maxWidth = "90%";
                            el.style.maxHeight = "90%";
                            el.style.border = "2px dashed #3b82f6";
                            el.style.borderRadius = "8px";
                            el.style.backgroundColor = "white";
                            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                            el.style.overflow = "auto";

                            // Add a backdrop
                            const backdrop = document.createElement("div");
                            backdrop.className = "gjs-modal-backdrop";
                            backdrop.style.cssText = `
                              position: fixed;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 100%;
                              background: rgba(0,0,0,0.5);
                              z-index: 1040;
                              pointer-events: none;
                            `;

                            // Remove existing backdrop if any
                            const existingBackdrop = document.querySelector(
                              ".gjs-modal-backdrop"
                            );
                            if (existingBackdrop) {
                              existingBackdrop.remove();
                            }

                            // Add backdrop to canvas
                            const canvas = editor.Canvas.getBody();
                            canvas.appendChild(backdrop);
                          } else {
                            // Reset to normal state
                            el.style.display = "none";
                            el.style.position = "";
                            el.style.top = "";
                            el.style.left = "";
                            el.style.transform = "";
                            el.style.zIndex = "";
                            el.style.minHeight = "";
                            el.style.minWidth = "";
                            el.style.maxWidth = "";
                            el.style.maxHeight = "";
                            el.style.border = "";
                            el.style.borderRadius = "";
                            el.style.backgroundColor = "";
                            el.style.boxShadow = "";
                            el.style.overflow = "";

                            // Remove backdrop
                            const backdrop = document.querySelector(
                              ".gjs-modal-backdrop"
                            );
                            if (backdrop) {
                              backdrop.remove();
                            }
                          }
                        }
                      });
                    },
                  },
                });

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

                  // Add a direct dblclick handler on the canvas to ensure all links are editable
                  canvasBody.addEventListener("dblclick", (event) => {
                    const el = event.target as HTMLElement;
                    const linkEl = el.tagName === 'A' ? el : el.closest('a');

                    if (linkEl && !linkEl.getAttribute('data-file-link')) {
                      console.log('Direct canvas dblclick on link element');
                      event.preventDefault();
                      event.stopPropagation();

                      // Find the component for this element if it exists
                      // But don't rely on it - we'll use direct DOM approach
                      const wrapper = editor.DomComponents.getWrapper();
                      const allLinks = wrapper.find('a');
                      const matchingComponents = allLinks.filter(comp => comp.view && comp.view.el === linkEl);

                      const linkComp = matchingComponents.length > 0 ? matchingComponents[0] : null;

                      // Always use the direct link editor with the DOM element
                      // This ensures it works regardless of component state
                      console.log('Using direct link editor for consistent behavior');
                      createLinkEditor(event, linkEl, linkComp, editor);
                    }
                  });

                  // Add a global click listener for links with direct double-click handling
                  canvasBody.addEventListener("click", (event) => {
                    const el = event.target as HTMLElement;
                    const linkEl = el.tagName === 'A' ? el : el.closest('a');

                    if (linkEl && !linkEl.getAttribute('data-file-link')) {
                      console.log('Link clicked:', {
                        element: linkEl,
                        href: linkEl.getAttribute('href'),
                        hasFileLink: linkEl.getAttribute('data-file-link'),
                      });

                      // Try to find the component model for this element
                      const wrapper = editor.DomComponents.getWrapper();
                      const allLinks = wrapper.find('a');
                      const matchingComponents = allLinks.filter(comp => comp.view && comp.view.el === linkEl);

                      console.log('Component found:', {
                        found: matchingComponents.length > 0,
                        type: matchingComponents.length > 0 ? matchingComponents[0].get('type') : 'none',
                        components: matchingComponents
                      });

                      // Always ensure the element has a dblclick handler
                      // This is the most reliable approach
                      if (!(linkEl as any).__hasFixedDblClick) {
                        (linkEl as any).__hasFixedDblClick = true;
                        linkEl.addEventListener('dblclick', (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Direct dblclick event on link');

                          // Find the component but don't rely on it
                          const currentLinks = wrapper.find('a');
                          const currentMatch = currentLinks.find(comp => comp.view && comp.view.el === linkEl);

                          // Always use direct DOM approach
                          createLinkEditor(e, linkEl, currentMatch || null, editor);
                        });
                      }
                    }
                  });

                  // Set up a component:add event listener to ensure all links are handled correctly
                  editor.on('component:add', (model) => {
                    if (model.get('tagName') === 'a' && !model.getAttributes()['data-file-link']) {
                      console.log('New link component added:', {
                        type: model.get('type'),
                        href: model.getAttributes().href
                      });

                      // Ensure the component is recognized as a link type
                      if (model.get('type') !== 'link') {
                        console.log('Converting component to link type');
                        model.set('type', 'link');
                        // Initialize href property
                        const href = model.getAttributes().href || '';
                        model.set('href', href);

                        // Force a view update
                        setTimeout(() => {
                          const view = model.getView();
                          if (view) {
                            console.log('Re-rendering view for new link');
                            view.render();
                          }
                        }, 10000);
                      }
                    }
                  });

                  // Also watch for component:update to catch any links that might change
                  editor.on('component:update', (model) => {
                    if (model.get('tagName') === 'a' && !model.getAttributes()['data-file-link'] && model.get('type') !== 'link') {
                      console.log('Link component updated but not of type link:', {
                        type: model.get('type'),
                        href: model.getAttributes().href
                      });
                      model.set('type', 'link');
                    }
                  });

                  // Override the default handling of links to ensure our custom component is used
                  const originalAddType = editor.DomComponents.addType;
                  editor.DomComponents.addType = function (type, methods) {
                    // When we detect the 'default' type being added, make sure links are handled by our custom component
                    if (type === 'default') {
                      const origIsComponent = methods.isComponent;
                      if (origIsComponent) {
                        methods.isComponent = function (el) {
                          // If it's an anchor tag but not a file link, don't let the default component claim it
                          if (el.tagName === 'A' && !el.getAttribute('data-file-link')) {
                            return false;
                          }
                          return origIsComponent(el);
                        };
                      }
                    }
                    return originalAddType.call(this, type, methods);
                  };                  // Configure component types for text editing

                  // Link component is now defined in LinkComponent.ts

                  // Configure text elements to use custom text editor (non-editable, double-click to edit)
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].forEach(tagName => {
                    editor.DomComponents.addType(tagName, {
                      isComponent: (el) => el.tagName === tagName.toUpperCase(),
                      model: {
                        defaults: {
                          tagName: tagName,
                          editable: false, // Disable built-in editing
                          droppable: tagName === 'div',
                          traits: ['id', 'title']
                        }
                      },
                      view: {
                        events: {
                          'dblclick': 'onDoubleClick',
                          'click': 'onClick'
                        } as any,
                        
                        onClick(e) {
                          console.log(`🎯 Single click on ${tagName}:`, this.el);
                          // Select the component
                          editor.select(this.model);
                        },
                        
                        onDoubleClick(e) {
                          console.log(`🎯 Double click on ${tagName}, opening custom text editor:`, this.el);
                          
                          // For divs, check if they contain buttons - if so, don't handle the event
                          if (tagName === 'div') {
                            const hasButtons = this.el.querySelector('button');
                            if (hasButtons) {
                              console.log('🚫 Div contains buttons, skipping text editor');
                              return; // Let button handlers take precedence
                            }
                          }
                          
                          e.preventDefault();
                          e.stopPropagation();
                          e.stopImmediatePropagation();
                          
                          // Open our custom text editor
                          createTextEditor(e, this.el, this.model, editor);
                        }
                      }
                    });
                  });

                  // Special configuration for buttons to preserve button type
                  editor.DomComponents.addType("button", {
                    isComponent: (el) => el.tagName === "BUTTON",
                    model: {
                      defaults: {
                        tagName: "button",
                        type: "button", // Ensure it stays as button type
                        editable: false, // Disable built-in editing
                        droppable: false,
                        traits: ['id', 'title', 'type', 'disabled']
                      },
                      init() {
                        // Ensure all child text nodes are non-editable
                        this.set('editable', false);
                        
                        // Recursively disable editing on all child components
                        const disableChildEditing = (component) => {
                          component.set('editable', false);
                          component.components().forEach(disableChildEditing);
                        };
                        disableChildEditing(this);
                        
                        // When the element is available, set DOM attributes
                        this.on('change:status', () => {
                          const el = this.getEl();
                          if (el) {
                            el.setAttribute('contenteditable', 'false');
                            el.style.cursor = 'pointer';
                            // Disable text selection
                            el.style.userSelect = 'none';
                            el.style.webkitUserSelect = 'none';
                            
                            // Remove any existing RTE classes
                            el.classList.remove('gjs-text-editable');
                          }
                        });
                      }
                    },
                    view: {
                      events: {
                        'dblclick': 'onDoubleClick',
                        'click': 'onClick',
                        'dblclick *': 'onDoubleClickChild', // Capture double-clicks on any child element
                        'click *': 'onClickChild' // Capture clicks on any child element
                      } as any,
                      
                      onClick(e) {
                        console.log(`🎯 Single click on button:`, this.el);
                        e.stopPropagation(); // Prevent event from bubbling to parent
                        editor.select(this.model);
                      },
                      
                      onClickChild(e) {
                        console.log(`🎯 Single click on button child:`, e.target);
                        e.stopPropagation();
                        e.preventDefault();
                        // Redirect to parent button click
                        editor.select(this.model);
                      },
                      
                      onDoubleClickChild(e) {
                        console.log(`🎯 Double click on button child:`, e.target);
                        e.stopPropagation();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        
                        // Redirect to parent button double-click
                        this.onDoubleClick(e);
                        return false;
                      },
                      
                      onDoubleClick(e) {
                        console.log(`🎯 Double click on button, opening custom text editor:`, this.el);
                        console.log('🔍 Button element details:', {
                          tagName: this.el.tagName,
                          id: this.el.id,
                          className: this.el.className,
                          textContent: this.el.textContent,
                          modelType: this.model.get('type'),
                          modelTagName: this.model.get('tagName')
                        });
                        
                        // Stop all event propagation immediately
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        
                        // Ensure we prevent any default editing behavior
                        this.model.set('editable', false);
                        
                        // Open our custom text editor with this specific button
                        createTextEditor(e, this.el, this.model, editor);
                        
                        // Return false to completely stop the event
                        return false;
                      }
                    }
                  });

                  // Additional safety: Prevent any built-in RTE from activating on buttons
                  editor.on('component:selected', (component) => {
                    const el = component.getEl();
                    if (el && (el.tagName === 'BUTTON' || el.closest('button'))) {
                      // Disable any text editing capabilities
                      component.set('editable', false);
                      console.log('🚫 Disabled editing for button component');
                    }
                  });

                  // Prevent RTE activation on button elements
                  editor.on('rte:enable', (rte, component) => {
                    const el = component.getEl();
                    if (el && (el.tagName === 'BUTTON' || el.closest('button'))) {
                      console.log('🚫 Preventing RTE on button element');
                      rte.disable();
                      return false;
                    }
                  });

                  // More aggressive RTE prevention - intercept before GrapesJS processes
                  editor.on('component:mount', (component) => {
                    const el = component.getEl();
                    if (el && el.tagName === 'BUTTON') {
                      // Add DOM-level event listeners to prevent RTE
                      const preventRTE = (e) => {
                        console.log('🛑 DOM-level prevention of RTE on button');
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        
                        // If it's a double-click, trigger our custom editor
                        if (e.type === 'dblclick') {
                          setTimeout(() => {
                            createTextEditor(e, el, component, editor);
                          }, 0);
                        }
                        return false;
                      };
                      
                      // Add listeners for both the button and any text inside
                      el.addEventListener('dblclick', preventRTE, true); // Use capture phase
                      el.addEventListener('click', preventRTE, true);
                      
                      // Also add to all text nodes inside
                      const addListenersToTextNodes = (element: HTMLElement) => {
                        Array.from(element.childNodes).forEach((childNode: ChildNode) => {
                          const node = childNode as ChildNode;
                          if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
                            node.parentElement.addEventListener('dblclick', preventRTE, true);
                            node.parentElement.addEventListener('click', preventRTE, true);
                          } else if (node.nodeType === Node.ELEMENT_NODE) {
                            addListenersToTextNodes(node as HTMLElement);
                          }
                        });
                      };
                      addListenersToTextNodes(el);
                    }
                  });
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
                ...{
                  licenseKey: licenseKey,

                  // Disable built-in Rich Text Editor - we use custom text editor
                  richTextEditor: false,

                  assets: createAssetManagerConfig(uploadToCloudinary, editorRef) as any,

                  plugins: createEditorPlugins(
                    selectedTemplate,
                    (editor) => loadTemplate(editor, selectedTemplate, processTemplateLinks, createLinkEditor),
                    setShowContentGenerator,
                    tutorialActive,
                    tutorialSteps,
                    currentStep,
                    addTooltips,
                    tableComponent,
                    iconifyComponent,
                    accordionComponent
                  ).filter(Boolean),
                  layerManager: layerManagerConfig,
                  selectorManager: selectorManagerConfig,
                  deviceManager: deviceManagerConfig,
                  panels: panelsConfig,
                  templates: createTemplatesConfig(
                    carpenterTemplate,
                    hvacTemplate,
                    plumberTemplate,
                    electricianTemplate,
                    landscaperTemplate,
                    painterTemplate
                  ),
                },
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
