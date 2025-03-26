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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import { Upload, X } from "lucide-react";

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

  const ImageUploadField = ({ value, onChange, onUpload, label }: any) => (
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
          id="image-upload"
          style={{ display: "none" }}
          onChange={onUpload}
        />
        <label htmlFor="image-upload">
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
              />
            </Grid>

            {/* Font Family */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Font Family</InputLabel>
                <Select
                  label="Font Family"
                  value={section.styles.fontFamily || "Arial, sans-serif"}
                  onChange={(e) =>
                    setSectionStyles({
                      ...sectionStyles,
                      fontFamily: e.target.value,
                    })
                  }
                >
                  {[
                    "Arial, sans-serif",
                    "Verdana, sans-serif",
                    "Times New Roman, serif",
                    "Georgia, serif",
                    "Courier New, monospace",
                    "Tahoma, sans-serif",
                    "Trebuchet MS, sans-serif",
                    "Lucida Console, monospace",
                    "Montserrat, sans-serif",
                  ].map((font) => (
                    <MenuItem key={font} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Font Size */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Font Size</InputLabel>
                <Select
                  label="Font Size"
                  value={section.styles.fontSize || "base"}
                  onChange={(e) =>
                    setSectionStyles({
                      ...sectionStyles,
                      fontSize: e.target.value,
                    })
                  }
                >
                  {[
                    "xs",
                    "sm",
                    "base",
                    "lg",
                    "xl",
                    "2xl",
                    "3xl",
                    "4xl",
                    "5xl",
                  ].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Font Style */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Font Style</InputLabel>
                <Select
                  label="Font Style"
                  value={section.styles.fontStyle || "normal"}
                  onChange={(e) =>
                    setSectionStyles({
                      ...sectionStyles,
                      fontStyle: e.target.value,
                    })
                  }
                >
                  {["normal", "italic", "oblique"].map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  disabled
                  fullWidth
                  label="Text Color"
                  variant="outlined"
                  value={sectionStyles.textColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          backgroundColor: sectionStyles.textColor || "#000000",
                          marginRight: 1,
                        }}
                      />
                    ),
                  }}
                />

                {/* Color Picker */}
                <TextField
                  type="color"
                  value={sectionStyles.textColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  sx={{
                    width: 50,
                    minWidth: 45,
                    padding: 0,
                    border: "none",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  disabled
                  fullWidth
                  label="Background Color"
                  variant="outlined"
                  value={sectionStyles.backgroundColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          backgroundColor:
                            sectionStyles.backgroundColor || "#000000",
                          marginRight: 1,
                        }}
                      />
                    ),
                  }}
                />

                {/* Color Picker */}
                <TextField
                  type="color"
                  value={sectionStyles.backgroundColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  sx={{
                    width: 50,
                    minWidth: 45,
                    padding: 0,
                    border: "none",
                  }}
                />
              </Box>
            </Grid>
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

            {/* Font Family */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Font Family</InputLabel>
                <Select
                  label="Font Family"
                  value={section.styles.fontFamily || "Arial, sans-serif"}
                  onChange={(e) =>
                    setSectionStyles({
                      ...sectionStyles,
                      fontFamily: e.target.value,
                    })
                  }
                >
                  {[
                    "Arial, sans-serif",
                    "Verdana, sans-serif",
                    "Times New Roman, serif",
                    "Georgia, serif",
                    "Courier New, monospace",
                    "Tahoma, sans-serif",
                    "Trebuchet MS, sans-serif",
                    "Lucida Console, monospace",
                    "Montserrat, sans-serif",
                  ].map((font) => (
                    <MenuItem key={font} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Font Size */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Font Size</InputLabel>
                <Select
                  label="Font Size"
                  value={section.styles.fontSize || "base"}
                  onChange={(e) =>
                    setSectionStyles({
                      ...sectionStyles,
                      fontSize: e.target.value,
                    })
                  }
                >
                  {[
                    "xs",
                    "sm",
                    "base",
                    "lg",
                    "xl",
                    "2xl",
                    "3xl",
                    "4xl",
                    "5xl",
                  ].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Font Style */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Font Style</InputLabel>
                <Select
                  label="Font Style"
                  value={section.styles.fontStyle || "normal"}
                  onChange={(e) =>
                    setSectionStyles({
                      ...sectionStyles,
                      fontStyle: e.target.value,
                    })
                  }
                >
                  {["normal", "italic", "oblique"].map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  disabled
                  fullWidth
                  label="Text Color"
                  variant="outlined"
                  value={sectionStyles.textColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          backgroundColor: sectionStyles.textColor || "#000000",
                          marginRight: 1,
                        }}
                      />
                    ),
                  }}
                />

                {/* Color Picker */}
                <TextField
                  type="color"
                  value={sectionStyles.textColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  sx={{
                    width: 50,
                    minWidth: 45,
                    padding: 0,
                    border: "none",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  disabled
                  fullWidth
                  label="Background Color"
                  variant="outlined"
                  value={sectionStyles.backgroundColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          backgroundColor:
                            sectionStyles.backgroundColor || "#000000",
                          marginRight: 1,
                        }}
                      />
                    ),
                  }}
                />

                {/* Color Picker */}
                <TextField
                  type="color"
                  value={sectionStyles.backgroundColor || "#000000"}
                  onChange={(e) =>
                    setSectionStyles((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  sx={{
                    width: 50,
                    minWidth: 45,
                    padding: 0,
                    border: "none",
                  }}
                />
              </Box>
            </Grid>
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
              {/* Font Family */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Font Family</InputLabel>
                  <Select
                    label="Font Family"
                    value={section.styles.fontFamily || "Arial, sans-serif"}
                    onChange={(e) =>
                      setSectionStyles({
                        ...sectionStyles,
                        fontFamily: e.target.value,
                      })
                    }
                  >
                    {[
                      "Arial, sans-serif",
                      "Verdana, sans-serif",
                      "Times New Roman, serif",
                      "Georgia, serif",
                      "Courier New, monospace",
                      "Tahoma, sans-serif",
                      "Trebuchet MS, sans-serif",
                      "Lucida Console, monospace",
                      "Montserrat, sans-serif",
                    ].map((font) => (
                      <MenuItem key={font} value={font}>
                        {font}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Font Size */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Font Size</InputLabel>
                  <Select
                    label="Font Size"
                    value={section.styles.fontSize || "base"}
                    onChange={(e) =>
                      setSectionStyles({
                        ...sectionStyles,
                        fontSize: e.target.value,
                      })
                    }
                  >
                    {[
                      "xs",
                      "sm",
                      "base",
                      "lg",
                      "xl",
                      "2xl",
                      "3xl",
                      "4xl",
                      "5xl",
                    ].map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Font Style */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Font Style</InputLabel>
                  <Select
                    label="Font Style"
                    value={section.styles.fontStyle || "normal"}
                    onChange={(e) =>
                      setSectionStyles({
                        ...sectionStyles,
                        fontStyle: e.target.value,
                      })
                    }
                  >
                    {["normal", "italic", "oblique"].map((style) => (
                      <MenuItem key={style} value={style}>
                        {style}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    disabled
                    fullWidth
                    label="Text Color"
                    variant="outlined"
                    value={sectionStyles.textColor || "#000000"}
                    onChange={(e) =>
                      setSectionStyles((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            backgroundColor:
                              sectionStyles.textColor || "#000000",
                            marginRight: 1,
                          }}
                        />
                      ),
                    }}
                  />

                  {/* Color Picker */}
                  <TextField
                    type="color"
                    value={sectionStyles.textColor || "#000000"}
                    onChange={(e) =>
                      setSectionStyles((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    sx={{
                      width: 50,
                      minWidth: 45,
                      padding: 0,
                      border: "none",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    disabled
                    fullWidth
                    label="Background Color"
                    variant="outlined"
                    value={sectionStyles.backgroundColor || "#000000"}
                    onChange={(e) =>
                      setSectionStyles((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            backgroundColor:
                              sectionStyles.backgroundColor || "#000000",
                            marginRight: 1,
                          }}
                        />
                      ),
                    }}
                  />

                  {/* Color Picker */}
                  <TextField
                    type="color"
                    value={sectionStyles.backgroundColor || "#000000"}
                    onChange={(e) =>
                      setSectionStyles((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }))
                    }
                    sx={{
                      width: 50,
                      minWidth: 45,
                      padding: 0,
                      border: "none",
                    }}
                  />
                </Box>
              </Grid>
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
