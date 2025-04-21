"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Box, Button, Modal, Typography } from "@mui/material";

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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { generatePortfolio } from "@/lib/redux/slices/portfolioSlice";
import { painterTemplate } from "@/lib/templates/painter";
import { multiPageTemplate } from "@/lib/templates/multipage";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null); // To store editor instance

  const [openModal, setOpenModal] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [copyText, setCopyText] = useState("Copy Link");
  const { error } = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();

  const [saveButton, setSaveButton] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    localStorage.getItem("published") === "true"
      ? setSaveButton(false)
      : setSaveButton(true);
  }, []);

  useEffect(() => {
    const template = localStorage.getItem("selectedTemplate");
    if (template) {
      const parsedTemplate = JSON.parse(template);
      setSelectedTemplate(parsedTemplate);
      console.log("selectedTemplate", selectedTemplate);
      localStorage.removeItem("selectedTemplate");

      return () => {
        console.log("running clean up");
        setSelectedTemplate(null);
      };
    }
  }, []);

  const loadSelectedTemplate = (editor) => {
    if (selectedTemplate) {
      editor.DomComponents.clear();
      editor.CssComposer.clear();

      selectedTemplate.data.pages.forEach((page) => {
        editor.Pages.add({
          id: page.id,
          name: page.name,
          component: page.component,
          styles: page.styles || "",
        });
      });

      editor.Pages.select(selectedTemplate.data.pages[0].id);
    }
  };

  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const licenseKey = process.env.NEXT_PUBLIC_GRAPESJS_LICENSE_KEY;
  const uploadToCloudinary = async (files) => {
    const uploadedAssets = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload to Cloudinary");

      const data = await res.json();

      uploadedAssets.push({
        id: data.public_id,
        src: data.secure_url,
        name: file.name,
        mimeType: file.type,
        size: file.size,
      });
    }

    return uploadedAssets;
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  const getFullHtmlForAllPages = () => {
    if (!editorRef.current) return [];

    const editor = editorRef.current;
    const pages = editor.Pages.getAll();
    const css = editor.getCss();

    return pages.map((page) => {
      const pageId = page.getId();
      const pageName = page.getName();
      const html = editor.getHtml({ pageId });

      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageName}</title>
  <style>${css}</style>
</head>
<body>${html}</body>
</html>`;

      return {
        pageId,
        pageName,
        html: fullHtml,
      };
    });
  };

  const handleSave = async () => {
    const pages = getFullHtmlForAllPages();
    const processedPages = pages.map((page) => {
      const processedHtml = page.html.replace(
        /href="#!" data-gjs-nav="([^"]+)"/g,
        (match, pageName) => {
          const targetPage =
            pages.find(
              (p) => p.pageName.toLowerCase() === pageName.toLowerCase()
            ) ||
            selectedTemplate?.data.pages.find(
              (p) => p.name.toLowerCase() === pageName.toLowerCase()
            );
          return targetPage
            ? `href="/${targetPage.id || targetPage.pageId}.html"`
            : match;
        }
      );

      return {
        ...page,
        html: processedHtml,
      };
    });

    console.log("All pages:", processedPages);

    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      userId: user.id,
      pages: processedPages,
      mainPageId: editorRef.current.Pages.getSelected().getId(),
    };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioLink);
    setCopyText("Copied!");

    setTimeout(() => {
      setCopyText("Copy Link");
    }, 2000);
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
        <div style={{ height: "100vh" }}>
          {saveButton && (
            <Button
              variant="contained"
              onClick={() => {
                setSaveButton(false);
                handleSave();
              }}
              sx={{
                m: 1,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Save Changes
            </Button>
          )}

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
                  // Custom TinyMCE configuration
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
                      console.log("selected template");
                      loadSelectedTemplate(editor);
                    } else {
                      console.log("no selected template");
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
                  multiPageTemplate,
                ],
              },
            }}
          />
        </div>
      )}
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Your Portfolio Link</Typography>
          <Typography variant="body1" sx={{ marginY: 2 }}>
            {portfolioLink}
          </Typography>
          <Button
            onClick={handleCopy}
            variant="contained"
            disabled={copyText === "Copied!"}
          >
            {copyText}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
