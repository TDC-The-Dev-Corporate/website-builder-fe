import React, { ReactNode } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

interface AppLoaderProps {
  loading: boolean;
  children?: ReactNode;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children, loading }) => {
  return (
    <>
      {loading && (
        <Grid
          container
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#fff" }} />
        </Grid>
      )}
      {children}
    </>
  );
};

export default AppLoader;
