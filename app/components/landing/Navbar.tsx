import React, { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NorthEastIcon from "@mui/icons-material/NorthEast";

type NavbarProps = {
  sections: { id: string; label: string; ref: React.RefObject<HTMLElement> }[];
};
export const Navbar = ({ sections }: NavbarProps): JSX.Element => {
  const theme = useTheme();
  const isBelow960 = useMediaQuery("(max-width:960px)");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on component mount and when localStorage changes
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    
    checkLoginStatus();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);
    
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleNavClick = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "70px",
        backgroundColor: "black",
        boxShadow: "none",
        padding: { xs: "0 1rem", md: "0 5rem" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: "0 !important",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Box
            sx={{
              width: "38px",
              height: "38px",
              backgroundColor: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "24px", height: "17px", objectFit: "cover" }}
              alt="Logo"
              src="/images/Logo.png"
            />
          </Box>
          {!isMobile && (
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                color: "white",
                fontSize: {
                  md: isBelow960 ? "20px" : "24px",
                  lg: "30px",
                  xl: "35px",
                },
              }}
            >
              TRADES BUILDER PRO
            </Typography>
          )}
        </Box>

        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex" }}>
              {sections.map(({ id, label, ref }, index) => (
                <Button
                  key={id}
                  onClick={() => handleNavClick(ref)}
                  sx={{
                    fontFamily: '"Inter", Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    color: "#808080",
                    fontSize: "14px !important",
                    // letterSpacing: "0.28px",
                    textTransform: "uppercase",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {/* Sign In / Dashboard Button */}
            <Button
              variant="outlined"
              onClick={() => {
                if (!isLoggedIn)
                  router.push("/AIWebsiteBuilders/auth/login");
                else router.push("/AIWebsiteBuilders/home");
              }}
              sx={{
                height: "40px",
                padding: "8px 24px",
                borderRadius: "8px",
                borderColor: "white",
                marginLeft: "16px",
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                  "& .rotate-icon": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Poppins", Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                {isLoggedIn ? "Dashboard" : "Sign In"}
              </Typography>
              <NorthEastIcon
                className="rotate-icon"
                sx={{
                  width: "15px",
                  height: "15px",
                  marginLeft: "7px",
                  transform: "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </Box>
        ) : (
          <>
            {/* Mobile Menu Button */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "black",
                  color: "white",
                  width: "100vw",
                },
              }}
            >
              {sections.map(({ id, label, ref }, index) => (
                <MenuItem
                  key={id}
                  onClick={() => {
                    handleMenuClose();
                    handleNavClick(ref);
                  }}
                  sx={{
                    fontFamily: '"Inter", Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    color: "#808080",
                    fontSize: "14px",
                    letterSpacing: "0.28px",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {label}
                </MenuItem>
              ))}
              <MenuItem onClick={handleMenuClose}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    if (!isLoggedIn)
                      router.push("/AIWebsiteBuilders/auth/login");
                    else router.push("/AIWebsiteBuilders/home");
                  }}
                  sx={{
                    height: "40px",
                    padding: "8px 24px",
                    borderRadius: "8px",
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "white",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Poppins", Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                  >
                    {isLoggedIn ? "Dashboard" : "Sign In"}
                  </Typography>
                  <NorthEastIcon
                className="rotate-icon"
                sx={{
                  width: "15px",
                  height: "15px",
                  marginLeft: "7px",
                  transform: "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
                </Button>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
