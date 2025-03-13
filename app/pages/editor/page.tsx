"use client";

import { useEffect, useState } from "react";

import { Box, Button, Modal, Typography } from "@mui/material";

import Editor from "@/app/components/editor/Editor";
import AppLoader from "@/app/components/loader/AppLoader";

import { useAppDispatch } from "@/lib/redux/hooks";
import { generatePortfolio } from "@/lib/redux/slices/portfolioSlice";

export default function EditorPage() {
  const [template, setTemplate] = useState<Template | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [copyText, setCopyText] = useState("Copy Link");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTemplate = localStorage.getItem("template");
    if (storedTemplate) {
      setTemplate(JSON.parse(storedTemplate));
    }
  }, []);

  const handleSave = async (layout: TemplateLayout) => {
    console.log("template", template);
    const data = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      templateId: template?.id,
      layout: layout,
    };
    const res = await dispatch(generatePortfolio(data));

    if (res.type === "portfolios/create/fulfilled") {
      const formatedData = {
        ...data,
        id: data.templateId,
      };

      delete formatedData.templateId;
      localStorage.setItem("template", JSON.stringify(formatedData));

      const link = `${window.location.origin}/pages/portfolio/${res.payload.user.name}`;
      setPortfolioLink(link);
      setOpenModal(true);
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
    <AppLoader loading={!template}>
      <Box>
        {template && <Editor template={template.layout} onSave={handleSave} />}

        {/* Portfolio Link Modal */}
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
      </Box>
    </AppLoader>
  );
}
