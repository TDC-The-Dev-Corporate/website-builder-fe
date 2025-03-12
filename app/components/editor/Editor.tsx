import React, { useState } from "react";

import {
  Box,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Tab,
  Tabs,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { Smartphone, Tablet, Monitor } from "lucide-react";

import Navigation from "./Navigation";
import SectionEditor from "./SectionEditor";
import SectionEditDialog from "./SectionEditDialog";
import NavigationEditDialog from "./NavigationEditDialog";

interface EditorProps {
  template: TemplateLayout;
  onSave: (layout: TemplateLayout) => void;
}

type PreviewMode = "mobile" | "tablet" | "desktop";
type EditMode = "sections" | "navigation";

export default function Editor({ template, onSave }: EditorProps) {
  const [layout, setLayout] = useState<TemplateLayout>(template);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [editMode, setEditMode] = useState<EditMode>("sections");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [navEditDialogOpen, setNavEditDialogOpen] = useState(false);
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

  const handleDelete = (sectionId: string) => {
    setLayout({
      ...layout,
      sections: layout.sections.filter((section) => section.id !== sectionId),
    });
  };

  const handleEditClick = (section: Section) => {
    setCurrentSection(section);
    setEditDialogOpen(true);
  };

  const handleEditSave = (content: any) => {
    if (currentSection) {
      setLayout({
        ...layout,
        sections: layout.sections.map((section) =>
          section.id === currentSection.id ? { ...section, content } : section
        ),
      });
    }
  };

  const handleNavEditSave = (navigation: any) => {
    setLayout({
      ...layout,
      navigation,
    });
    setNavEditDialogOpen(false);
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
            onClick={() => setNavEditDialogOpen(true)}
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

      <Box sx={{ flex: 1, bgcolor: "grey.100", overflow: "auto" }}>
        <Box
          sx={{
            width:
              previewMode === "mobile"
                ? "375px"
                : previewMode === "tablet"
                ? "768px"
                : "100%",
            mx: "auto",
            transition: "all 0.3s",
          }}
        >
          {layout.navigation && (
            <Navigation
              navigation={layout.navigation}
              // drawerOpen={drawerOpen}
              // onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
            />
          )}

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
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SectionEditor
                            section={section}
                            dragHandleProps={provided.dragHandleProps}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                          />
                        </div>
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

      <SectionEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        section={currentSection}
        onSave={handleEditSave}
      />

      {layout.navigation && (
        <NavigationEditDialog
          open={navEditDialogOpen}
          onClose={() => setNavEditDialogOpen(false)}
          navigation={layout.navigation}
          onSave={handleNavEditSave}
        />
      )}
    </Box>
  );
}
