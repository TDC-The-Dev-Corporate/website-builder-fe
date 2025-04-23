"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface NavbarProps {
  sections: NavSection[];
}

const NavButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontSize: "1rem",
  fontWeight: 500,
  padding: "8px 16px",
  borderRadius: "8px",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const Navbar = ({ sections }: NavbarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 2 : 0}
        sx={{
          background: scrolled ? "rgba(15, 23, 42, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              p: 3,
              height: { xs: "70px", md: "80px" },
              justifyContent: "space-between",
            }}
          >
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <Box
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  letterSpacing: ".1rem",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                TradesBuilder
              </Box>
            </Link>

            {isMobile ? (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1}>
                  {sections.map((section) => (
                    <NavButton
                      key={section.id}
                      onClick={() => handleScrollTo(section.ref)}
                    >
                      {section.label}
                    </NavButton>
                  ))}
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Link
                    href="/AIWebsiteBuilders/auth/login"
                    style={{ textDecoration: "none" }}
                  >
                    <AuthButton
                      variant="outlined"
                      sx={{
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                      }}
                    >
                      Sign In
                    </AuthButton>
                  </Link>
                  <Link
                    href="/AIWebsiteBuilders/auth/register"
                    style={{ textDecoration: "none" }}
                  >
                    <AuthButton
                      variant="contained"
                      sx={{
                        background:
                          "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                        },
                      }}
                    >
                      Register
                    </AuthButton>
                  </Link>
                </Stack>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "75%",
            maxWidth: 300,
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(false)}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ mb: 4 }}>
            {sections.map((section) => (
              <ListItem key={section.id} disablePadding>
                <ListItemButton
                  onClick={() => handleScrollTo(section.ref)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={section.label}
                    primaryTypographyProps={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Stack spacing={2} sx={{ mt: "auto", p: 2 }}>
            <Link
              href="/AIWebsiteBuilders/auth/login"
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  p: 1.5,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
            <Link
              href="/AIWebsiteBuilders/auth/register"
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                  p: 1.5,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                  },
                }}
              >
                Register
              </Button>
            </Link>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
