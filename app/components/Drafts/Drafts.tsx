"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import { Eye, Edit2, Trash2 } from "lucide-react";

import MotionBox from "@/app/components/animations/MotionBox";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import ConfirmationModal from "../modals/ConfirmationModal";

import {
  deleteDraft,
  getAllPortfolios,
  resetCache,
} from "@/lib/redux/slices/portfolioSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function Drafts() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [templates, setTemplates] = useState([]);
  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [draftId, setDraftId] = useState("");

  const executedRef = useRef(false);
  useEffect(() => {
    const fetchDrafts = async () => {
      if (executedRef.current) return;
      executedRef.current = true;

      const drafts = await dispatch(getAllPortfolios());
      if (drafts.payload) {
        setTemplates(drafts.payload);
      }
    };

    fetchDrafts();
  }, [dispatch]);

  const handleView = (template) => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      const sessionId = `template-${Date.now()}`;
      const formatedTemplate = {
        id: template.id,
        name: template.name,
        data: {
          pages: [{ component: template.htmlContent }],
        },
      };
      localStorage.setItem(sessionId, JSON.stringify(formatedTemplate));

      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Preview: ${template.name}</title>
            <style>
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
              .floating-edit-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                cursor: pointer;
                z-index: 1000;
                animation: pulse 2s infinite;
                transition: all 0.3s ease;
                border: none;
              }
              .floating-edit-btn:hover {
                animation: none;
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
              }
              .edit-icon {
                width: 24px;
                height: 24px;
              }
              .tooltip {
                position: absolute;
                right: 70px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 14px;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
              }
              .floating-edit-btn:hover .tooltip {
                opacity: 1;
              }
            </style>
          </head>
          <body>
            ${template.htmlContent}
            <button class="floating-edit-btn" title="Edit Template">
              <svg class="edit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span class="tooltip">Customize this template</span>
            </button>
            <script>
            document.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            
            const action = btn.dataset.action;
            const modalId = btn.dataset.modalId;
            
            if (action === 'open-drawer') {
              document.getElementById('drawer').classList.add('active');
              document.getElementById('overlay').classList.add('active');
            }
            
            if (action === 'close-drawer') {
              document.getElementById('drawer').classList.remove('active');
              document.getElementById('overlay').classList.remove('active');
            }
            
            if (action === 'open-modal' && modalId) {
              document.getElementById(modalId).classList.add('active');
              document.getElementById('overlay').classList.add('active');
            }
            
            if (action === 'close-modal' && modalId) {
              document.getElementById(modalId).classList.remove('active');
              document.getElementById('overlay').classList.remove('active');
            }
          });

              document.querySelector('.floating-edit-btn').addEventListener('click', () => {
                let messageSent = false;
                
                // Try postMessage first
                if (window.opener && !window.opener.closed) {
                  try {
                    window.opener.postMessage({
                      type: 'EDIT_TEMPLATE',
                      sessionId: '${sessionId}'
                    }, '*');
                    messageSent = true;
                    
                    // Close the preview after a short delay
                    setTimeout(() => window.close(), 300);
                  } catch (e) {
                    console.log('postMessage failed');
                  }
                }
                
                // Only use fallback if postMessage didn't work
                if (!messageSent) {
                  window.location.href = \`${window.location.origin}/AIWebsiteBuilders/template-selector?sessionId=${sessionId}\`;
                }
              });
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleEdit = (template) => {
    const formatedTemplate = {
      id: template.id,
      name: template.name,
      data: {
        pages: [{ component: template.htmlContent }],
      },
    };
    localStorage.setItem("selectedTemplate", JSON.stringify(formatedTemplate));
    router.push("/AIWebsiteBuilders/template-selector");
  };

  const handleDelete = (templateId) => {
    setDraftId(templateId);
    setSaveConfirmationOpen(true);
  };

  const handleSaveConfirm = async (draftId: string) => {
    await dispatch(resetCache());
    setSaveConfirmationOpen(false);

    try {
      const response = await dispatch(deleteDraft(draftId));

      if (response.type !== "portfolio/delete/fulfilled") {
        throw new Error("Failed to delete draft");
      }

      setTemplates((prevTemplates) =>
        prevTemplates.filter((t) => t.id !== draftId)
      );
    } catch (err) {
      console.error("Error saving portfolio:", err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", mb: 2, fontWeight: 700 }}
        >
          My Templates & Drafts
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: 600,
            mx: "auto",
            px: { xs: 2, sm: 0 },
          }}
        >
          View and manage templates and drafts you've created for your trade
          business
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {templates.length > 0 &&
          templates.map((template, index) => (
            <Grid item xs={12} sm={6} lg={4} key={template.id}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <GlassMorphism
                  blur={10}
                  opacity={0.1}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 240,
                      overflow: "hidden",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    {template.published ? (
                      <Chip
                        label="Published"
                        color="success"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          zIndex: 1,
                          fontWeight: 600,
                        }}
                      />
                    ) : (
                      <Tooltip title="Delete draft">
                        <IconButton
                          onClick={() => handleDelete(template.id)}
                          sx={{
                            position: "absolute",
                            right: 8,
                            zIndex: 1,
                            color: "#ef4444",
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "50%",
                            padding: "6px",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <iframe
                      srcDoc={template.htmlContent}
                      style={{
                        width: "200%",
                        height: "480px",
                        border: "none",
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                        pointerEvents: "none",
                      }}
                      title={template.name}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      px: 0,
                      pt: 2,
                      pb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "white", mb: 1, fontWeight: 600 }}
                      >
                        {template.name}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ px: 0, pt: 2, gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(template)}
                      startIcon={<Eye size={18} />}
                      sx={{
                        flex: 1,
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(template)}
                      startIcon={<Edit2 size={18} />}
                      sx={{
                        flex: 1,
                        background:
                          "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                        },
                      }}
                    >
                      {template.published ? "Update" : "Customize"}
                    </Button>
                  </CardActions>
                </GlassMorphism>
              </MotionBox>
            </Grid>
          ))}
      </Grid>
      <ConfirmationModal
        open={saveConfirmationOpen}
        onClose={() => setSaveConfirmationOpen(false)}
        title="Save Portfolio"
        message="Are you sure you want to delete this draft?"
        draftId={draftId}
        confirmText="Delete Draft"
        cancelText="Cancel"
        onConfirm={handleSaveConfirm}
        severity="warning"
      />
    </Box>
  );
}
