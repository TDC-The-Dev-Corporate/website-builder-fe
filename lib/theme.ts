import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    appleGreen: Palette["primary"];
    appleBlue: Palette["primary"];
    appleGray: Palette["primary"];
  }
  interface PaletteOptions {
    appleGreen: PaletteOptions["primary"];
    appleBlue: PaletteOptions["primary"];
    appleGray: PaletteOptions["primary"];
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#34C759", // Apple green
      light: "#4CD964",
      dark: "#30B350",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0A84FF", // Apple blue
      light: "#5AC8FA",
      dark: "#007AFF",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FF3B30", // Apple red
      light: "#FF6B6B",
      dark: "#D70015",
    },
    warning: {
      main: "#FF9500", // Apple orange
      light: "#FFCC00",
      dark: "#FF8000",
    },
    info: {
      main: "#5856D6", // Apple purple
      light: "#AF52DE",
      dark: "#5E5CE6",
    },
    success: {
      main: "#34C759", // Apple green
      light: "#4CD964",
      dark: "#30B350",
    },
    background: {
      default: "#F2F2F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#3C3C43",
    },
    appleGreen: {
      main: "#34C759",
      light: "#4CD964",
      dark: "#30B350",
      contrastText: "#ffffff",
    },
    appleBlue: {
      main: "#0A84FF",
      light: "#5AC8FA",
      dark: "#007AFF",
      contrastText: "#ffffff",
    },
    appleGray: {
      main: "#8E8E93",
      light: "#AEAEB2",
      dark: "#636366",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily:
      '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #34C759 0%, #30B350 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4CD964 0%, #34C759 100%)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #0A84FF 0%, #007AFF 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5AC8FA 0%, #0A84FF 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        },
        elevation4: {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
