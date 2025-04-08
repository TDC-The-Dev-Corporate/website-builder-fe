import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

import ImageCropper from "../ImageEditModal/imageEditModal";
import { renderFields } from "./SectionFields";

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
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [pendingUpload, setPendingUpload] = useState<{
    field: string;
    projectIndex?: number;
  } | null>(null);

  useEffect(() => {
    if (section?.content) {
      setContent(section?.content);
      setSectionStyles(section?.styles);
      setFetching(false);
    }
  }, [section]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    projectIndex?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToCrop(reader.result as string);
      setPendingUpload({ field, projectIndex });
    };
    reader.readAsDataURL(file);
  };

  const handleCroppedImageUpload = async (croppedImage: Blob) => {
    if (!pendingUpload) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", croppedImage);
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

      if (pendingUpload.projectIndex !== undefined) {
        const newProjects = [...content.projects];
        newProjects[pendingUpload.projectIndex] = {
          ...newProjects[pendingUpload.projectIndex],
          [pendingUpload.field]: data.secure_url,
        };
        setContent({ ...content, projects: newProjects });
      } else {
        setContent({ ...content, [pendingUpload.field]: data.secure_url });
      }
    } catch (error) {
      console.error("Error uploading cropped image:", error);
    } finally {
      setUploading(false);
      setImageToCrop(null);
      setPendingUpload(null);
    }
  };

  const handleSave = () => {
    let updatedJson = {
      content: { ...content },
      styles: { ...sectionStyles },
    };
    onSave(updatedJson);
    onClose();
  };

  if (!section) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)}{" "}
        Section
      </DialogTitle>
      <DialogContent>
        {!fetching && (
          <Box sx={{ mt: 2 }}>
            {renderFields(
              section,
              content,
              setContent,
              handleImageUpload,
              sectionStyles,
              setSectionStyles
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={uploading}>
          Save
        </Button>
      </DialogActions>
      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCancel={() => {
            setImageToCrop(null);
            setPendingUpload(null);
          }}
          onCropComplete={handleCroppedImageUpload}
        />
      )}
    </Dialog>
  );
}
