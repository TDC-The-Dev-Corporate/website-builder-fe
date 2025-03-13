import React, { useState } from "react";
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
  navigation: any;
}

export default function Navigation({ navigation }: NavigationProps) {
  const { type, items, styles = {} } = navigation;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const onDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleItemClick = (label: string) => {
    setSelectedSection(label);
    if (type === "drawer") {
      onDrawerToggle();
    }
  };

  const renderSection = () => {
    const section = items.find((item: any) => item.label === selectedSection);
    if (!section) return null;

    const sectionStyles = section.styles || {};
    return (
      <Box
        sx={{
          padding: "32px",
          backgroundColor: sectionStyles.backgroundColor || "#f5f5f5",
          color: sectionStyles.textColor || "#000",
        }}
      >
        <Typography variant="h4">{section.label}</Typography>
        <Typography variant="body1">
          This is the {section.label} section.
        </Typography>
      </Box>
    );
  };

  const defaultStyles = {
    backgroundColor: styles.backgroundColor || "#1976d2",
    textColor: styles.textColor || "#fff",
    activeColor: styles.activeColor || "#ff9800",
  };

  if (type === "navbar") {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            backgroundColor: defaultStyles.backgroundColor,
            color: defaultStyles.textColor,
          }}
        >
          <Toolbar>
            <Box sx={{ display: "flex", gap: 2 }}>
              {items.map((item: any) => (
                <Typography
                  key={item.label}
                  onClick={() => handleItemClick(item.label)}
                  sx={{
                    color: defaultStyles.textColor,
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: defaultStyles.activeColor,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        {renderSection()}
      </>
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
            backgroundColor: defaultStyles.backgroundColor,
            color: defaultStyles.textColor,
            width: 250,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            onClick={onDrawerToggle}
            sx={{ color: defaultStyles.textColor }}
          >
            <X />
          </IconButton>
          <List>
            {items.map((item: any) => (
              <ListItem
                key={item.label}
                onClick={() => handleItemClick(item.label)}
                sx={{
                  color: defaultStyles.textColor,
                  cursor: "pointer",
                  "&:hover": {
                    color: defaultStyles.activeColor,
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {renderSection()}
    </>
  );
}
