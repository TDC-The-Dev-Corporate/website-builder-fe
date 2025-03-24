"use client";

import { Grid, Typography, Link, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ProfileURLCard = ({ url }: { url: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Grid
          container
          sx={{
            gap: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography>My Profile URL</Typography>
          <Grid
            sx={{
              gap: 1,
              display: "flex",
            }}
          >
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "none",
                mt: { xs: 1, sm: "2px" },
                wordBreak: "break-all",
                color: "#0d47a1",
              }}
            >
              {url}
            </Link>
            <Tooltip title="Copy URL">
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileURLCard;
