"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import Editor from "@/app/components/editor/Editor";
import AppLoader from "@/app/components/loader/AppLoader";

export default function EditorPage() {
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const storedTemplate = localStorage.getItem("template");
    if (storedTemplate) {
      setTemplate(JSON.parse(storedTemplate));
    }
  }, []);

  const handleSave = (layout: TemplateLayout) => {
    console.log("Saving layout:", layout);
  };

  return (
    <AppLoader loading={!template}>
      <Box>
        {template && <Editor template={template} onSave={handleSave} />}
      </Box>
    </AppLoader>
  );
}
