"use client";

import { useEffect, useState } from "react";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function EditorPage({
  params,
}: {
  params: { templateId: string };
}) {
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [iframeWidth, setIframeWidth] = useState("100%");

  useEffect(() => {
    switch (previewMode) {
      case "mobile":
        setIframeWidth("375px");
        break;
      case "tablet":
        setIframeWidth("768px");
        break;
      case "desktop":
        setIframeWidth("100%");
        break;
    }
  }, [previewMode]);

  return (
    <div className="h-screen flex flex-col">
      {/* Preview Mode Controls */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-center gap-4">
        <button
          onClick={() => setPreviewMode("desktop")}
          className={`p-2 rounded-lg transition-colors ${
            previewMode === "desktop"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Laptop className="h-5 w-5" />
        </button>
        <button
          onClick={() => setPreviewMode("tablet")}
          className={`p-2 rounded-lg transition-colors ${
            previewMode === "tablet"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Tablet className="h-5 w-5" />
        </button>
        <button
          onClick={() => setPreviewMode("mobile")}
          className={`p-2 rounded-lg transition-colors ${
            previewMode === "mobile"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Smartphone className="h-5 w-5" />
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <div
          style={{
            width: iframeWidth,
            margin: "0 auto",
            height: "100%",
            transition: "width 0.3s ease",
          }}
        >
          <StudioEditor
            options={{
              licenseKey:
                "0cb318930d184f8e9810afdb895ca6313e4f5cfdb488449aaec3d6441f159243",
              //   height: '100%',
              plugins: [
                (editor) => {
                  editor.onReady(() => {
                    // Load the selected template
                    editor.runCommand("studio:layoutToggle", {
                      id: params.templateId,
                      header: false,
                    });
                  });
                },
              ],
              // Template configurations remain the same
              templates: {
                onLoad: async () => [
                  // Your existing templates...
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
