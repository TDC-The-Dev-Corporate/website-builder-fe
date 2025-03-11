"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import Editor from "@/app/components/editor/Editor";
import AppLoader from "@/app/components/loader/AppLoader";

import { useAppDispatch } from "@/lib/redux/hooks";
import { generatePortfolio } from "@/lib/redux/slices/portfolioSlice";

export default function EditorPage() {
  const [template, setTemplate] = useState<Template | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTemplate = localStorage.getItem("template");
    if (storedTemplate) {
      setTemplate(JSON.parse(storedTemplate));
    }
  }, []);

  const handleSave = (layout: TemplateLayout) => {
    console.log("Saving layout:", layout);
    const data = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      templateId: template.id,
      title: "title",
      customizations: layout,
    };
    dispatch(generatePortfolio(data));
  };

  return (
    <AppLoader loading={!template}>
      <Box>
        {template && <Editor template={template.layout} onSave={handleSave} />}
      </Box>
    </AppLoader>
  );
}
