"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { hvacTemplate } from "@/lib/templates/hvac";
import { plumberTemplate } from "@/lib/templates/plumber";
import { electricianTemplate } from "@/lib/templates/electrician";
import { landscaperTemplate } from "@/lib/templates/landscaper";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
          <StudioEditor
            options={{
              licenseKey:
                "0cb318930d184f8e9810afdb895ca6313e4f5cfdb488449aaec3d6441f159243",
              plugins: [
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
    </>
  );
}
