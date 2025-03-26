import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const FontSettings = ({ sectionStyles, setSectionStyles }) => {
  return (
    <>
      {/* Font Family */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Font Family</InputLabel>
          <Select
            label="Font Family"
            value={sectionStyles.fontFamily || "Arial, sans-serif"}
            onChange={(e) =>
              setSectionStyles({ ...sectionStyles, fontFamily: e.target.value })
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
            value={sectionStyles.fontSize || "base"}
            onChange={(e) =>
              setSectionStyles({ ...sectionStyles, fontSize: e.target.value })
            }
          >
            {["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"].map(
              (size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>

      {/* Font Style */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Font Style</InputLabel>
          <Select
            label="Font Style"
            value={sectionStyles.fontStyle || "normal"}
            onChange={(e) =>
              setSectionStyles({ ...sectionStyles, fontStyle: e.target.value })
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
    </>
  );
};

export default FontSettings;
