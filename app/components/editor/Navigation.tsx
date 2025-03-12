import React from "react";

import {
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
} from "@mui/material";

import { Menu, X } from "lucide-react";

interface NavigationProps {
  navigation: Navigation;
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Navigation({
  navigation,
  drawerOpen,
  onDrawerToggle,
}: NavigationProps) {
  const { type, items, styles } = navigation;

  if (type === "navbar") {
    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: styles.backgroundColor,
          color: styles.textColor,
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", gap: 2 }}>
            {items.map((item) => (
              <Typography
                key={item.href}
                component="a"
                href={item.href}
                sx={{
                  color: styles.textColor,
                  textDecoration: "none",
                  "&:hover": {
                    color: styles.activeColor,
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onDrawerToggle}
          sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}
        >
          <Menu />
        </IconButton>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={onDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: styles.backgroundColor,
            color: styles.textColor,
            width: 250,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton onClick={onDrawerToggle} sx={{ color: styles.textColor }}>
            <X />
          </IconButton>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.href}
                component="a"
                href={item.href}
                sx={{
                  color: styles.textColor,
                  "&:hover": {
                    color: styles.activeColor,
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
