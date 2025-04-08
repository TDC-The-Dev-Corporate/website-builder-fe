import { Box, IconButton, TextField, Typography } from "@mui/material";

import { Upload, X } from "lucide-react";

export const ImageUploadField = ({
  value,
  onChange,
  onUpload,
  label,
  id,
  uploading,
}: any) => (
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
