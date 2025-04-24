"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Save } from "lucide-react";

import { Box, Button } from "@mui/material";

import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import { tableComponent } from "@grapesjs/studio-sdk-plugins";
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { accordionComponent } from "@grapesjs/studio-sdk-plugins";
import { rteTinyMce } from "@grapesjs/studio-sdk-plugins";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { hvacTemplate } from "@/lib/templates/hvac";
import { plumberTemplate } from "@/lib/templates/plumber";
import { electricianTemplate } from "@/lib/templates/electrician";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import DeploySuccessModal from "@/app/components/modals/DeploySuccessModal";
import { painterTemplate } from "@/lib/templates/painter";
import ConfirmationModal from "@/app/components/modals/ConfirmationModal";
import SuccessModal from "@/app/components/modals/SuccessModal";

import { useAppDispatch } from "@/lib/redux/hooks";
import {
  generatePortfolio,
  publishPortfolio,
} from "@/lib/redux/slices/portfolioSlice";

import { uploadToCloudinary } from "@/lib/utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);

  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [portfolioId, setPortfolioId] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const template = localStorage.getItem("selectedTemplate");
    if (template) {
      setSelectedTemplate(JSON.parse(template));
      localStorage.removeItem("selectedTemplate");
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
        name: draftName,
      };

      const response = await dispatch(generatePortfolio(data));
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

  return (
    <>
      <Head>
        <title>Portfolio Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isLoading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading Templates...</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              boxShadow: 1,
              zIndex: 1000,
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={() => setSaveConfirmationOpen(true)}
              disabled={isSaving}
              sx={{
                background: isSaving
                  ? "rgba(52, 199, 89, 0.7)"
                  : "linear-gradient(135deg, #34C759 0%, #30B350 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #30B350 0%, #2CA548 100%)",
                },
                minWidth: 180,
                color: "white",
              }}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>

          <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <StudioEditor
              onEditor={(editor) => {
                editorRef.current = editor;
                loadSelectedTemplate(editor);
              }}
              options={{
                licenseKey: licenseKey,
                assets: {
                  storageType: "self",
                  onUpload: async ({ files }) => {
                    try {
                      const results = await uploadToCloudinary(files);
                      return results;
                    } catch (error) {
                      console.error("Cloudinary Upload Error:", error);
                      return [];
                    }
                  },
                },
                plugins: [
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
                    block: { category: "Extra", label: "My Table" },
                  }),
                  iconifyComponent.init({
                    block: { category: "Extra", label: "Iconify" },
                  }),
                  accordionComponent.init({
                    block: { category: "My Accordions" },
                    blockGroup: { category: "My Accordions" },
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
                    });
                  },
                ],
                layout: {
                  default: {
                    type: "row",
                    style: { height: "100%" },
                    children: [
                      { type: "sidebarLeft" },
                      {
                        type: "column",
                        style: { flexGrow: 1 },
                        children: [
                          { type: "sidebarTop" },
                          { type: "canvas" },
                          {
                            type: "row",
                            className: "rteContainer",
                            style: { justifyContent: "center" },
                          },
                        ],
                      },
                      { type: "sidebarRight" },
                    ],
                  },
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
              }}
            />
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

      <style jsx global>{`
        .loading-screen {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
