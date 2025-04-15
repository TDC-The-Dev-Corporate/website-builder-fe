"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Box, Button, Modal, Typography } from "@mui/material";

import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import { tableComponent } from "@grapesjs/studio-sdk-plugins";
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { accordionComponent } from "@grapesjs/studio-sdk-plugins";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { hvacTemplate } from "@/lib/templates/hvac";
import { plumberTemplate } from "@/lib/templates/plumber";
import { electricianTemplate } from "@/lib/templates/electrician";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { generatePortfolio } from "@/lib/redux/slices/portfolioSlice";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null); // To store editor instance

  const [openModal, setOpenModal] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [copyText, setCopyText] = useState("Copy Link");
  const { error } = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();

  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // replace with your actual preset
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // replace with your actual cloud name
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

  const deleteFromCloudinary = async (assets) => {
    // Cloudinary deletion via API requires a signed request from the backend
    // You'd typically call your server here to delete assets by public_id
    console.warn(
      "Deletion must be implemented via backend API with proper auth."
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getFullHtml = () => {
    if (!editorRef.current) return "";

    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();

    const fullHtml = `
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

    return fullHtml;
  };

  const handleSave = async () => {
    const fullHtml = getFullHtml();
    if (!fullHtml) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      userId: user.id,
      htmlContent: fullHtml,
    };

    try {
      const res = await dispatch(generatePortfolio(data));
      const link = `${window.location.origin}/AIWebsiteBuilders/portfolio/${res.payload.user.username}`;
      setPortfolioLink(link);
      setOpenModal(true);
    } catch (err) {
      console.error("err", err);
      alert(error);
    }
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
          <Button
            variant="contained"
            onClick={handleSave}
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

          <StudioEditor
            onEditor={(editor) => {
              editorRef.current = editor;
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
                onDelete: async ({ assets }) => {
                  await deleteFromCloudinary(assets);
                },
              },

              plugins: [
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

                (editor) =>
                  editor.onReady(() => {
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
                  }),
              ],
              templates: {
                onLoad: async () => [
                  carpenterTemplate,
                  hvacTemplate,
                  plumberTemplate,
                  electricianTemplate,
                  landscaperTemplate,
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
