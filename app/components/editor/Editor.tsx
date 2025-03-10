"use client";

import { useState } from "react";
import { Template, TemplateLayout, Section } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Move, Trash, Smartphone, Tablet, Monitor } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Container, Box, Grid, CardMedia, CardContent } from "@mui/material";

interface EditorProps {
  template: Template;
  onSave: (layout: TemplateLayout) => void;
}

type PreviewMode = "mobile" | "tablet" | "desktop";

export default function Editor({ template, onSave }: EditorProps) {
  const [layout, setLayout] = useState<TemplateLayout>(template.layout);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [isEditing, setIsEditing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTextEdit = (sectionId: string, field: string, value: string) => {
    setLayout((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: { ...section.content, [field]: value },
            }
          : section
      ),
    }));
  };

  const handleDelete = (sectionId: string) => {
    setLayout((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sections = Array.from(layout.sections);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    setLayout((prev) => ({
      ...prev,
      sections,
    }));
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-4xl";
    }
  };

  const renderNavigation = () => {
    if (!layout.navigation) return null;

    if (layout.navigation.type === "navbar") {
      return (
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: layout.navigation.styles.backgroundColor,
            boxShadow: 1,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Navbar
            </Typography>
            <div className="flex space-x-4">
              {layout.navigation.items.map((item) => (
                <Typography
                  key={item.href}
                  component="a"
                  href={item.href}
                  sx={{
                    color: layout.navigation?.styles.textColor,
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    "&:hover": {
                      borderBottomColor: layout.navigation?.styles.activeColor,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </div>
          </Toolbar>
        </AppBar>
      );
    }

    if (layout.navigation.type === "drawer") {
      return (
        <>
          <IconButton
            sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <List
              sx={{
                width: 300,
                backgroundColor: layout.navigation.styles.backgroundColor,
                height: "100%",
              }}
            >
              {layout.navigation.items.map((item) => (
                <ListItemButton
                  key={item.href}
                  component="a"
                  href={item.href}
                  sx={{
                    color: layout.navigation?.styles.textColor,
                    "&:hover": {
                      backgroundColor: layout.navigation?.styles.activeColor,
                    },
                  }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {item.label}
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        </>
      );
    }

    return null;
  };

  const renderSectionContent = (section: Section) => {
    switch (section.type) {
      case "hero":
        return (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: section.styles.textColor }}
            >
              {section.content.heading}
            </Typography>
            <Typography
              variant="h5"
              mt={2}
              sx={{ color: section.styles.textColor }}
            >
              {section.content.subheading}
            </Typography>
          </Box>
        );

      case "about":
        return (
          <Container sx={{ py: 8 }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
              {section.content.heading}
            </Typography>
            <Typography variant="body1" whiteSpace="pre-line">
              {section.content.description}
            </Typography>
          </Container>
        );

      case "projects":
        return (
          <Container sx={{ py: 8 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={4}
              textAlign="center"
            >
              {section.content.heading}
            </Typography>
            <Grid container spacing={4}>
              {section.content.projects?.map((project: any, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", p: 2 },
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Tools
        </Typography>
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Preview Mode
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant={previewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </Box>
        </Box>
      </Drawer>

      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div
          className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}
        >
          {renderNavigation()}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {layout.sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          className="mb-6 relative group"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Box
                            className="controls"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              opacity: 0,
                              transition: "opacity 0.3s",
                              display: "flex",
                              gap: 1,
                              zIndex: 10,
                            }}
                          >
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Section</DialogTitle>
                                </DialogHeader>
                                <Box
                                  sx={{
                                    py: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                  }}
                                >
                                  {Object.entries(section.content).map(
                                    ([key, value]) => {
                                      if (key === "projects") return null;
                                      return (
                                        <div key={key}>
                                          <label className="text-sm font-medium mb-1 block">
                                            {key.charAt(0).toUpperCase() +
                                              key.slice(1)}
                                          </label>
                                          {typeof value === "string" &&
                                          value.length > 50 ? (
                                            <Textarea
                                              value={value}
                                              onChange={(e) =>
                                                handleTextEdit(
                                                  section.id,
                                                  key,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          ) : (
                                            <Input
                                              value={value}
                                              onChange={(e) =>
                                                handleTextEdit(
                                                  section.id,
                                                  key,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </Box>
                              </DialogContent>
                            </Dialog>
                            <div {...provided.dragHandleProps}>
                              <Button variant="outline" size="sm">
                                <Move className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(section.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </Box>
                          <div className={section.styles.backgroundColor}>
                            {renderSectionContent(section)}
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        -
      </div>
    </Box>
  );
}
