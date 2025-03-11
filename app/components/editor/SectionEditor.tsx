import React from "react";

import { Box, IconButton } from "@mui/material";

import { Pencil, Move, Trash } from "lucide-react";

import SectionRenderer from "./SectionRenderer";

interface SectionEditorProps {
  section: Section;
  dragHandleProps: any;
  onEdit: (section: Section) => void;
  onDelete: (id: string) => void;
}

export default function SectionEditor({
  section,
  dragHandleProps,
  onEdit,
  onDelete,
}: SectionEditorProps) {
  return (
    <Box sx={{ position: "relative", mb: 2 }}>
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          gap: 1,
          opacity: 0,
          "&:hover": { opacity: 1 },
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => onEdit(section)}
          sx={{ bgcolor: "background.paper" }}
        >
          <Pencil />
        </IconButton>
        <IconButton {...dragHandleProps} sx={{ bgcolor: "background.paper" }}>
          <Move />
        </IconButton>
        <IconButton
          onClick={() => onDelete(section.id)}
          sx={{
            bgcolor: "background.paper",
            color: "error.main",
          }}
        >
          <Trash />
        </IconButton>
      </Box>
      <SectionRenderer section={section} />
    </Box>
  );
}
