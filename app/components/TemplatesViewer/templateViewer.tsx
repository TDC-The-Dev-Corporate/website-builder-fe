"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { electricianTemplate } from "@/lib/templates/electrician";
import { hvacTemplate } from "@/lib/templates/hvac";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import { painterTemplate } from "@/lib/templates/painter";
import { plumberTemplate } from "@/lib/templates/plumber";

export default function TemplateViewer() {
  const router = useRouter();

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
    console.log("template", template);
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    router.push("/AIWebsiteBuilders/template-selector");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container sx={{ pt: 10, pb: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Available Templates
        </Typography>
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    srcDoc={template.data.pages[0].component}
                    style={{
                      width: "200%",
                      height: "400px",
                      border: "none",
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                    title={template.name}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click view to see the full template or edit to customize it
                    in the editor.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleView(template)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleEdit(template)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
