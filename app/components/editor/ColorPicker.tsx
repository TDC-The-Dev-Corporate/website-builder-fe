import { Grid, Box, TextField } from "@mui/material";

const ColorPicker = ({ sectionStyles, setSectionStyles }) => {
  return (
    <>
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
                    backgroundColor: sectionStyles.backgroundColor || "#000000",
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
    </>
  );
};

export default ColorPicker;
