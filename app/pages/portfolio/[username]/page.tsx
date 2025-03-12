"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import AppLoader from "@/app/components/loader/AppLoader";

import Portfolio from "./portfolio";

export default function EditorPage() {
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const storedTemplate = localStorage.getItem("template");
    if (storedTemplate) {
      setTemplate(JSON.parse(storedTemplate));
    }
  }, []);

  return (
    <AppLoader loading={!template}>
      <Box>{template && <Portfolio template={template.layout} />}</Box>
    </AppLoader>
  );
}
