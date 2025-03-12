import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { Move, Trash } from "lucide-react";

interface NavigationEditDialogProps {
  open: boolean;
  onClose: () => void;
  navigation: Navigation;
  onSave: (navigation: Navigation) => void;
}

export default function NavigationEditDialog({
  open,
  onClose,
  navigation,
  onSave,
}: NavigationEditDialogProps) {
  const [editedNavigation, setEditedNavigation] =
    useState<Navigation>(navigation);

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

  const handleSave = () => {
    onSave(editedNavigation);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
