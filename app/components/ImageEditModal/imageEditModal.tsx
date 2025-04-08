import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Slider,
  Button,
  Typography,
} from "@mui/material";

import { getCroppedImg } from "@/lib/utils";

const ImageCropper = ({ imageSrc, onCancel, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation
    );
    onCropComplete(croppedImage);
  };

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Crop Your Image</DialogTitle>
      <DialogContent>
        <Box sx={{ position: "relative", width: "100%", height: 400, mb: 2 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Zoom</Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, value) => setZoom(value as number)}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Rotation</Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            onChange={(_, value) => setRotation(value as number)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleDone} variant="contained">
          Crop & Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
