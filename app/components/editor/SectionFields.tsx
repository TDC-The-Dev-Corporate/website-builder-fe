import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { ImageUploadField } from "./ImageUploadField";
import FontSettings from "./FontSettings";
import ColorPicker from "./ColorPicker";
import RichTextEditor from "../TextEditor/RichTextEditor";

export const renderFields = (
  section,
  content,
  setContent,
  handleImageUpload,
  sectionStyles,
  setSectionStyles
) => {
  switch (section.type) {
    case "hero":
      return (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              minHeight: "300px",
              zIndex: 1,
            }}
          >
            <RichTextEditor
              value={content.heading}
              onChange={(e) => setContent({ ...content, heading: e })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subheading"
              value={content.subheading || ""}
              onChange={(e) =>
                setContent({ ...content, subheading: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <ImageUploadField
              label="Background Image"
              value={content.image}
              onChange={(e: any) =>
                setContent({ ...content, image: e.target.value })
              }
              onUpload={(e: any) => handleImageUpload(e, "image")}
              id={`image-upload-hero`}
              uploading
            />
          </Grid>

          <FontSettings
            sectionStyles={sectionStyles}
            setSectionStyles={setSectionStyles}
          />

          <ColorPicker
            sectionStyles={sectionStyles}
            setSectionStyles={setSectionStyles}
          />
        </Grid>
      );

    case "about":
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Heading"
              value={content.heading || ""}
              onChange={(e) =>
                setContent({ ...content, heading: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={content.description || ""}
              onChange={(e) =>
                setContent({ ...content, description: e.target.value })
              }
            />
          </Grid>

          <FontSettings
            sectionStyles={sectionStyles}
            setSectionStyles={setSectionStyles}
          />

          <ColorPicker
            sectionStyles={sectionStyles}
            setSectionStyles={setSectionStyles}
          />
        </Grid>
      );
    case "projects":
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Heading"
                value={content.heading || ""}
                onChange={(e) =>
                  setContent({ ...content, heading: e.target.value })
                }
                sx={{ mb: 3 }}
              />
            </Grid>
            <FontSettings
              sectionStyles={sectionStyles}
              setSectionStyles={setSectionStyles}
            />

            <ColorPicker
              sectionStyles={sectionStyles}
              setSectionStyles={setSectionStyles}
            />
          </Grid>
          <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
            Projects
          </Typography>
          {(content.projects || []).map((project: any, index: number) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "grey.100",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Project {index + 1}
              </Typography>
              <TextField
                fullWidth
                label="Title"
                value={project.title || ""}
                onChange={(e) => {
                  const newProjects = [...content.projects];
                  newProjects[index] = { ...project, title: e.target.value };
                  setContent({ ...content, projects: newProjects });
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={project.description || ""}
                onChange={(e) => {
                  const newProjects = [...content.projects];
                  newProjects[index] = {
                    ...project,
                    description: e.target.value,
                  };
                  setContent({ ...content, projects: newProjects });
                }}
                sx={{ mb: 2 }}
              />
              <ImageUploadField
                label="Project Image"
                value={project.image}
                onChange={(e: any) => {
                  const newProjects = [...content.projects];
                  newProjects[index] = { ...project, image: e.target.value };
                  setContent({ ...content, projects: newProjects });
                }}
                onUpload={(e: any) => handleImageUpload(e, "image", index)}
                id={`image-upload-${index}`}
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => {
              const newProjects = [...(content.projects || [])];
              newProjects.push({ title: "", description: "", image: "" });
              setContent({ ...content, projects: newProjects });
            }}
          >
            Add Project
          </Button>
        </>
      );
    default:
      return null;
  }
};
