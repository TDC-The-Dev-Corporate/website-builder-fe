"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Wand2, Image as ImageIcon } from "lucide-react";

import { Box, Dialog, DialogContent, Fab, Tooltip } from "@mui/material";

import StudioEditor from "@grapesjs/studio-sdk/react";
import { tableComponent } from "@grapesjs/studio-sdk-plugins";
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { accordionComponent } from "@grapesjs/studio-sdk-plugins";
// import { rteTinyMce } from "@grapesjs/studio-sdk-plugins";
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

  const loadSelectedTemplate = (editor) => {
    if (selectedTemplate) {
      editor.DomComponents.clear();
      editor.CssComposer.clear();
      editor.setComponents(selectedTemplate.data.pages[0].component);
    }
  };

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

  const getFullHtml = () => {
    if (!editorRef.current) return "";
    const editor = editorRef.current;
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${editor.getCss()}</style>
          <script>
            // Event Delegation System
            document.addEventListener('click', function(e) {
              const btn = e.target.closest('[data-action]');
              if (!btn) return;
              
              const action = btn.dataset.action;
              const modalId = btn.dataset.modalId;
              
              if (action === 'open-drawer') {
                document.getElementById('drawer').classList.add('active');
                document.getElementById('overlay').classList.add('active');
              }
              
              if (action === 'close-drawer') {
                document.getElementById('drawer').classList.remove('active');
                document.getElementById('overlay').classList.remove('active');
              }
              
              if (action === 'open-modal' && modalId) {
                document.getElementById(modalId).classList.add('active');
                document.getElementById('overlay').classList.add('active');
              }
              
              if (action === 'close-modal' && modalId) {
                document.getElementById(modalId).classList.remove('active');
                document.getElementById('overlay').classList.remove('active');
              }
            });
            
            // Close modals and drawers when clicking on overlay
            document.getElementById('overlay')?.addEventListener('click', function() {
              document.getElementById('drawer')?.classList.remove('active');
              
              // Close all modals
              const modals = document.querySelectorAll('.modal');
              modals.forEach(modal => {
                modal.classList.remove('active');
              });
              
              this.classList.remove('active');
            });
            
            // Prevent clicks inside modals from closing them
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
              modal.addEventListener('click', function(e) {
                e.stopPropagation();
              });
            });
            
            // Handle form submissions
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submission is simulated in this template. In a real website, this would submit data to a server.');
                this.reset();
              });
            });
          </script>
        </head>
        <body>
          ${editor.getHtml()}
        </body>
        </html>
      `;
  };

  const handleSaveConfirm = async (draftName) => {
    console.log("=== SAVE STARTED ===");
    console.log("Current button states - isSaving:", isSaving, "isPublishing:", isPublishing);
    console.log("Selected template:", selectedTemplate);
    console.log("Portfolio ID:", portfolioId);
    console.log("Draft name:", draftName);
    console.log("Is published:", isPublished);
    console.log("Is default template:", isDefaultTemplate(selectedTemplate.id));
    
    setSaveConfirmationOpen(false);
    setIsSaving(true);

    try {
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

    const editor = editorRef.current;
    const selected = editor.getSelected();

    if (selected) {
      if (type === "heading") {
        selected.components(`<h2>${content}</h2>`);
      } else if (type === "list") {
        selected.components(content);
      } else {
        selected.components(`<div>${content}</div>`);
      }
    } else {
      // Add to canvas if nothing is selected
      editor.addComponents(`<div>${content}</div>`);
    }

    editor.trigger("change:canvasOffset");
  };

  const editorHelpers = {
    clearSelection: (editor) => {
      const selected = editor.getSelected();
      if (selected) {
        selected.remove();
      }
    },

    addImageComponent: (editor, asset) => {
      editor.addComponents(
        `<img src="${asset.src}" alt="${asset.name}" style="max-width:100%;height:auto;"/>`
      );
    },

    addVideoComponent: (editor, asset) => {
      editor.addComponents({
        type: "video",
        src: asset.src,
        style: "max-width: 100%; height: auto;",
        attributes: {
          controls: true,
        },
      });
    },

    addFileLinkComponent: (editor, asset) => {
      editor.addComponents(`
        <a href="${asset.src}" 
           download="${asset.name}" 
           data-file-link="true"
           style="display: block; padding: 12px 16px; margin: 10px 0; ">
          ${asset.name}
        </a>
      `);
    },
  };

  const builderSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TradesBuilder Website Builder",
    applicationCategory: "WebsiteBuilder",
    description: "Create and customize your trade business website",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Drag-and-drop interface",
      "Professional templates",
      "Mobile responsive",
      "Custom styling",
      "Image and video upload",
      "Real-time preview",
      "AI content generation",
      "AI image generation",
    ],
  };
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
                loadSelectedTemplate(editor);

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

                  // Configure component types for text editing
                  editor.DomComponents.addType("button", {
                    isComponent: (el) => el.tagName === "BUTTON",
                    model: {
                      defaults: {
                        tagName: "button",
                        editable: true,
                        droppable: false,
                        traits: [
                          "id",
                          "title",
                          { type: "text", name: "text", label: "Button Text" }
                        ],
                      },
                    },
                  });

                  editor.DomComponents.addType("link", {
                    isComponent: (el) => el.tagName === "A",
                    model: {
                      defaults: {
                        tagName: "a",
                        editable: true,
                        traits: [
                          "id",
                          "title",
                          { type: "text", name: "text", label: "Link Text" },
                          { type: "text", name: "href", label: "URL" },
                          { type: "text", name: "target", label: "Target" }
                        ],
                      },
                    },
                  });

                  // Configure text elements to be editable
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].forEach(tagName => {
                    editor.DomComponents.addType(tagName, {
                      isComponent: (el) => el.tagName === tagName.toUpperCase(),
                      model: {
                        defaults: {
                          tagName: tagName,
                          editable: true,
                          droppable: tagName === 'div',
                          traits: ['id', 'title']
                        }
                      }
                    });
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

                  // Configure default Rich Text Editor
                  richTextEditor: {
                    actions: [
                      'bold', 'italic', 'underline', 'strikethrough',
                      {
                        name: 'createLink',
                        icon: '<i class="fa fa-link"></i>',
                        attributes: { title: 'Add/Edit Link' },
                        result: (rte) => {
                          const selection = rte.selection();
                          
                          // Check if we're already in a link
                          const range = rte.doc.getSelection().getRangeAt(0);
                          let linkElement = null;
                          let parentNode = range.startContainer;
                          
                          // Find if we're inside a link
                          while (parentNode && parentNode.nodeType !== 9) { // 9 = DOCUMENT_NODE
                            if (parentNode.tagName === 'A') {
                              linkElement = parentNode;
                              break;
                            }
                            parentNode = parentNode.parentNode;
                          }
                          
                          let currentUrl = '';
                          if (linkElement) {
                            currentUrl = linkElement.getAttribute('href') || '';
                          }
                          
                          const url = prompt('Enter the URL:', currentUrl || 'https://');
                          
                          if (url !== null && url.trim()) {
                            if (linkElement) {
                              // Edit existing link
                              linkElement.setAttribute('href', url);
                            } else {
                              // Create new link
                              const selectedText = selection.toString();
                              if (selectedText && selectedText.trim()) {
                                rte.insertHTML(`<a href="${url}">${selectedText}</a>`);
                              } else {
                                rte.insertHTML(`<a href="${url}">${url}</a>`);
                              }
                            }
                          }
                        }
                      },
                      'fontSize', 'textColor', 'bgColor',
                      'alignLeft', 'alignCenter', 'alignRight'
                    ],
                    // Enable RTE globally
                    enable: true,
                    focusOnActivation: true,
                    selectOnActivation: true
                  },

                  assets: {
                    storageType: "self",
                    upload: true,
                    dropzone: false,
                    openAssetsOnDrop: false,
                    autoAdd: false,
                    onUpload: async ({ files }) => {
                      try {
                        const results = await uploadToCloudinary(files);
                        const editor = editorRef.current;

                        if (!editor) return results;

                        // ✅ Add to asset manager manually so they show up in modal
                        results.forEach((asset) => {
                          editor.AssetManager.add({
                            src: asset.src,
                            name: asset.name,
                            type: asset.isImage ? "image" : asset.type,
                          });
                        });

                        // Optionally, select the uploaded asset and insert it
                        // OR let the user select it manually via the modal

                        return results; // GrapesJS will now show these in the modal
                      } catch (error) {
                        console.error("Upload error:", error);
                        editorRef.current?.showNotification(
                          "Upload failed",
                          "error"
                        );
                        return [];
                      }
                    },
                  } as any,

                  plugins: [
                    (editor) => {
                      editor.DomComponents.addType("file-link", {
                        isComponent: (el) =>
                          el.tagName === "A" &&
                          el.getAttribute("data-file-link") === "true",
                        model: {
                          defaults: {
                            tagName: "a",
                            attributes: {
                              "data-file-link": "true",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              download: "",
                              style:
                                "display: block; padding: 12px 16px; margin: 10px 0; background-color: #f8f9fa; border-radius: 6px; color: #3b82f6; text-decoration: none; border-left: 4px solid #3b82f6;",
                            },
                            traits: [
                              {
                                type: "text",
                                name: "href",
                                label: "File URL",
                                changeProp: true,
                              },
                              {
                                type: "text",
                                name: "download",
                                label: "File name",
                                changeProp: true,
                              },
                              {
                                type: "text",
                                name: "style",
                                label: "Style",
                                changeProp: true,
                              },
                            ],
                          },
                        },
                        view: {
                          events: {
                            dblclick: "onActive",
                          } as any,
                        },
                      });
                    },
                    (editor) => {
                      editor.DomComponents.addType("video", {
                        isComponent: (el) => el.tagName === "VIDEO",
                        model: {
                          defaults: {
                            tagName: "video",
                            attributes: {
                              controls: true,
                              style: "max-width: 100%;",
                              preload: "auto",
                            },
                            traits: [
                              {
                                type: "text",
                                name: "src",
                                label: "Video URL",
                                placeholder:
                                  "https://example.com/video.mp4 or YouTube/Vimeo URL",
                                changeProp: true,
                              },
                              {
                                type: "select",
                                name: "provider",
                                label: "Video Provider",
                                options: [
                                  {
                                    id: "html5",
                                    value: "html5",
                                    name: "HTML5 Video",
                                  },
                                  {
                                    id: "youtube",
                                    value: "youtube",
                                    name: "YouTube",
                                  },
                                  {
                                    id: "vimeo",
                                    value: "vimeo",
                                    name: "Vimeo",
                                  },
                                ],
                                changeProp: true,
                              },
                              {
                                type: "text",
                                name: "videoId",
                                label: "Video ID",
                                placeholder: "Only for YouTube/Vimeo",
                              },
                            ],
                          },
                        },

                        view: {
                          events: {
                            dblclick: "onActive",
                          } as any,

                          onRender({ el }) {
                            const video = el as HTMLVideoElement;
                            if (!video.poster) {
                              video.poster =
                                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ddd"/><polygon points="40,30 70,50 40,70" fill="%23fff"/></svg>';
                            }
                          },

                          onTraitsChange() {
                            this.model.updateVideo();
                          },
                        },
                      });
                    },
                    // rteTinyMce.init({
                    //   enableOnClick: true,
                    //   loadConfig: () => ({
                    //     toolbar_mode: "sliding",
                    //     toolbar: [
                    //       "bold italic underline strikethrough | fontfamily fontsize | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist",
                    //       "forecolor backcolor | link image table | code",
                    //     ],
                    //     plugins: "link image lists advlist code table",
                    //     font_size_formats:
                    //       "8px 10px 12px 14px 16px 18px 24px 36px",
                    //   }),
                    // }),
                    tableComponent.init({
                      block: { category: "Extra", label: "Table" },
                    }),
                    iconifyComponent.init({
                      block: { category: "Icons", label: "Icon" },
                    }),
                    accordionComponent.init({
                      block: { category: "Components", label: "Accordion" },
                      blockGroup: { category: "Components" },
                    }),
                    (editor) => {
                      if (selectedTemplate) {
                        editor.runCommand("studio:layoutRemove", {
                          id: "template-selector",
                        });
                      }

                      editor.onReady(() => {
                        if (selectedTemplate) {
                          loadSelectedTemplate(editor);
                        } else {
                          editor.runCommand("studio:layoutToggle", {
                            id: "template-selector",
                            header: false,
                            placer: {
                              type: "dialog",
                              title: "Choose a Template",
                              size: "l",
                            },
                            layout: {
                              type: "panelTemplates",
                              content: { itemsPerRow: 3 },
                              onSelect: ({ loadTemplate, template }) => {
                                loadTemplate(template);
                                editor.runCommand("studio:layoutRemove", {
                                  id: "template-selector",
                                });
                              },
                            },
                          });
                        }

                        editor.on("component:selected", () => {
                          if (tutorialActive) {
                            const current = tutorialSteps[currentStep];
                            const element = document.querySelector(
                              current.selector
                            );
                            if (element) {
                              element.classList.add("tutorial-highlight");
                            }
                          }
                        });

                        editor.BlockManager.add("service-card", {
                          label: "Service Card",
                          content: `<div class="service-card" style="padding: 20px; border-radius: 8px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                          <h3 style="margin-top: 0;">Service Name</h3>
                          <p>Service description goes here.</p>
                          <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Learn More</button>
                        </div>`,
                          category: "Trade Components",
                        });

                        editor.BlockManager.add("testimonial", {
                          label: "Testimonial",
                          content: `<div class="testimonial" style="padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3b82f6;">
                          <p style="font-style: italic;">"Great work! Highly recommend this tradesman."</p>
                          <p style="font-weight: bold;">- Happy Customer</p>
                        </div>`,
                          category: "Trade Components",
                        });

                        // Add AI Content Generation button to toolbar
                        editor.Panels.addButton("options", {
                          id: "generate-content",
                          className: "fa fa-magic",
                          command: "show-content-generator",
                          attributes: { title: "Generate Content with AI" },
                        });

                        editor.Commands.add("show-content-generator", {
                          run: () => setShowContentGenerator(true),
                        });

                        // Add AI Image Generation button to toolbar
                        editor.Panels.addButton("options", {
                          id: "generate-image",
                          className: "fa fa-image",
                          command: "show-image-generator",
                          attributes: { title: "Generate Images with AI" },
                        });
                      });

                      editor.onReady(() => {
                        addTooltips(editor.getComponents());
                      });
                    },
                  ],
                  layerManager: {
                    appendTo: ".layers-container",
                  },
                  selectorManager: {
                    appendTo: ".styles-container",
                  },
                  deviceManager: {
                    devices: [
                      {
                        id: "desktop",
                        name: "Desktop",
                        width: "",
                      },
                      {
                        id: "tablet",
                        name: "Tablet",
                        width: "768px",
                        widthMedia: "992px",
                      },
                      {
                        id: "mobile",
                        name: "Mobile",
                        width: "320px",
                        widthMedia: "576px",
                      },
                    ],
                  },
                  panels: {
                    defaults: [
                      {
                        id: "layers",
                        el: ".panel__right",
                        buttons: [
                          {
                            id: "layer-visibility",
                            className: "fa fa-eye",
                            command: "sw-visibility",
                            attributes: { title: "Toggle visibility" },
                          },
                        ],
                      },
                      {
                        id: "panel-switcher",
                        el: ".panel__switcher",
                        buttons: [
                          {
                            id: "show-layers",
                            className: "fa fa-bars",
                            command: "show-layers",
                            attributes: { title: "Layers" },
                          },
                          {
                            id: "show-style",
                            className: "fa fa-paint-brush",
                            command: "show-styles",
                            attributes: { title: "Styles" },
                          },
                          {
                            id: "show-traits",
                            className: "fa fa-cog",
                            command: "show-traits",
                            attributes: { title: "Settings" },
                          },
                        ],
                      },
                    ],
                  },
                  templates: {
                    onLoad: async () => [
                      carpenterTemplate,
                      hvacTemplate,
                      plumberTemplate,
                      electricianTemplate,
                      landscaperTemplate,
                      painterTemplate,
                    ],
                  },
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
