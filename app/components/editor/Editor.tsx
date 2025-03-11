import React, { useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  Smartphone,
  Tablet,
  Monitor,
  Pencil,
  Move,
  Trash,
  Menu,
  X,
} from "lucide-react";

import { Template, TemplateLayout, Section, Navigation } from "../../types";

interface EditorProps {
  template: Template;
  onSave: (layout: TemplateLayout) => void;
}

type PreviewMode = "mobile" | "tablet" | "desktop";
type EditMode = "sections" | "navigation";

export default function Editor({ template, onSave }: EditorProps) {
  const [layout, setLayout] = useState<TemplateLayout>(template.layout);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [editMode, setEditMode] = useState<EditMode>("sections");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [navEditDialogOpen, setNavEditDialogOpen] = useState(false);
  const [editedNavigation, setEditedNavigation] = useState<Navigation>(
    layout.navigation
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sections = Array.from(layout.sections);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    setLayout({
      ...layout,
      sections,
    });
  };

  const handleNavItemDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(editedNavigation.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEditedNavigation({
      ...editedNavigation,
      items,
    });
  };

  const handleDelete = (sectionId: string) => {
    setLayout({
      ...layout,
      sections: layout.sections.filter((section) => section.id !== sectionId),
    });
  };

  const handleEditClick = (section: Section) => {
    setCurrentSection(section);
    setEditedContent(JSON.stringify(section.content, null, 2));
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (currentSection) {
      try {
        const updatedContent = JSON.parse(editedContent);
        setLayout({
          ...layout,
          sections: layout.sections.map((section) =>
            section.id === currentSection.id
              ? { ...section, content: updatedContent }
              : section
          ),
        });
        setEditDialogOpen(false);
      } catch (e) {
        alert("Invalid JSON format");
      }
    }
  };

  const handleEditNavigation = () => {
    setEditedNavigation(layout.navigation);
    setNavEditDialogOpen(true);
  };

  const handleNavEditSave = () => {
    setLayout({
      ...layout,
      navigation: editedNavigation,
    });
    setNavEditDialogOpen(false);
  };

  const renderNavigation = () => {
    const { type, items, styles } = layout.navigation;

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
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              width: 250,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: styles.textColor }}
            >
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
  };

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "hero":
        return (
          <Box
            sx={{
              background: section.styles.backgroundColor,
              py: 5,
              px: 3,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {section.content.image && (
              <Box
                component="img"
                src={section.content.image}
                alt="Hero"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.7,
                }}
              />
            )}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{ color: section.styles.textColor, mb: 2 }}
              >
                {section.content.heading}
              </Typography>
              <Typography variant="h5" sx={{ color: section.styles.textColor }}>
                {section.content.subheading}
              </Typography>
            </Box>
          </Box>
        );
      case "about":
        return (
          <Box
            sx={{
              backgroundColor: section.styles.backgroundColor,
              py: 4,
              px: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: section.styles.textColor, mb: 3 }}
            >
              {section.content.heading}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: section.styles.textColor }}
            >
              {section.content.description}
            </Typography>
          </Box>
        );
      case "projects":
        return (
          <Box
            sx={{
              backgroundColor: section.styles.backgroundColor,
              py: 4,
              px: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: section.styles.textColor, mb: 4 }}
            >
              {section.content.heading}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 3,
              }}
            >
              {section.content.projects.map((project: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    overflow: "hidden",
                    boxShadow: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          width: "300px",
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Editor
        </Typography>

        <Tabs
          value={editMode}
          onChange={(_, newValue) => setEditMode(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab value="sections" label="Sections" />
          <Tab value="navigation" label="Navigation" />
        </Tabs>

        {editMode === "sections" && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Preview Mode
            </Typography>
            <ToggleButtonGroup
              value={previewMode}
              exclusive
              onChange={(_, newMode) => newMode && setPreviewMode(newMode)}
              sx={{ mb: 3 }}
            >
              <ToggleButton value="mobile">
                <Smartphone />
              </ToggleButton>
              <ToggleButton value="tablet">
                <Tablet />
              </ToggleButton>
              <ToggleButton value="desktop">
                <Monitor />
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        )}

        {editMode === "navigation" && (
          <Button
            variant="contained"
            onClick={handleEditNavigation}
            sx={{ mb: 3 }}
          >
            Edit Navigation
          </Button>
        )}

        <Button
          variant="contained"
          onClick={() => onSave(layout)}
          sx={{ mt: "auto" }}
        >
          Save Changes
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          bgcolor: "grey.100",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            width:
              previewMode === "mobile"
                ? "375px"
                : previewMode === "tablet"
                ? "768px"
                : "100%",
            mb: 2,
            ml: 2,
            transition: "all 0.3s",
          }}
        >
          {layout.navigation && renderNavigation()}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {layout.sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{ position: "relative", mb: 2 }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 16,
                              right: 16,
                              display: "flex",
                              gap: 1,
                              opacity: 0,
                              "&:hover": { opacity: 1 },
                              zIndex: 10,
                            }}
                          >
                            <IconButton
                              onClick={() => handleEditClick(section)}
                              sx={{ bgcolor: "background.paper" }}
                            >
                              <Pencil />
                            </IconButton>
                            <IconButton
                              {...provided.dragHandleProps}
                              sx={{ bgcolor: "background.paper" }}
                            >
                              <Move />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(section.id)}
                              sx={{
                                bgcolor: "background.paper",
                                color: "error.main",
                              }}
                            >
                              <Trash />
                            </IconButton>
                          </Box>
                          {renderSection(section)}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Section Content</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            rows={10}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {layout.navigation && (
        <Dialog
          open={navEditDialogOpen}
          onClose={() => setNavEditDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Navigation</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Navigation Type
              </Typography>
              <ToggleButtonGroup
                value={editedNavigation.type}
                exclusive
                onChange={(_, newType) =>
                  newType &&
                  setEditedNavigation({ ...editedNavigation, type: newType })
                }
              >
                <ToggleButton value="navbar">Navbar</ToggleButton>
                <ToggleButton value="drawer">Drawer</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Navigation Items
            </Typography>
            <DragDropContext onDragEnd={handleNavItemDragEnd}>
              <Droppable droppableId="navItems">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {editedNavigation.items.map((item, index) => (
                      <Draggable
                        key={item.href}
                        draggableId={item.href}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              p: 2,
                              mb: 1,
                              bgcolor: "grey.100",
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Move size={20} />
                            <Box sx={{ flex: 1 }}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Label"
                                value={item.label}
                                onChange={(e) => {
                                  const newItems = [...editedNavigation.items];
                                  newItems[index] = {
                                    ...item,
                                    label: e.target.value,
                                  };
                                  setEditedNavigation({
                                    ...editedNavigation,
                                    items: newItems,
                                  });
                                }}
                                sx={{ mb: 1 }}
                              />
                              <TextField
                                fullWidth
                                size="small"
                                label="Link"
                                value={item.href}
                                onChange={(e) => {
                                  const newItems = [...editedNavigation.items];
                                  newItems[index] = {
                                    ...item,
                                    href: e.target.value,
                                  };
                                  setEditedNavigation({
                                    ...editedNavigation,
                                    items: newItems,
                                  });
                                }}
                              />
                            </Box>
                            <IconButton
                              onClick={() => {
                                const newItems = editedNavigation.items.filter(
                                  (_, i) => i !== index
                                );
                                setEditedNavigation({
                                  ...editedNavigation,
                                  items: newItems,
                                });
                              }}
                              color="error"
                            >
                              <Trash size={20} />
                            </IconButton>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              variant="outlined"
              onClick={() => {
                setEditedNavigation({
                  ...editedNavigation,
                  items: [
                    ...editedNavigation.items,
                    { href: "#new", label: "New Item" },
                  ],
                });
              }}
              sx={{ mt: 2 }}
            >
              Add Navigation Item
            </Button>

            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
              Styles
            </Typography>
            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                fullWidth
                label="Text Color"
                value={editedNavigation.styles.textColor}
                onChange={(e) =>
                  setEditedNavigation({
                    ...editedNavigation,
                    styles: {
                      ...editedNavigation.styles,
                      textColor: e.target.value,
                    },
                  })
                }
              />
              <TextField
                fullWidth
                label="Active Color"
                value={editedNavigation.styles.activeColor}
                onChange={(e) =>
                  setEditedNavigation({
                    ...editedNavigation,
                    styles: {
                      ...editedNavigation.styles,
                      activeColor: e.target.value,
                    },
                  })
                }
              />
              <TextField
                fullWidth
                label="Background Color"
                value={editedNavigation.styles.backgroundColor}
                onChange={(e) =>
                  setEditedNavigation({
                    ...editedNavigation,
                    styles: {
                      ...editedNavigation.styles,
                      backgroundColor: e.target.value,
                    },
                  })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNavEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleNavEditSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
