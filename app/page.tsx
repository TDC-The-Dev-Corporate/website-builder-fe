"use client";

import { useEffect } from "react";

import TemplateSelector from "./components/editor/TemplateSelector";
import AppLoader from "./components/loader/AppLoader";

import { RootState } from "@/lib/redux/store";
import { fetchTemplates } from "@/lib/redux/slices/templatesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

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
  const dispatch = useAppDispatch();
  const { templates, loading } = useAppSelector(
    (state: RootState) => state.templates
  );

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  return (
    <AppLoader loading={loading}>
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
        <AppBar position="static" elevation={1} color="default">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Portfolio Template Editor
            </Typography>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth={false}
          sx={{
            py: 4,
            width: "100%",
            mx: "auto",
          }}
        >
          <Paper elevation={3} sx={{ p: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Choose a Template
            </Typography>
            <TemplateSelector templates={templates} />
          </Paper>
        </Container>
      </Box>
    </AppLoader>
  );
}
