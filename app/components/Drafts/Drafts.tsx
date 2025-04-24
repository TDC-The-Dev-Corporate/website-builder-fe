"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { Eye, Edit2 } from "lucide-react";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

import { getAllPortfolios } from "@/lib/redux/slices/portfolioSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function Drafts() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      const drafts = await dispatch(getAllPortfolios());
      if (drafts.payload) {
        setTemplates(drafts.payload);
      }
    };
    fetchDrafts();
  }, []);

  const handleView = (template) => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(template.htmlContent);
      newWindow.document.close();
    }
  };

  const handleEdit = (template) => {
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    router.push("/AIWebsiteBuilders/template-selector");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", mb: 2, fontWeight: 700 }}
        >
          My Templates & Drafts
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: 600,
            mx: "auto",
            px: { xs: 2, sm: 0 },
          }}
        >
          View and manage templates and drafts you've created for your trade
          business
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {templates.map((template, index) => (
          <Grid item xs={12} sm={6} lg={4} key={template.id}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <GlassMorphism
                blur={10}
                opacity={0.1}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 240,
                    overflow: "hidden",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <iframe
                    srcDoc={template.htmlContent}
                    style={{
                      width: "200%",
                      height: "480px",
                      border: "none",
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                    title={template.name}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    px: 0,
                    pt: 2,
                    pb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "white", mb: 1, fontWeight: 600 }}
                  >
                    {template.name}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 0, pt: 2, gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleView(template)}
                    startIcon={<Eye size={18} />}
                    sx={{
                      flex: 1,
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(template)}
                    startIcon={<Edit2 size={18} />}
                    sx={{
                      flex: 1,
                      background:
                        "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                      },
                    }}
                  >
                    Customize
                  </Button>
                </CardActions>
              </GlassMorphism>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
