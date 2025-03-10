"use client";

import { useEffect, useState } from "react";
import TemplateSelector from "./components/editor/TemplateSelector";
import Editor from "./components/editor/Editor";
import { Template, TemplateLayout } from "./types";
import { RootState } from "@/lib/redux/store";
import { fetchTemplates } from "@/lib/redux/slices/templatesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import AppLoader from "./components/loader/AppLoader";

// ✅ Import MUI Components
import {
  Container,
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const dispatch = useAppDispatch();
  const { templates, loading } = useAppSelector(
    (state: RootState) => state.templates
  );

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleSave = (layout: TemplateLayout) => {
    console.log("Saving layout:", layout);
  };

  return (
    <AppLoader loading={loading}>
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
        {/* ✅ Header */}
        <AppBar position="static" elevation={1} color="default">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Portfolio Template Editor
            </Typography>
            <Button color="primary" variant="contained">
              Save
            </Button>
          </Toolbar>
        </AppBar>

        {/* ✅ Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {!selectedTemplate ? (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Choose a Template
              </Typography>
              <TemplateSelector
                templates={templates}
                onSelect={handleTemplateSelect}
              />
            </Paper>
          ) : (
            <Editor template={selectedTemplate} onSave={handleSave} />
          )}
        </Container>
      </Box>
    </AppLoader>
  );
}
