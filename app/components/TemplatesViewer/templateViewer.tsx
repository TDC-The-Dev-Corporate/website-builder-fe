"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Eye, Edit2, Star } from "lucide-react";
import { carpenterTemplate } from "@/lib/templates/carpenter";
import { electricianTemplate } from "@/lib/templates/electrician";
import { hvacTemplate } from "@/lib/templates/hvac";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import { painterTemplate } from "@/lib/templates/painter";
import { plumberTemplate } from "@/lib/templates/plumber";
import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";

export default function TemplateViewer() {
  const router = useRouter();
  const theme = useTheme();

  const templates = [
    carpenterTemplate,
    electricianTemplate,
    hvacTemplate,
    landscaperTemplate,
    painterTemplate,
    plumberTemplate,
  ];

  const handleView = (template) => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(template.data.pages[0].component);
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
          Professional Templates
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
          Choose from our collection of professionally designed templates
          tailored for trade businesses
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
                    srcDoc={template.data.pages[0].component}
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
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Chip
                      icon={<Star size={14} />}
                      label="Premium"
                      sx={{
                        backgroundColor: "rgba(59, 130, 246, 0.9)",
                        color: "white",
                        backdropFilter: "blur(4px)",
                        "& .MuiChip-icon": {
                          color: "white",
                        },
                      }}
                    />
                    <Chip
                      label={template.name.split(" ")[0]}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        backdropFilter: "blur(4px)",
                      }}
                    />
                  </Box>
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
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Professional template designed specifically for{" "}
                    {template.name.toLowerCase()} services. Includes service
                    sections, testimonials, and contact forms.
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
