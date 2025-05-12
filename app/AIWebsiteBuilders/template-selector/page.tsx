"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";

import StudioEditor from "@grapesjs/studio-sdk/react";

import { tableComponent } from "@grapesjs/studio-sdk-plugins";
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { accordionComponent } from "@grapesjs/studio-sdk-plugins";
import { rteTinyMce } from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { hvacTemplate } from "@/lib/templates/hvac";
import { plumberTemplate } from "@/lib/templates/plumber";
import { electricianTemplate } from "@/lib/templates/electrician";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import { painterTemplate } from "@/lib/templates/painter";

import DeploySuccessModal from "@/app/components/modals/DeploySuccessModal";
import ConfirmationModal from "@/app/components/modals/ConfirmationModal";
import SuccessModal from "@/app/components/modals/SuccessModal";
import { EditorHeader } from "./EditorHeader";
import FileUploadManager from "@/app/components/FileUploadManager";
import LoadingSpinner from "@/app/components/animations/LoadingSpinner";

import { useAppDispatch } from "@/lib/redux/hooks";
import {
  generatePortfolio,
  publishPortfolio,
  updateExistingPortfolio,
} from "@/lib/redux/slices/portfolioSlice";

import { isDefaultTemplate, uploadToCloudinary } from "@/lib/utils";
import { grapesJsStyles, LoadingScreen } from "./helpingComponents";

export default function PortfolioBuilder() {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);

  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [portfolioId, setPortfolioId] = useState("");

  const dispatch = useAppDispatch();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const template = localStorage.getItem("selectedTemplate");
    if (template) {
      setSelectedTemplate(JSON.parse(template));
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

  const getFullHtml = () => {
    if (!editorRef.current) return "";

    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Portfolio</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>`;
  };

  const handleSaveConfirm = async (draftName: string) => {
    setSaveConfirmationOpen(false);
    setIsSaving(true);

    const fullHtml = getFullHtml();
    if (!fullHtml) {
      setIsSaving(false);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        userId: user.id,
        htmlContent: fullHtml,
        name: isDefaultTemplate(selectedTemplate.id)
          ? draftName
          : selectedTemplate.name || "",
      };

      let response;

      if (isDefaultTemplate(selectedTemplate.id))
        response = await dispatch(generatePortfolio(data));
      else
        response = await dispatch(
          updateExistingPortfolio({ id: selectedTemplate.id, data })
        );
      if (response.payload) {
        setPortfolioId(response.payload.id);
      }
      setIsSaving(false);
      localStorage.getItem("published") === "true"
        ? setSuccessModalOpen(false)
        : setSuccessModalOpen(true);
    } catch (err) {
      console.error("Error saving portfolio:", err);
      setIsSaving(false);
    } finally {
      localStorage.removeItem("selectedTemplate");
    }
  };

  const handleDeployNow = async () => {
    setSuccessModalOpen(false);
    setIsSaving(true);

    try {
      const response = await dispatch(publishPortfolio(portfolioId));

      if (response.type !== "portfolio/publish/fulfilled") {
        throw new Error("Deployment failed");
      }

      setDeployUrl(
        `http://localhost:3000/AIWebsiteBuilders/portfolio/${response.payload.user.username}`
      );
      setShowDeployModal(true);
    } catch (error) {
      console.error("Deployment error:", error);
    } finally {
      setIsSaving(false);
    }
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

    addVideoComponent: (editor: any, asset: UploadedAsset) => {
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

  return (
    <>
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
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <EditorHeader
            selectedTemplate={selectedTemplate}
            setSaveConfirmationOpen={setSaveConfirmationOpen}
            isSaving={isSaving}
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
                          el.style.display = val ? "block" : "none";

                          if (val) {
                            el.style.display = "block";
                            el.style.opacity = "1";
                            el.style.visibility = "visible";
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

                  canvasBody.addEventListener("drop", async (event) => {
                    event.preventDefault();

                    const files = Array.from(event.dataTransfer?.files || []);
                    if (files.length === 0) return;

                    const results = await uploadToCloudinary(files);

                    results.forEach((asset) => {
                      if (asset.isImage) {
                        editorHelpers.addImageComponent(editor, asset);
                      } else if (asset.type?.startsWith("video")) {
                        editorHelpers.addVideoComponent?.(editor, asset);
                      } else {
                        editorHelpers.addFileLinkComponent(editor, asset);
                      }
                    });
                  });
                });
              }}
              options={{
                ...{
                  licenseKey: licenseKey,

                  assets: {
                    storageType: "self",
                    upload: true,
                    dropzone: true,
                    autoAdd: true,
                    onUpload: async ({ files }) => {
                      try {
                        const results = await uploadToCloudinary(files);
                        const editor = editorRef.current;

                        if (!editor) return results;

                        editorHelpers.clearSelection(editor);

                        results.forEach((asset) => {
                          if (asset.isImage) {
                            editorHelpers.addImageComponent(editor, asset);
                          } else if (asset.type?.startsWith("video")) {
                            editorHelpers.addVideoComponent?.(editor, asset);
                          } else {
                            editorHelpers.addFileLinkComponent(editor, asset);
                          }
                        });

                        return results;
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
                            (this.model as any).updateVideo();
                          },
                        },
                      });
                    },

                    rteTinyMce.init({
                      enableOnClick: true,
                      loadConfig: ({ component, config }) => {
                        const demoRte = component.get("demorte");
                        if (demoRte === "fixed") {
                          return {
                            toolbar:
                              "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link image media",
                            fixed_toolbar_container_target:
                              document.querySelector(".rteContainer"),
                          };
                        } else if (demoRte === "quickbar") {
                          return {
                            plugins: `${config.plugins} quickbars`,
                            toolbar: false,
                            quickbars_selection_toolbar:
                              "bold italic underline strikethrough | quicklink image",
                          };
                        }
                        return {};
                      },
                    }),
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
          </Box>
        </div>
      )}

      <ConfirmationModal
        open={saveConfirmationOpen}
        onClose={() => setSaveConfirmationOpen(false)}
        title="Save Portfolio"
        message="Do you want to save your changes as a draft?"
        confirmText="Save Draft"
        cancelText="Cancel"
        onConfirm={handleSaveConfirm}
        severity="info"
        draftId={
          localStorage.getItem("selectedTemplate")
            ? JSON.parse(localStorage.getItem("selectedTemplate")).id
            : ""
        }
      />

      <SuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Draft Saved Successfully!"
        message="Your portfolio has been saved as a draft. Would you like to deploy it now?"
        onDeploy={handleDeployNow}
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
