import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

interface SectionEditDialogProps {
  open: boolean;
  onClose: () => void;
  section: Section | null;
  onSave: (content: any) => void;
}

export default function SectionEditDialog({
  open,
  onClose,
  section,
  onSave,
}: SectionEditDialogProps) {
  const [content, setContent] = useState<any>(section?.content || {});

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  if (!section) return null;

  const renderFields = () => {
    switch (section.type) {
      case "hero":
        return (
          <>
            <TextField
              fullWidth
              label="Heading"
              value={content.heading || ""}
              onChange={(e) =>
                setContent({ ...content, heading: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Subheading"
              value={content.subheading || ""}
              onChange={(e) =>
                setContent({ ...content, subheading: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Background Image URL"
              value={content.image || ""}
              onChange={(e) =>
                setContent({ ...content, image: e.target.value })
              }
            />
          </>
        );
      case "about":
        return (
          <>
            <TextField
              fullWidth
              label="Heading"
              value={content.heading || ""}
              onChange={(e) =>
                setContent({ ...content, heading: e.target.value })
              }
              sx={{ mb: 2 }}
            />
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
          </>
        );
      case "projects":
        return (
          <>
            <TextField
              fullWidth
              label="Heading"
              value={content.heading || ""}
              onChange={(e) =>
                setContent({ ...content, heading: e.target.value })
              }
              sx={{ mb: 3 }}
            />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Projects
            </Typography>
            {(content.projects || []).map((project: any, index: number) => (
              <Box
                key={index}
                sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}
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
                <TextField
                  fullWidth
                  label="Image URL"
                  value={project.image || ""}
                  onChange={(e) => {
                    const newProjects = [...content.projects];
                    newProjects[index] = { ...project, image: e.target.value };
                    setContent({ ...content, projects: newProjects });
                  }}
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)}{" "}
        Section
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>{renderFields()}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
