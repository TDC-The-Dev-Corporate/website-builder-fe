import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";

import { Upload, X } from "lucide-react";

import FontSettings from "./FontSettings";
import ColorPicker from "./ColorPicker";

interface SectionEditDialogProps {
  open: boolean;
  onClose: () => void;
  section: Section | null;
  onSave: (content: any) => void;
}

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function SectionEditDialog({
  open,
  onClose,
  section,
  onSave,
}: SectionEditDialogProps) {
  const [content, setContent] = useState<any>(section?.content || {});
  const [sectionStyles, setSectionStyles] = useState<any>(
    section?.styles || {}
  );
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (section?.content) {
      setContent(section?.content);
      setSectionStyles(section?.styles);
      setFetching(false);
    }
  }, [section]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    projectIndex?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (projectIndex !== undefined) {
        const newProjects = [...content.projects];
        newProjects[projectIndex] = {
          ...newProjects[projectIndex],
          [field]: data.secure_url,
        };
        setContent({ ...content, projects: newProjects });
      } else {
        setContent({ ...content, [field]: data.secure_url });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const ImageUploadField = ({ value, onChange, onUpload, label, id }: any) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          value={value || ""}
          onChange={onChange}
          placeholder="Enter image URL"
        />
        <input
          accept="image/*"
          type="file"
          id={id}
          style={{ display: "none" }}
          onChange={onUpload}
        />
        <label htmlFor={id}>
          <IconButton
            component="span"
            disabled={uploading}
            sx={{ bgcolor: "grey.200" }}
          >
            <Upload />
          </IconButton>
        </label>
      </Box>
      {value && (
        <Box sx={{ mt: 2, position: "relative" }}>
          <img
            src={value}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <IconButton
            size="small"
            onClick={() => onChange({ target: { value: "" } })}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.8)",
            }}
          >
            <X size={16} />
          </IconButton>
        </Box>
      )}
    </Box>
  );

  const handleSave = () => {
    let updatedJson = {
      content: { ...content },
      styles: { ...sectionStyles },
    };
    onSave(updatedJson);
    onClose();
  };

  if (!section) return null;

  const renderFields = () => {
    switch (section.type) {
      case "hero":
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)}{" "}
        Section
      </DialogTitle>
      <DialogContent>
        {!fetching && <Box sx={{ mt: 2 }}>{renderFields()}</Box>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={uploading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
