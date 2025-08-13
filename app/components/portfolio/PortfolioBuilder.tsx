"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Wand2, Image as ImageIcon } from "lucide-react";

import { Box, Dialog, DialogContent, Fab, Tooltip } from "@mui/material";

import StudioEditor from "@grapesjs/studio-sdk/react";
import { tableComponent } from "@grapesjs/studio-sdk-plugins";
import { iconifyComponent } from "@grapesjs/studio-sdk-plugins";
import { accordionComponent } from "@grapesjs/studio-sdk-plugins";
// import { rteTinyMce } from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";

import { carpenterTemplate } from "@/lib/templates/carpenter";
import { hvacTemplate } from "@/lib/templates/hvac";
import { plumberTemplate } from "@/lib/templates/plumber";
import { electricianTemplate } from "@/lib/templates/electrician";
import { landscaperTemplate } from "@/lib/templates/landscaper";
import { painterTemplate } from "@/lib/templates/painter";

import DeploySuccessModal from "@/app/components/modals/DeploySuccessModal";
import ConfirmationModal from "@/app/components/modals/ConfirmationModal";
import FileUploadManager from "@/app/components/FileUploadManager";
import LoadingSpinner from "@/app/components/animations/LoadingSpinner";
import ContentGenerator from "@/app/components/AI/ContentGenerator";
import JsonLd from "../JsonLd";
import {
  addTooltips,
  grapesJsStyles,
  LoadingScreen,
  waitForElement,
} from "@/app/AIWebsiteBuilders/template-selector/helpingComponents";
import { EditorHeader } from "@/app/AIWebsiteBuilders/template-selector/EditorHeader";

import { useAppDispatch } from "@/lib/redux/hooks";
import {
  generatePortfolio,
  publishPortfolio,
  resetCache,
  updateExistingPortfolio,
} from "@/lib/redux/slices/portfolioSlice";
import { useToast } from "@/hooks/use-toast";

import { isDefaultTemplate, uploadToCloudinary } from "@/lib/utils";
import TutorialOverlay from "../tutorial/TutorialOverlay";
import { tutorialSteps } from "../tutorial/TutorialSteps";

export default function PortfolioBuilder() {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);

  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [publishConfirmationOpen, setPublishConfirmationOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [portfolioId, setPortfolioId] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [showContentGenerator, setShowContentGenerator] = useState(false);

  const [userTrade, setUserTrade] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Debug: Track publishConfirmationOpen state changes
  useEffect(() => {
    console.log("publishConfirmationOpen state changed:", publishConfirmationOpen);
  }, [publishConfirmationOpen]);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const template = localStorage.getItem("selectedTemplate");
    if (template) {
      const parsedTemplate = JSON.parse(template);
      setSelectedTemplate(parsedTemplate);

      // Set portfolio ID if it exists (for saved drafts/published portfolios)
      if (parsedTemplate.id && !isDefaultTemplate(parsedTemplate.id)) {
        setPortfolioId(parsedTemplate.id);
        console.log("Portfolio ID loaded from template:", parsedTemplate.id);
      }

      // Check if this portfolio is already published
      const publishedStatus = localStorage.getItem("published");
      const isTemplatePublished = parsedTemplate.isPublished || parsedTemplate.deployUrl || publishedStatus === "true";
      setIsPublished(isTemplatePublished);
      console.log("Portfolio published status:", isTemplatePublished);
    }

    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserTrade(userData.tradeSpecialization || "tradesman");
      setBusinessName(
        userData.businessName || userData.name || "your business"
      );
    }
  }, []);

  // Helper function to create link editor UI
  const createLinkEditor = (e, el, model) => {
    console.log('Creating link editor manually', { el, model });
    
    // Ensure we don't proceed with an invalid element
    if (!el) {
      console.error('Invalid element provided to createLinkEditor');
      return;
    }
    
    // Get document from the element
    const doc = el.ownerDocument;
    const editorId = "link-editor-box";
    
    // Remove any existing editor boxes
    let box = doc.querySelector(`#${editorId}`);
    if (box) box.remove();

    box = doc.createElement("div");
    box.id = editorId;
    
    // Apply modern styling to the box
    Object.assign(box.style, {
      position: "absolute",
      padding: "18px",
      background: "white",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 2px rgba(59, 130, 246, 0.3)",
      zIndex: "9999",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "14px",
      width: "300px",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      opacity: "0",
      transform: "translateY(10px)"
    });
    
    // Create a title for the editor
    const title = doc.createElement("h3");
    title.textContent = "Edit Link";
    Object.assign(title.style, {
      margin: "0 0 12px 0",
      padding: "0 0 8px 0",
      borderBottom: "1px solid #eaeaea",
      fontSize: "16px",
      fontWeight: "600",
      color: "#333"
    });
    
    // Label for URL field
    const urlLabel = doc.createElement("label");
    urlLabel.textContent = "Link URL:";
    urlLabel.htmlFor = "link-url-input";
    Object.assign(urlLabel.style, {
      display: "block",
      marginBottom: "4px",
      fontWeight: "500",
      color: "#555",
      fontSize: "13px"
    });
    
    // Add helper text for link types
    const helperText = doc.createElement("div");
    helperText.textContent = 
  "Use 'https://' for external sites, plain text for internal pages (e.g., about → /about), and '#' for page sections (e.g., #contact).";

    Object.assign(helperText.style, {
      fontSize: "11px",
      color: "#666",
      marginBottom: "6px",
      fontStyle: "italic"
    });
    
    // Input for URL
    const urlInput = doc.createElement("input");
    urlInput.id = "link-url-input";
    urlInput.type = "text";
    urlInput.placeholder = "Enter URL (e.g., example.com or #section)";
    Object.assign(urlInput.style, {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      marginBottom: "12px",
      fontSize: "14px",
      boxSizing: "border-box",
      outline: "none"
    });
    
    // Focus effect for inputs
    urlInput.onfocus = () => {
      urlInput.style.borderColor = "#3b82f6";
      urlInput.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.15)";
    };
    
    urlInput.onblur = () => {
      urlInput.style.borderColor = "#ddd";
      urlInput.style.boxShadow = "none";
    };
    
    // Get href from model's attributes or DOM element
    const hrefValue = (model ? model.getAttributes().href : el.getAttribute('href')) || "";
    // Use the actual href value without defaulting to https:// for anchor links
    urlInput.value = hrefValue;
    
    // Label for text field
    const textLabel = doc.createElement("label");
    textLabel.textContent = "Link Text:";
    textLabel.htmlFor = "link-text-input";
    Object.assign(textLabel.style, {
      display: "block",
      marginBottom: "4px",
      fontWeight: "500",
      color: "#555",
      fontSize: "13px"
    });
    
    // Input for link text
    const textInput = doc.createElement("input");
    textInput.id = "link-text-input";
    textInput.type = "text";
    textInput.placeholder = "Enter link text";
    Object.assign(textInput.style, {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      marginBottom: "12px",
      fontSize: "14px",
      boxSizing: "border-box",
      outline: "none"
    });
    
    // Focus effect for text input
    textInput.onfocus = () => {
      textInput.style.borderColor = "#3b82f6";
      textInput.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.15)";
    };
    
    textInput.onblur = () => {
      textInput.style.borderColor = "#ddd";
      textInput.style.boxShadow = "none";
    };
    
    // Get current text from element or component
    let currentText = "";
    if (model && model.components().length) {
      currentText = model.components().models.map(comp => {
        if (comp.get('tagName') === 'br') return '\n';
        return comp.get('content') || comp.get('components')?.models[0]?.get('content') || '';
      }).join('');
    }
    
    if (!currentText) {
      currentText = el.textContent || el.innerText || "";
    }
    
    textInput.value = currentText;

    // Container for buttons
    const buttonContainer = doc.createElement("div");
    Object.assign(buttonContainer.style, {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "16px",
      gap: "8px"
    });
    
    // Cancel button
    const cancelBtn = doc.createElement("button");
    cancelBtn.textContent = "Cancel";
    Object.assign(cancelBtn.style, {
      padding: "8px 16px",
      background: "#f5f5f5",
      color: "#444",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "14px",
      transition: "all 0.2s ease"
    });
    
    // Hover effects
    cancelBtn.onmouseover = () => {
      cancelBtn.style.background = "#eaeaea";
    };
    
    cancelBtn.onmouseout = () => {
      cancelBtn.style.background = "#f5f5f5";
    };
    
    cancelBtn.onclick = () => {
      box.style.opacity = "0";
      box.style.transform = "translateY(10px)";
      setTimeout(() => box.remove(), 300);
    };
    
    // Save button
    const saveBtn = doc.createElement("button");
    saveBtn.textContent = "Save";
    Object.assign(saveBtn.style, {
      padding: "8px 16px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "14px",
      boxShadow: "0 2px 4px rgba(59, 130, 246, 0.25)",
      transition: "all 0.2s ease"
    });

    // Hover effects
    saveBtn.onmouseover = () => {
      saveBtn.style.background = "#2563eb";
      saveBtn.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.3)";
    };
    
    saveBtn.onmouseout = () => {
      saveBtn.style.background = "#3b82f6";
      saveBtn.style.boxShadow = "0 2px 4px rgba(59, 130, 246, 0.25)";
    };

    // Save button handler
    saveBtn.onclick = () => {
      // Get values without defaulting to https:// for anchor links
      const newHref = urlInput.value.trim();
      const newText = textInput.value.trim() || 'Link';
      
      // If it's an anchor link (starts with #), use as-is
      // If it contains a protocol (like https://), use as-is
      // If it's any other value, just use it as-is (no prefix)
      // If it's empty, keep it empty
      const finalHref = newHref ? 
        (newHref.startsWith('#') ? newHref : 
         (newHref.includes('://') ? newHref : `${newHref}`)) 
        : '';
      
      console.log('Manual link editor saving:', { 
        href: finalHref, 
        text: newText,
        hasModel: !!model
      });
      
      try {
        // Update the model if we have one
        if (model) {
          try {
            // This is the key fix - update the model properly with multiple approaches
            // 1. Set the href property
            model.set('href', finalHref);
            
            // 2. Update attributes directly
            model.setAttributes({ href: finalHref });
            
            // 3. Update the content property
            model.set('content', newText);
            
            // 4. Reset components and add a fresh text component
            model.components().reset();
            model.append({
              type: 'text',
              content: newText
            });
            
            // 5. Force model update to ensure it's saved in the editor's state
            model.trigger('change:href');
            model.trigger('change:content');
            model.trigger('change:attributes');
            
            // 6. Store changes in the editor
            if (editorRef.current) {
              editorRef.current.store();
            }
            
            console.log('Updated model successfully:', {
              href: model.get('href'),
              attrHref: model.getAttributes().href,
              content: model.get('content')
            });
          } catch (err) {
            console.log('Error updating model:', err);
          }
        }
        
        // Always update DOM directly for immediate visual feedback
        el.setAttribute('href', finalHref);
        if (newText) {
          el.textContent = newText;
        }
        
        // Fade out and remove the editor
        box.style.opacity = "0";
        box.style.transform = "translateY(10px)";
        setTimeout(() => box.remove(), 300);
      } catch (err) {
        console.error("Error updating link:", err);
        box.remove();
      }
    };

    // Keyboard shortcuts info
    const tooltip = doc.createElement("div");
    tooltip.textContent = "Tip: Press Enter to save, Esc to cancel";
    Object.assign(tooltip.style, {
      fontSize: "11px",
      color: "#777",
      marginTop: "4px",
      textAlign: "center",
      fontStyle: "italic"
    });
    
    // Keyboard shortcuts handler
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        saveBtn.click();
      } else if (e.key === "Escape") {
        cancelBtn.click();
      }
    };
    
    urlInput.addEventListener("keydown", handleKeyDown);
    textInput.addEventListener("keydown", handleKeyDown);
    
    // Build the editor UI
    box.appendChild(title);
    box.appendChild(urlLabel);
    box.appendChild(helperText);
    box.appendChild(urlInput);
    box.appendChild(textLabel);
    box.appendChild(textInput);
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveBtn);
    box.appendChild(buttonContainer);
    box.appendChild(tooltip);
    
    // Add to document
    doc.body.appendChild(box);

    // Calculate position
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || doc.documentElement.scrollTop;
    const scrollX = window.scrollX || doc.documentElement.scrollLeft;
    
    // Position the box
    const windowHeight = window.innerHeight;
    const boxHeight = 300; // Estimated height
    
    let topPosition;
    if (rect.top > boxHeight) {
      // Position above the element
      topPosition = rect.top + scrollY - boxHeight - 10;
    } else {
      // Position below the element
      topPosition = rect.bottom + scrollY + 10;
    }
    
    // Center the box horizontally
    const leftPosition = rect.left + scrollX + (rect.width / 2) - 140;
    
    // Keep the box within the viewport
    const rightEdge = leftPosition + 280;
    const viewportWidth = window.innerWidth;
    
    if (rightEdge > viewportWidth) {
      box.style.left = `${viewportWidth - 290}px`;
    } else if (leftPosition < 10) {
      box.style.left = "10px";
    } else {
      box.style.left = `${leftPosition}px`;
    }
    
    box.style.top = `${topPosition}px`;
    
    // Animate the box appearing
    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
      
      // Add a highlight animation
      box.animate([
        { boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 4px rgba(59, 130, 246, 0.5)" },
        { boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 2px rgba(59, 130, 246, 0.3)" }
      ], { 
        duration: 600,
        easing: "ease-out"
      });
    }, 10);
    
    // Focus on URL input
    urlInput.focus();
  };
  
  const loadSelectedTemplate = (editor) => {
    if (selectedTemplate) {
      editor.DomComponents.clear();
      editor.CssComposer.clear();
      editor.setComponents(selectedTemplate.data.pages[0].component);
      
      // Simplified template link processing that doesn't create new components
      const processTemplateLinks = () => {
        console.log('Processing template links...');
        
        try {
          // Get all links in the template through DOM API
          const canvas = editor.Canvas.getBody();
          const domLinks = canvas.querySelectorAll('a:not([data-file-link])');
          console.log(`Found ${domLinks.length} links in DOM`);
          
          // Process each DOM link - just attach event handlers directly
          domLinks.forEach((domLink, index) => {
            try {
              console.log(`Processing DOM Link ${index + 1}:`, {
                href: domLink.getAttribute('href'),
                text: domLink.textContent
              });
              
              // Try to find the corresponding component
              const wrapper = editor.DomComponents.getWrapper();
              const components = wrapper.find('[tagName=a]');
              let linkComp = null;
              
              for (let i = 0; i < components.length; i++) {
                const comp = components[i];
                if (comp.view && comp.view.el === domLink) {
                  linkComp = comp;
                  break;
                }
              }
              
              // If we found a component, try to set its type to 'link'
              if (linkComp) {
                console.log(`Found component for DOM link ${index + 1}:`, {
                  type: linkComp.get('type'),
                  href: linkComp.getAttributes().href
                });
                
                // Only try to change type if not already a link
                if (linkComp.get('type') !== 'link') {
                  try {
                    console.log('Converting component to link type');
                    linkComp.set('type', 'link');
                  } catch (e) {
                    console.log('Could not convert to link type, applying handler directly');
                  }
                }
              } else {
                console.log(`No component found for DOM link ${index + 1}, applying handler directly`);
              }
              
              // Always add direct handler to DOM element regardless of component
              // This ensures links are editable even if component processing fails
              const dblclickHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Manual dblclick handler triggered for link');
                
                // Just use the direct link editor with DOM element
                // This bypasses any component issues
                createLinkEditor(e, domLink, linkComp);
              };
              
              // Remove any existing handler to prevent duplicates
              if (domLink._dblclickHandler) {
                domLink.removeEventListener('dblclick', domLink._dblclickHandler);
              }
              
              // Add our new handler
              domLink._dblclickHandler = dblclickHandler;
              domLink.addEventListener('dblclick', dblclickHandler);
              console.log('Added dblclick handler to link element');
            } catch (err) {
              console.error(`Error processing link ${index + 1}:`, err);
            }
          });
          
          // Count link types for debugging
          const allLinks = editor.DomComponents.getWrapper().find('a');
          const linkTypeCounts = {};
          allLinks.forEach(link => {
            const type = link.get('type');
            linkTypeCounts[type] = (linkTypeCounts[type] || 0) + 1;
          });
          console.log(`Link processing complete. Found ${allLinks.length} links in component tree`);
          console.log('Link type counts:', linkTypeCounts);
          
        } catch (err) {
          console.error('Error in processTemplateLinks:', err);
        }
      };
      
      // Process immediately and then again after a delay to catch any late-loading links
      setTimeout(processTemplateLinks, 500);
      setTimeout(processTemplateLinks, 2000); // Try again later in case some components load late
    }
  };

  const licenseKey = process.env.NEXT_PUBLIC_GRAPESJS_LICENSE_KEY;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup effect to ensure cache is cleared when component unmounts
  useEffect(() => {
    return () => {
      // Clear any pending operations or caches when component unmounts
      dispatch(resetCache());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!tutorialActive) return;

    const step = tutorialSteps[currentStep];

    const runStep = async () => {
      document.querySelectorAll(".tutorial-highlight").forEach((el) => {
        el.classList.remove("tutorial-highlight");
      });

      if (step.triggerBefore) {
        step.triggerBefore();
      }

      try {
        const element = await waitForElement(step.selector);

        element.classList.add("tutorial-highlight");
        setHighlightedElement(element);
      } catch (error) {
        console.warn(error);
      }
    };

    runStep();

    return () => {
      document.querySelectorAll(".tutorial-highlight").forEach((el) => {
        el.classList.remove("tutorial-highlight");
      });
    };
  }, [tutorialActive, currentStep]);

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setTutorialActive(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const startTutorial = () => {
    setTutorialActive(true);
    setCurrentStep(0);
  };

  const getFullHtml = () => {
    if (!editorRef.current) return "";
    const editor = editorRef.current;
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${editor.getCss()}</style>
          <script>
            // Event Delegation System
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
            
            // Close modals and drawers when clicking on overlay
            document.getElementById('overlay')?.addEventListener('click', function() {
              document.getElementById('drawer')?.classList.remove('active');
              
              // Close all modals
              const modals = document.querySelectorAll('.modal');
              modals.forEach(modal => {
                modal.classList.remove('active');
              });
              
              this.classList.remove('active');
            });
            
            // Prevent clicks inside modals from closing them
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
              modal.addEventListener('click', function(e) {
                e.stopPropagation();
              });
            });
            
            // Handle form submissions
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submission is simulated in this template. In a real website, this would submit data to a server.');
                this.reset();
              });
            });
          </script>
        </head>
        <body>
          ${editor.getHtml()}
        </body>
        </html>
      `;
  };

  const handleSaveConfirm = async (draftName) => {
    setSaveConfirmationOpen(false);
    setIsSaving(true);

    try {
      // Fix all links before saving to ensure href values are properly updated
      if (editorRef.current) {
        console.log("Ensuring all links are properly updated before saving...");
        // Get all link components
        const links = editorRef.current.DomComponents.getWrapper().find('a');
        console.log(`Found ${links.length} links to check before saving`);
        
        // Process each link to ensure href is correctly set
        links.forEach((link, index) => {
          try {
            const href = link.get('href') || link.getAttributes().href || '';
            console.log(`Pre-save check link ${index + 1}:`, { href });
            
            // Set href on both model and attributes to ensure it's saved
            link.set('href', href);
            link.setAttributes({ href });
            
            // Update DOM element directly
            if (link.view && link.view.el) {
              link.view.el.setAttribute('href', href);
            }
          } catch (err) {
            console.error("Error fixing link before save:", err);
          }
        });
        
        // Store changes
        editorRef.current.store();
      }
      
      const fullHtml = getFullHtml();
      if (!fullHtml) {
        console.error("Failed to get HTML content");
        toast({
          title: "Error",
          description: "Failed to generate HTML content. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("HTML generated, length:", fullHtml.length);

      console.log("Clearing cache...");
      await dispatch(resetCache());

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found in localStorage");
        toast({
          title: "Error",
          description: "User session not found. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      console.log("User found:", user.id);

      const data = {
        userId: user.id,
        htmlContent: fullHtml,
        name: isDefaultTemplate(selectedTemplate.id)
          ? draftName
          : selectedTemplate.name || "",
      };

      console.log("Save data prepared:", data);

      let response;

      if (isDefaultTemplate(selectedTemplate.id)) {
        console.log("=== CREATING NEW PORTFOLIO ===");
        response = await dispatch(generatePortfolio(data));
      } else {
        console.log("=== UPDATING EXISTING PORTFOLIO ===");
        console.log("Portfolio ID:", selectedTemplate.id);
        response = await dispatch(
          updateExistingPortfolio({ id: selectedTemplate.id, data })
        );
      }

      console.log("Redux response:", response);
      console.log("Response type:", response.type);
      console.log("Response meta:", response.meta);

      // Check for both fulfilled and rejected cases
      if (generatePortfolio.fulfilled.match(response) || updateExistingPortfolio.fulfilled.match(response)) {
        console.log("=== SAVE SUCCESSFUL ===");
        console.log("Response payload:", response.payload);

        setPortfolioId(response.payload.id);

        // Update localStorage with the new portfolio info
        const updatedTemplate = {
          ...selectedTemplate,
          id: response.payload.id,
          name: data.name
        };
        console.log("Updated template:", updatedTemplate);

        localStorage.setItem("selectedTemplate", JSON.stringify(updatedTemplate));
        setSelectedTemplate(updatedTemplate);

        setIsSaving(false);

        // Just show toast notification, no modal
        toast({
          title: "Success",
          description: "Portfolio saved successfully!",
        });
      } else {
        // Handle error case
        console.error("=== SAVE FAILED ===");
        console.error("Response:", response);
        const errorMessage = response.payload || "Failed to save portfolio";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        setIsSaving(false);
      }
    } catch (error: any) {
      console.error("=== SAVE ERROR ===", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred while saving the portfolio",
        variant: "destructive",
      });
    } finally {
      // Always reset saving state in finally block to prevent stuck state
      console.log("=== RESETTING SAVING STATE ===");
      setIsSaving(false);
    }
  };

  const handlePublishConfirm = async () => {
    console.log("🚀 handlePublishConfirm called!");
    setPublishConfirmationOpen(false);
    setIsPublishing(true);

    try {
      // Fix all links before publishing to ensure href values are properly updated
      if (editorRef.current) {
        console.log("Ensuring all links are properly updated before publishing...");
        // Get all link components
        const links = editorRef.current.DomComponents.getWrapper().find('a');
        console.log(`Found ${links.length} links to check before publishing`);
        
        // Process each link to ensure href is correctly set
        links.forEach((link, index) => {
          try {
            const href = link.get('href') || link.getAttributes().href || '';
            console.log(`Pre-publish check link ${index + 1}:`, { href });
            
            // Set href on both model and attributes to ensure it's saved
            link.set('href', href);
            link.setAttributes({ href });
            
            // Update DOM element directly
            if (link.view && link.view.el) {
              link.view.el.setAttribute('href', href);
            }
          } catch (err) {
            console.error("Error fixing link before publish:", err);
          }
        });
        
        // Store changes
        editorRef.current.store();
      }
      
      console.log("=== PUBLISH STARTED ===");
      console.log("Portfolio ID:", portfolioId);
      console.log("Selected Template:", selectedTemplate);

      if (!portfolioId) {
        console.error("No portfolio ID found");
        throw new Error("Portfolio must be saved before publishing");
      }

      const response = await dispatch(publishPortfolio(portfolioId));
      console.log("Publish response:", response);

      if (publishPortfolio.fulfilled.match(response)) {
        console.log("=== PUBLISH SUCCESSFUL ===");
        // Update published status
        localStorage.setItem("published", "true");
        setIsPublished(true);

        // Update the selected template with published status
        const updatedTemplate = {
          ...selectedTemplate,
          isPublished: true,
          published: true,
          deployUrl: `https://tradesbuilderpro.com/AIWebsiteBuilders/portfolio/${response.payload.user.username}`
        };
        localStorage.setItem("selectedTemplate", JSON.stringify(updatedTemplate));
        setSelectedTemplate(updatedTemplate);

        setDeployUrl(
          `https://tradesbuilderpro.com/AIWebsiteBuilders/portfolio/${response.payload.user.username}`
        );
        setShowDeployModal(true);

        toast({
          title: "Success",
          description: "Portfolio published successfully!",
        });
      } else {
        // Handle error case
        console.error("=== PUBLISH FAILED ===");
        console.error("Response:", response);
        throw new Error("Failed to publish portfolio");
      }
    } catch (error: any) {
      console.error("Publish error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to publish portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Expose handlePublishConfirm on window for direct testing
  useEffect(() => {
    (window as any).handlePublishConfirm = handlePublishConfirm;
    return () => {
      delete (window as any).handlePublishConfirm;
    };
  }, [handlePublishConfirm]);

  const handleModalClose = () => {
    console.log("handleModalClose called");
    console.log("publishConfirmationOpen before close:", publishConfirmationOpen);
    setSaveConfirmationOpen(false);
    setPublishConfirmationOpen(false);
    setIsSaving(false); // Reset saving state when modal is closed
    setIsPublishing(false); // Reset publishing state when modal is closed
    console.log("Modal closed, saving and publishing state reset"); // Debug log
  };

  // Add a function to reset all states - useful for debugging
  const resetAllStates = () => {
    setIsSaving(false);
    setIsPublishing(false);
    setSaveConfirmationOpen(false);
    setPublishConfirmationOpen(false);
    console.log("All states reset");
  };

  // Reset states when component mounts or selectedTemplate changes
  useEffect(() => {
    resetAllStates();
  }, [selectedTemplate?.id]);

  const handleInsertContent = (content: string, type: string) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selected = editor.getSelected();

    if (selected) {
      if (type === "heading") {
        selected.components(`<h2>${content}</h2>`);
      } else if (type === "list") {
        selected.components(content);
      } else {
        selected.components(`<div>${content}</div>`);
      }
    } else {
      // Add to canvas if nothing is selected
      editor.addComponents(`<div>${content}</div>`);
    }

    editor.trigger("change:canvasOffset");
  };

  const editorHelpers = {
    clearSelection: (editor) => {
      const selected = editor.getSelected();
      if (selected) {
        selected.remove();
      }
    },

    addImageComponent: (editor, asset) => {
      editor.addComponents(
        `<img src="${asset.src}" alt="${asset.name}" style="max-width:100%;height:auto;"/>`
      );
    },

    addVideoComponent: (editor, asset) => {
      editor.addComponents({
        type: "video",
        src: asset.src,
        style: "max-width: 100%; height: auto;",
        attributes: {
          controls: true,
        },
      });
    },

    addFileLinkComponent: (editor, asset) => {
      editor.addComponents(`
        <a href="${asset.src}" 
           download="${asset.name}" 
           data-file-link="true"
           style="display: block; padding: 12px 16px; margin: 10px 0; ">
          ${asset.name}
        </a>
      `);
    },
  };

  const builderSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TradesBuilder Website Builder",
    applicationCategory: "WebsiteBuilder",
    description: "Create and customize your trade business website",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Drag-and-drop interface",
      "Professional templates",
      "Mobile responsive",
      "Custom styling",
      "Image and video upload",
      "Real-time preview",
      "AI content generation",
      "AI image generation",
    ],
  };
  return (
    <>
      <JsonLd data={builderSchema} />
      <Head>
        <title>Trade Portfolio Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isLoading ? (
        <LoadingScreen>
          <LoadingSpinner />
        </LoadingScreen>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            pointerEvents: tutorialActive ? "none" : "auto",
          }}
        >
          <EditorHeader
            selectedTemplate={selectedTemplate}
            setSaveConfirmationOpen={setSaveConfirmationOpen}
            setPublishConfirmationOpen={setPublishConfirmationOpen}
            isSaving={isSaving}
            isPublishing={isPublishing}
            onStartTutorial={startTutorial}
            isPublished={isPublished}
            portfolioId={portfolioId}
          />

          <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <StudioEditor
              onEditor={(editor) => {
                editorRef.current = editor;
                
                // Make sure our link component is registered BEFORE loading the template
                // This ensures links in the template will be processed correctly
                console.log('Registering link component before loading template...');
                
                // Function to fix all links in the document
                const fixAllLinks = () => {
                  console.log('Fixing all links in the document');
                  
                  // Get all link components
                  const links = editor.DomComponents.getWrapper().find('a');
                  console.log(`Found ${links.length} links to process`);
                  
                  // Update each link to ensure content and href are properly set
                  links.forEach(link => {
          try {
            // Get the current values
            const attrs = link.getAttributes();
            const href = attrs.href || '';
            const content = link.get('content') || link.getEl().textContent || 'Link';
            
            console.log('Processing link:', { href, content });                      // Ensure href is set on both the model and DOM
                      link.set('href', href);
                      link.setAttributes({ href });
                      link.getEl().setAttribute('href', href);
                      
                      // Set content safely by clearing and adding a new text component
                      if (link.components().length) {
                        link.components().reset([{
                          type: 'text',
                          content: content
                        }]);
                      } else {
                        link.append({
                          type: 'text',
                          content: content
                        });
                      }
                      
                      // Also update the textContent directly
                      link.getEl().textContent = content;
                      
                      console.log('Updated link:', { 
                        href: link.get('href'), 
                        attrHref: link.getAttributes().href,
                        domHref: link.getEl().getAttribute('href'),
                        content 
                      });
                    } catch (err) {
                      console.error('Error updating link:', err);
                    }
                  });
                };
                
                // Process all existing links immediately when the editor loads
                // This ensures all links are properly initialized from the start
                setTimeout(() => {
                  fixAllLinks();
                  editor.store(); // Store the changes
                }, 500);
                
                // Add event listener for storage to ensure links are properly saved
                editor.on('storage:start', fixAllLinks);
                
                // Also process links before publishing
                editor.on('component:selected', (component) => {
                  if (component && component.get('type') === 'link') {
                    console.log('Link selected, ensuring href is set:', component.get('href'));
                    const href = component.get('href') || component.getAttributes().href || '';
                    component.set('href', href);
                    component.setAttributes({ href });
                    component.getEl().setAttribute('href', href);
                  }
                });
                
                // First make sure the default component doesn't process links
                const origIsComponent = editor.DomComponents.getType('default').model.isComponent;
                editor.DomComponents.addType('default', {
                  isComponent: (el) => {
                    if (el.tagName === 'A' && !el.getAttribute('data-file-link')) {
                      // Don't let default component handle links
                      return false;
                    }
                    return origIsComponent(el);
                  }
                });
                
                loadSelectedTemplate(editor);

                editor.DomComponents.addType("modal", {
                  isComponent: (el) => el.classList?.contains("modal"),
                  model: {
                    defaults: {
                      name: "Modal",
                      traits: [
                        "id",
                        {
                          type: "checkbox",
                          label: "Visible in editor",
                          name: "visibleInEditor",
                          changeProp: true,
                        },
                      ],
                      visibleInEditor: false,
                      script: function () {
                        const modal = this;
                        const closeBtns = modal.querySelectorAll(
                          '[data-bs-dismiss="modal"], .btn-close'
                        );

                        closeBtns.forEach((btn) => {
                          btn.addEventListener("click", () => {
                            modal.classList.remove("show");
                            modal.style.display = "none";
                          });
                        });

                        document
                          .querySelectorAll('[data-bs-toggle="modal"]')
                          .forEach((trigger) => {
                            const target =
                              trigger.getAttribute("data-bs-target");
                            if (target === `#${modal.id}`) {
                              trigger.addEventListener("click", () => {
                                modal.classList.add("show");
                                modal.style.display = "block";
                              });
                            }
                          });
                      },
                    },

                    init() {
                      this.on("change:visibleInEditor", () => {
                        const el = this.view?.el;
                        if (el) {
                          const val = this.get("visibleInEditor");
                          el.classList.toggle("show", val);

                          if (val) {
                            // Make modal visible and properly positioned for editing
                            el.style.display = "block";
                            el.style.opacity = "1";
                            el.style.visibility = "visible";
                            el.style.position = "fixed";
                            el.style.top = "50%";
                            el.style.left = "50%";
                            el.style.transform = "translate(-50%, -50%)";
                            el.style.zIndex = "1050";
                            el.style.minHeight = "300px";
                            el.style.minWidth = "400px";
                            el.style.maxWidth = "90%";
                            el.style.maxHeight = "90%";
                            el.style.border = "2px dashed #3b82f6";
                            el.style.borderRadius = "8px";
                            el.style.backgroundColor = "white";
                            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                            el.style.overflow = "auto";

                            // Add a backdrop
                            const backdrop = document.createElement("div");
                            backdrop.className = "gjs-modal-backdrop";
                            backdrop.style.cssText = `
                              position: fixed;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 100%;
                              background: rgba(0,0,0,0.5);
                              z-index: 1040;
                              pointer-events: none;
                            `;

                            // Remove existing backdrop if any
                            const existingBackdrop = document.querySelector(
                              ".gjs-modal-backdrop"
                            );
                            if (existingBackdrop) {
                              existingBackdrop.remove();
                            }

                            // Add backdrop to canvas
                            const canvas = editor.Canvas.getBody();
                            canvas.appendChild(backdrop);
                          } else {
                            // Reset to normal state
                            el.style.display = "none";
                            el.style.position = "";
                            el.style.top = "";
                            el.style.left = "";
                            el.style.transform = "";
                            el.style.zIndex = "";
                            el.style.minHeight = "";
                            el.style.minWidth = "";
                            el.style.maxWidth = "";
                            el.style.maxHeight = "";
                            el.style.border = "";
                            el.style.borderRadius = "";
                            el.style.backgroundColor = "";
                            el.style.boxShadow = "";
                            el.style.overflow = "";

                            // Remove backdrop
                            const backdrop = document.querySelector(
                              ".gjs-modal-backdrop"
                            );
                            if (backdrop) {
                              backdrop.remove();
                            }
                          }
                        }
                      });
                    },
                  },
                });

                  editor.on("load", () => {
                    const panelManager = editor.Panels;

                    const devicesElement = document.createElement("div");
                    devicesElement.className = "panel__devices";

                    panelManager
                      .getPanel("views-container")
                      ?.set("appendContent", devicesElement);

                    const canvasBody = editor.Canvas.getBody();

                    canvasBody.addEventListener("dragover", (event) => {
                      event.preventDefault();
                    });

                    canvasBody.addEventListener("drop", (event) => {
                      event.preventDefault();
                    });
                    
                    // Add a direct dblclick handler on the canvas to ensure all links are editable
                    canvasBody.addEventListener("dblclick", (event) => {
                      const el = event.target as HTMLElement;
                      const linkEl = el.tagName === 'A' ? el : el.closest('a');
                      
                      if (linkEl && !linkEl.getAttribute('data-file-link')) {
                        console.log('Direct canvas dblclick on link element');
                        event.preventDefault();
                        event.stopPropagation();
                        
                        // Find the component for this element if it exists
                        // But don't rely on it - we'll use direct DOM approach
                        const wrapper = editor.DomComponents.getWrapper();
                        const allLinks = wrapper.find('a');
                        const matchingComponents = allLinks.filter(comp => comp.view && comp.view.el === linkEl);
                        
                        const linkComp = matchingComponents.length > 0 ? matchingComponents[0] : null;
                        
                        // Always use the direct link editor with the DOM element
                        // This ensures it works regardless of component state
                        console.log('Using direct link editor for consistent behavior');
                        createLinkEditor(event, linkEl, linkComp);
                      }
                    });
                    
                    // Add a global click listener for links with direct double-click handling
                    canvasBody.addEventListener("click", (event) => {
                      const el = event.target as HTMLElement;
                      const linkEl = el.tagName === 'A' ? el : el.closest('a');
                      
                      if (linkEl && !linkEl.getAttribute('data-file-link')) {
                        console.log('Link clicked:', {
                          element: linkEl,
                          href: linkEl.getAttribute('href'),
                          hasFileLink: linkEl.getAttribute('data-file-link'),
                        });
                        
                        // Try to find the component model for this element
                        const wrapper = editor.DomComponents.getWrapper();
                        const allLinks = wrapper.find('a');
                        const matchingComponents = allLinks.filter(comp => comp.view && comp.view.el === linkEl);
                        
                        console.log('Component found:', {
                          found: matchingComponents.length > 0,
                          type: matchingComponents.length > 0 ? matchingComponents[0].get('type') : 'none',
                          components: matchingComponents
                        });
                        
                        // Always ensure the element has a dblclick handler
                        // This is the most reliable approach
                        if (!(linkEl as any).__hasFixedDblClick) {
                          (linkEl as any).__hasFixedDblClick = true;
                          linkEl.addEventListener('dblclick', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Direct dblclick event on link');
                            
                            // Find the component but don't rely on it
                            const currentLinks = wrapper.find('a');
                            const currentMatch = currentLinks.find(comp => comp.view && comp.view.el === linkEl);
                            
                            // Always use direct DOM approach
                            createLinkEditor(e, linkEl, currentMatch || null);
                          });
                        }
                      }
                    });
                    
                    // Set up a component:add event listener to ensure all links are handled correctly
                    editor.on('component:add', (model) => {
                      if (model.get('tagName') === 'a' && !model.getAttributes()['data-file-link']) {
                        console.log('New link component added:', {
                          type: model.get('type'),
                          href: model.getAttributes().href
                        });
                        
                        // Ensure the component is recognized as a link type
                        if (model.get('type') !== 'link') {
                          console.log('Converting component to link type');
                          model.set('type', 'link');
                          // Initialize href property
                          const href = model.getAttributes().href || '';
                          model.set('href', href);
                          
                          // Force a view update
                          setTimeout(() => {
                            const view = model.getView();
                            if (view) {
                              console.log('Re-rendering view for new link');
                              view.render();
                            }
                          }, 10000);
                        }
                      }
                    });
                    
                    // Also watch for component:update to catch any links that might change
                    editor.on('component:update', (model) => {
                      if (model.get('tagName') === 'a' && !model.getAttributes()['data-file-link'] && model.get('type') !== 'link') {
                        console.log('Link component updated but not of type link:', {
                          type: model.get('type'),
                          href: model.getAttributes().href
                        });
                        model.set('type', 'link');
                      }
                    });
                    
                    // Override the default handling of links to ensure our custom component is used
                    const originalAddType = editor.DomComponents.addType;
                    editor.DomComponents.addType = function(type, methods) {
                      // When we detect the 'default' type being added, make sure links are handled by our custom component
                      if (type === 'default') {
                        const origIsComponent = methods.isComponent;
                        if (origIsComponent) {
                          methods.isComponent = function(el) {
                            // If it's an anchor tag but not a file link, don't let the default component claim it
                            if (el.tagName === 'A' && !el.getAttribute('data-file-link')) {
                              return false;
                            }
                            return origIsComponent(el);
                          };
                        }
                      }
                      return originalAddType.call(this, type, methods);
                    };                  // Configure component types for text editing
                  editor.DomComponents.addType("button", {
                    isComponent: (el) => el.tagName === "BUTTON",
                    model: {
                      defaults: {
                        tagName: "button",
                        editable: true,
                        droppable: false,
                        traits: [
                          "id",
                          "title",
                          { type: "text", name: "text", label: "Button Text" }
                        ],
                      },
                    },
                  });

                 // 1. Define the custom 'link' component type
editor.DomComponents.addType("link", {
  // Simple isComponent function to identify links
  isComponent: el => {
    // This function identifies if an element should be treated as a link component
    if (el.tagName === "A") {
      // Exclude file links which have their own component type
      return !el.getAttribute("data-file-link");
    }
    return false;
  },
  // Note: Priority would be useful but we'll use a different approach since it's not supported in the type
  model: {
    defaults: {
      tagName: "a",
      editable: true,
      draggable: true,
      droppable: false, // Prevent dropping elements inside links
      selectable: true,
      highlightable: true,
      attributes: {
        href: '',
        target: '',
        style: 'color: #3b82f6; text-decoration: underline;'
      },
      content: 'Link',
      traits: [
        { 
          type: "text", 
          name: "href", 
          label: "URL", 
          placeholder: "example.com or #section",
          changeProp: true,
          default: ''
        },
        {
          type: "select",
          name: "target",
          label: "Target",
          options: [
            { id: '', value: '', name: 'Same tab' },
            { id: '_blank', value: '_blank', name: 'New tab' }
          ],
          changeProp: true
        }
      ]
    },
    
    init() {
      try {
        // Initialize href property from attributes
        const attrs = this.getAttributes();
        // Don't add any default value if href is empty
        const href = attrs.href !== undefined ? attrs.href : '';
        
        // Make sure href is properly set on both model and attributes
        this.set('href', href); // Set as property
        this.setAttributes({ href }); // Make sure attribute is set
        
        // Set default content if there's none
        if (!this.components().length) {
          // We need to use a different approach than just this.components('Link')
          // since that can cause the "Invalid array length" error
          this.append({
            type: 'text',
            content: 'Link'
          });
        }
        
        // Listen for href trait changes
        this.on('change:href', this.updateHref);
        this.on('change:attributes:href', this.updateHrefFromAttrs);
        this.on('change:content', this.updateContent);
        
        // Make sure we update the DOM element href when initialized
        // This ensures existing links always have their href properly set
        if (this.view && this.view.el) {
          this.view.el.setAttribute('href', href);
          console.log('Updated DOM element href:', href);
        }
        
        // Log initialization success
        console.log('Link component initialized successfully with href:', href);
      } catch (error) {
        console.error('Error initializing link component:', error);
      }
    },
    
    updateHref() {
      // When href property changes, update the attributes
      const href = this.get('href') || '';
      this.setAttributes({ href });
    },
    
    updateHrefFromAttrs() {
      // When href attribute changes, update the property
      const attrs = this.getAttributes();
      const href = attrs.href || '';
      this.set('href', href);
    },
    
    updateContent() {
      // This method ensures the content is properly maintained
      // when modified through traits or API
      const content = this.get('content');
      if (content && typeof content === 'string') {
        // Safely update content without causing array length errors
        if (this.components().length) {
          // Reset and create a new text component
          this.components().reset([{
            type: 'text',
            content: content
          }]);
        } else {
          // Add new component
          this.append({
            type: 'text',
            content: content
          });
        }
      }
    }
  },
  
  view: {
    events: {
      'dblclick': 'onDblClick'
    } as any,
    
    // Add an initialize method to ensure events are bound
    initialize() {
      try {
        // Let the parent method handle the basic setup
        const parentInit = (this.constructor as any).__super__.initialize;
        if (parentInit) {
          parentInit.apply(this, arguments);
        }
        
        // Add double-click handler for link editing
        const el = this.el;
        if (el && !el.__hasDblClickHandler) {
          el.__hasDblClickHandler = true;
          el.addEventListener('dblclick', this.onDblClick.bind(this));
        }
      } catch (error) {
        console.error('Error in link view initialize:', error);
      }
    },
    
    // Simplified remove method
    remove() {
      // Call the parent remove method
      return (this.constructor as any).__super__.remove.apply(this, arguments);
    },
    
    onDblClick(e) {
      try {
        e.preventDefault();
        const model = this.model;
        
        // Debug: Log when a double click happens and component details
        console.log('Link double-clicked!', {
          type: model.get('type'),
          tagName: model.get('tagName'),
          href: model.getAttributes().href,
          content: model.get('content'),
          components: model.components().length,
          el: this.el
        });
      
        // Create link editor
        const doc = this.el.ownerDocument;
        const editorId = "link-editor-box";
      
      // Remove any existing editor boxes
      let box = doc.querySelector(`#${editorId}`);
      if (box) box.remove();

      box = doc.createElement("div");
      box.id = editorId;
      
      // Apply modern styling to the box with a more prominent appearance
      Object.assign(box.style, {
        position: "absolute",
        padding: "18px",
        background: "white",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 2px rgba(59, 130, 246, 0.3)",
        zIndex: "9999",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "14px",
        width: "300px",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: "0",
        transform: "translateY(10px)"
      });
      
      // Create a title for the editor
      const title = doc.createElement("h3");
      title.textContent = "Edit Link";
      Object.assign(title.style, {
        margin: "0 0 12px 0",
        padding: "0 0 8px 0",
        borderBottom: "1px solid #eaeaea",
        fontSize: "16px",
        fontWeight: "600",
        color: "#333"
      });
      
      // Label for URL field with modern styling
      const urlLabel = doc.createElement("label");
      urlLabel.textContent = "Link URL:";
      urlLabel.htmlFor = "link-url-input";
      Object.assign(urlLabel.style, {
        display: "block",
        marginBottom: "4px",
        fontWeight: "500",
        color: "#555",
        fontSize: "13px"
      });
      
      // Input for URL with improved styling
      const urlInput = doc.createElement("input");
      urlInput.id = "link-url-input";
      urlInput.type = "text";
      urlInput.placeholder = "Enter URL (e.g., example.com or #section)";
      Object.assign(urlInput.style, {
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "12px",
        fontSize: "14px",
        boxSizing: "border-box",
        outline: "none"
      });
      
      // Focus effect for inputs
      urlInput.onfocus = () => {
        urlInput.style.borderColor = "#3b82f6";
        urlInput.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.15)";
      };
      
      urlInput.onblur = () => {
        urlInput.style.borderColor = "#ddd";
        urlInput.style.boxShadow = "none";
      };
      
      // Get href from model's attributes without adding default https://
      urlInput.value = model.getAttributes().href || "";
      
      // Label for text field
      const textLabel = doc.createElement("label");
      textLabel.textContent = "Link Text:";
      textLabel.htmlFor = "link-text-input";
      Object.assign(textLabel.style, {
        display: "block",
        marginBottom: "4px",
        fontWeight: "500",
        color: "#555",
        fontSize: "13px"
      });
      
      // Input for link text with improved styling
      const textInput = doc.createElement("input");
      textInput.id = "link-text-input";
      textInput.type = "text";
      textInput.placeholder = "Enter link text";
      Object.assign(textInput.style, {
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "12px",
        fontSize: "14px",
        boxSizing: "border-box",
        outline: "none"
      });
      
      // Focus effect for text input
      textInput.onfocus = () => {
        textInput.style.borderColor = "#3b82f6";
        textInput.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.15)";
      };
      
      textInput.onblur = () => {
        textInput.style.borderColor = "#ddd";
        textInput.style.boxShadow = "none";
      };
      
      // Get current text from DOM element or component
      // Use component content first, then fallback to DOM content
      let currentText = "";
      if (model.components().length) {
        // For complex content, get the inner HTML
        currentText = model.components().models.map(comp => {
          if (comp.get('tagName') === 'br') return '\n';
          return comp.get('content') || comp.get('components')?.models[0]?.get('content') || '';
        }).join('');
      }
      
      if (!currentText && this.el) {
        currentText = this.el.textContent || this.el.innerText || "";
      }
      
      textInput.value = currentText;

      // Container for the buttons with modern styling
      const buttonContainer = doc.createElement("div");
      Object.assign(buttonContainer.style, {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "16px",
        gap: "8px"
      });
      
      // Cancel button with improved styling
      const cancelBtn = doc.createElement("button");
      cancelBtn.textContent = "Cancel";
      Object.assign(cancelBtn.style, {
        padding: "8px 16px",
        background: "#f5f5f5",
        color: "#444",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        transition: "all 0.2s ease"
      });
      
      // Hover effect for cancel button
      cancelBtn.onmouseover = () => {
        cancelBtn.style.background = "#eaeaea";
      };
      
      cancelBtn.onmouseout = () => {
        cancelBtn.style.background = "#f5f5f5";
      };
      
      cancelBtn.onclick = () => {
        box.style.opacity = "0";
        box.style.transform = "translateY(10px)";
        setTimeout(() => box.remove(), 300);
      };
      
      // Save button with improved styling
      const saveBtn = doc.createElement("button");
      saveBtn.textContent = "Save";
      Object.assign(saveBtn.style, {
        padding: "8px 16px",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.25)",
        transition: "all 0.2s ease"
      });

      // Hover effect for save button
      saveBtn.onmouseover = () => {
        saveBtn.style.background = "#2563eb";
        saveBtn.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.3)";
      };
      
      saveBtn.onmouseout = () => {
        saveBtn.style.background = "#3b82f6";
        saveBtn.style.boxShadow = "0 2px 4px rgba(59, 130, 246, 0.25)";
      };

      saveBtn.onclick = () => {
        // Get values without defaulting to https:// for anchor links
        const newHref = urlInput.value.trim();
        const newText = textInput.value.trim() || 'Link';
        const finalHref = newHref ? 
          (newHref.startsWith('#') ? newHref : 
           (newHref.includes('://') ? newHref : `${newHref}`)) 
          : '';
        
        try {
          console.log('Updating link with:', { href: finalHref, text: newText });
          
          // This is critical - we need to update the model's href in multiple ways to ensure it sticks
          // 1. Set the href property
          model.set('href', finalHref);
          
          // 2. Update attributes explicitly 
          model.setAttributes({ href: finalHref });
          
          // 3. Update the content property
          model.set('content', newText);
          
          // 4. Clear all existing components and add a fresh text component
          // This is the most reliable way to update content without array errors
          model.components().reset();
          model.append({
            type: 'text',
            content: newText
          });
          
          // 5. Also update DOM directly for immediate visual feedback
          this.el.setAttribute('href', finalHref);
          this.el.textContent = newText;
          
          // 6. Force model update to ensure it's saved in the editor's state
          model.trigger('change:href');
          model.trigger('change:content');
          model.trigger('change:attributes');
          
          // 7. Double check to make sure href is set
          setTimeout(() => {
            const currentHref = model.getAttributes().href;
            if (currentHref !== finalHref) {
              console.log('Href mismatch detected, fixing:', { expected: finalHref, actual: currentHref });
              model.setAttributes({ href: finalHref });
              this.el.setAttribute('href', finalHref);
            }
          }, 0);
          
          // Store the editor state to persist changes
          editor.store();
          
          console.log('Link updated successfully:', { 
            href: model.getAttributes().href,
            content: model.get('content'),
            textContent: this.el.textContent
          });
          
          // Add a nice fade-out effect with transform
          box.style.opacity = "0";
          box.style.transform = "translateY(10px)";
          setTimeout(() => box.remove(), 300);
        } catch (err) {
          console.error("Error updating link:", err);
          box.remove();
        }
      };

      // Add tooltip to show keyboard shortcut
      const tooltip = doc.createElement("div");
      tooltip.textContent = "Tip: Press Enter to save, Esc to cancel";
      Object.assign(tooltip.style, {
        fontSize: "11px",
        color: "#777",
        marginTop: "4px",
        textAlign: "center",
        fontStyle: "italic"
      });
      
      // Keyboard shortcuts
      const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          saveBtn.click();
        } else if (e.key === "Escape") {
          cancelBtn.click();
        }
      };
      
      urlInput.addEventListener("keydown", handleKeyDown);
      textInput.addEventListener("keydown", handleKeyDown);
      
      // Add everything to the box
      box.appendChild(title);
      box.appendChild(urlLabel);
      box.appendChild(urlInput);
      box.appendChild(textLabel);
      box.appendChild(textInput);
      buttonContainer.appendChild(cancelBtn);
      buttonContainer.appendChild(saveBtn);
      box.appendChild(buttonContainer);
      box.appendChild(tooltip);
      
      doc.body.appendChild(box);

      // Calculate position
      const rect = this.el.getBoundingClientRect();
      const scrollY = window.scrollY || doc.documentElement.scrollTop;
      const scrollX = window.scrollX || doc.documentElement.scrollLeft;
      
      // Position the box above the element if there's enough space, otherwise below
      const windowHeight = window.innerHeight;
      const boxHeight = 300; // Estimated height
      
      let topPosition;
      if (rect.top > boxHeight) {
        // Position above the element
        topPosition = rect.top + scrollY - boxHeight - 10;
      } else {
        // Position below the element
        topPosition = rect.bottom + scrollY + 10;
      }
      
      // Center the box horizontally relative to the element
      const leftPosition = rect.left + scrollX + (rect.width / 2) - 140;
      
      // Keep the box within the viewport
      const rightEdge = leftPosition + 280;
      const viewportWidth = window.innerWidth;
      
      if (rightEdge > viewportWidth) {
        box.style.left = `${viewportWidth - 290}px`;
      } else if (leftPosition < 10) {
        box.style.left = "10px";
      } else {
        box.style.left = `${leftPosition}px`;
      }
      
      box.style.top = `${topPosition}px`;
      
      // Animate the box appearing with a subtle pop effect
      setTimeout(() => {
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
        
        // Add a subtle highlight animation
        box.animate([
          { boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 4px rgba(59, 130, 246, 0.5)" },
          { boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 2px rgba(59, 130, 246, 0.3)" }
        ], { 
          duration: 600,
          easing: "ease-out"
        });
      }, 10);
      
      // Focus on URL input for immediate editing
      urlInput.focus();
      } catch (error) {
        console.error('Error in link editor:', error);
        // Use the fallback direct link editor if there's an error
        try {
          createLinkEditor(e, this.el, this.model);
        } catch (fallbackError) {
          console.error('Fallback link editor also failed:', fallbackError);
        }
      }
    }
  }
});








                  // Configure text elements to be editable
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].forEach(tagName => {
                    editor.DomComponents.addType(tagName, {
                      isComponent: (el) => el.tagName === tagName.toUpperCase(),
                      model: {
                        defaults: {
                          tagName: tagName,
                          editable: true,
                          droppable: tagName === 'div',
                          traits: ['id', 'title']
                        }
                      }
                    });
                  });
                });

                editor.on("canvas:dragdata", async (dataTransfer, result) => {
                  if (
                    dataTransfer &&
                    dataTransfer.files &&
                    dataTransfer.files.length
                  ) {
                    result.content = null;

                    const files = Array.from(dataTransfer.files) as File[];

                    const uploadedAssets = await uploadToCloudinary(files);

                    editorHelpers.clearSelection(editor);

                    uploadedAssets.forEach((asset) => {
                      if (asset.isImage) {
                        editorHelpers.addImageComponent(editor, asset);
                      } else if (asset.type?.startsWith("video")) {
                        editorHelpers.addVideoComponent?.(editor, asset);
                      } else {
                        editorHelpers.addFileLinkComponent(editor, asset);
                      }
                    });
                  }
                });
              }}
              options={{
                ...{
                  licenseKey: licenseKey,

                  // Configure default Rich Text Editor
                  richTextEditor: {
                    actions: [
                      'bold', 'italic', 'underline', 'strikethrough',
                      {
                        name: 'createLink',
                        icon: '<i class="fa fa-link"></i>',
                        attributes: { title: 'Add/Edit Link' },
                        result: (rte) => {
                          const selection = rte.selection();

                          // Check if we're already in a link
                          const range = rte.doc.getSelection().getRangeAt(0);
                          let linkElement = null;
                          let parentNode = range.startContainer;

                          // Find if we're inside a link
                          while (parentNode && parentNode.nodeType !== 9) { // 9 = DOCUMENT_NODE
                            if (parentNode.tagName === 'A') {
                              linkElement = parentNode;
                              break;
                            }
                            parentNode = parentNode.parentNode;
                          }

                          let currentUrl = '';
                          if (linkElement) {
                            currentUrl = linkElement.getAttribute('href') || '';
                          }

                          const url = prompt('Enter the URL:', currentUrl || '');

                          if (url !== null && url.trim()) {
                            if (linkElement) {
                              // Edit existing link
                              linkElement.setAttribute('href', url);
                            } else {
                              // Create new link
                              const selectedText = selection.toString();
                              if (selectedText && selectedText.trim()) {
                                rte.insertHTML(`<a href="${url}">${selectedText}</a>`);
                              } else {
                                rte.insertHTML(`<a href="${url}">${url}</a>`);
                              }
                            }
                          }
                        }
                      },
                      'fontSize', 'textColor', 'bgColor',
                      'alignLeft', 'alignCenter', 'alignRight'
                    ],
                    // Enable RTE globally
                    enable: true,
                    focusOnActivation: true,
                    selectOnActivation: true
                  },

                  assets: {
                    storageType: "self",
                    upload: true,
                    dropzone: false,
                    openAssetsOnDrop: false,
                    autoAdd: false,
                    onUpload: async ({ files }) => {
                      try {
                        const results = await uploadToCloudinary(files);
                        const editor = editorRef.current;

                        if (!editor) return results;

                        // ✅ Add to asset manager manually so they show up in modal
                        results.forEach((asset) => {
                          editor.AssetManager.add({
                            src: asset.src,
                            name: asset.name,
                            type: asset.isImage ? "image" : asset.type,
                          });
                        });

                        // Optionally, select the uploaded asset and insert it
                        // OR let the user select it manually via the modal

                        return results; // GrapesJS will now show these in the modal
                      } catch (error) {
                        console.error("Upload error:", error);
                        editorRef.current?.showNotification(
                          "Upload failed",
                          "error"
                        );
                        return [];
                      }
                    },
                  } as any,

                  plugins: [
                    (editor) => {
                      editor.DomComponents.addType("file-link", {
                        isComponent: (el) =>
                          el.tagName === "A" &&
                          el.getAttribute("data-file-link") === "true",
                        model: {
                          defaults: {
                            tagName: "a",
                            attributes: {
                              "data-file-link": "true",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              download: "",
                              style:
                                "display: block; padding: 12px 16px; margin: 10px 0; background-color: #f8f9fa; border-radius: 6px; color: #3b82f6; text-decoration: none; border-left: 4px solid #3b82f6;",
                            },
                            traits: [
                              {
                                type: "text",
                                name: "href",
                                label: "File URL",
                                changeProp: true,
                              },
                              {
                                type: "text",
                                name: "download",
                                label: "File name",
                                changeProp: true,
                              },
                              {
                                type: "text",
                                name: "style",
                                label: "Style",
                                changeProp: true,
                              },
                            ],
                          },
                        },
                        view: {
                          events: {
                            dblclick: "onActive",
                          } as any,
                        },
                      });
                    },
                    (editor) => {
                      editor.DomComponents.addType("video", {
                        isComponent: (el) => el.tagName === "VIDEO",
                        model: {
                          defaults: {
                            tagName: "video",
                            attributes: {
                              controls: true,
                              style: "max-width: 100%;",
                              preload: "auto",
                            },
                            traits: [
                              {
                                type: "text",
                                name: "src",
                                label: "Video URL",
                                placeholder:
                                  "example.com/video.mp4 or YouTube/Vimeo URL",
                                changeProp: true,
                              },
                              {
                                type: "select",
                                name: "provider",
                                label: "Video Provider",
                                options: [
                                  {
                                    id: "html5",
                                    value: "html5",
                                    name: "HTML5 Video",
                                  },
                                  {
                                    id: "youtube",
                                    value: "youtube",
                                    name: "YouTube",
                                  },
                                  {
                                    id: "vimeo",
                                    value: "vimeo",
                                    name: "Vimeo",
                                  },
                                ],
                                changeProp: true,
                              },
                              {
                                type: "text",
                                name: "videoId",
                                label: "Video ID",
                                placeholder: "Only for YouTube/Vimeo",
                              },
                            ],
                          },
                        },

                        view: {
                          events: {
                            dblclick: "onActive",
                          } as any,

                          onRender({ el }) {
                            const video = el as HTMLVideoElement;
                            if (!video.poster) {
                              video.poster =
                                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ddd"/><polygon points="40,30 70,50 40,70" fill="%23fff"/></svg>';
                            }
                          },

                          onTraitsChange() {
                            this.model.updateVideo();
                          },
                        },
                      });
                    },
                    tableComponent.init({
                      block: { category: "Extra", label: "Table" },
                    }),
                    iconifyComponent.init({
                      block: { category: "Icons", label: "Icon" },
                    }),
                    accordionComponent.init({
                      block: { category: "Components", label: "Accordion" },
                      blockGroup: { category: "Components" },
                    }),
                    (editor) => {
                      if (selectedTemplate) {
                        editor.runCommand("studio:layoutRemove", {
                          id: "template-selector",
                        });
                      }

                      editor.onReady(() => {
                        if (selectedTemplate) {
                          loadSelectedTemplate(editor);
                        } else {
                          editor.runCommand("studio:layoutToggle", {
                            id: "template-selector",
                            header: false,
                            placer: {
                              type: "dialog",
                              title: "Choose a Template",
                              size: "l",
                            },
                            layout: {
                              type: "panelTemplates",
                              content: { itemsPerRow: 3 },
                              onSelect: ({ loadTemplate, template }) => {
                                loadTemplate(template);
                                editor.runCommand("studio:layoutRemove", {
                                  id: "template-selector",
                                });
                              },
                            },
                          });
                        }

                        editor.on("component:selected", () => {
                          if (tutorialActive) {
                            const current = tutorialSteps[currentStep];
                            const element = document.querySelector(
                              current.selector
                            );
                            if (element) {
                              element.classList.add("tutorial-highlight");
                            }
                          }
                        });

                        editor.BlockManager.add("service-card", {
                          label: "Service Card",
                          content: `<div class="service-card" style="padding: 20px; border-radius: 8px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                          <h3 style="margin-top: 0;">Service Name</h3>
                          <p>Service description goes here.</p>
                          <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Learn More</button>
                        </div>`,
                          category: "Trade Components",
                        });

                        editor.BlockManager.add("testimonial", {
                          label: "Testimonial",
                          content: `<div class="testimonial" style="padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3b82f6;">
                          <p style="font-style: italic;">"Great work! Highly recommend this tradesman."</p>
                          <p style="font-weight: bold;">- Happy Customer</p>
                        </div>`,
                          category: "Trade Components",
                        });
                        
                        // Add Link block with plain HTML structure to avoid component creation issues
                        editor.BlockManager.add("link-block", {
                          label: "Link",
                          content: `<a href="" style="color: #3b82f6; text-decoration: underline; display: inline-block; padding: 5px 0;">Link Text</a>`,
                          category: "Basic",
                        });

                        // Add AI Content Generation button to toolbar
                        editor.Panels.addButton("options", {
                          id: "generate-content",
                          className: "fa fa-magic",
                          command: "show-content-generator",
                          attributes: { title: "Generate Content with AI" },
                        });

                        editor.Commands.add("show-content-generator", {
                          run: () => setShowContentGenerator(true),
                        });

                        // Add AI Image Generation button to toolbar
                        editor.Panels.addButton("options", {
                          id: "generate-image",
                          className: "fa fa-image",
                          command: "show-image-generator",
                          attributes: { title: "Generate Images with AI" },
                        });
                      });

                      editor.onReady(() => {
                        addTooltips(editor.getComponents());
                      });
                    },
                  ],
                  layerManager: {
                    appendTo: ".layers-container",
                  },
                  selectorManager: {
                    appendTo: ".styles-container",
                  },
                  deviceManager: {
                    devices: [
                      {
                        id: "desktop",
                        name: "Desktop",
                        width: "",
                      },
                      {
                        id: "tablet",
                        name: "Tablet",
                        width: "768px",
                        widthMedia: "992px",
                      },
                      {
                        id: "mobile",
                        name: "Mobile",
                        width: "320px",
                        widthMedia: "576px",
                      },
                    ],
                  },
                  panels: {
                    defaults: [
                      {
                        id: "layers",
                        el: ".panel__right",
                        buttons: [
                          {
                            id: "layer-visibility",
                            className: "fa fa-eye",
                            command: "sw-visibility",
                            attributes: { title: "Toggle visibility" },
                          },
                        ],
                      },
                      {
                        id: "panel-switcher",
                        el: ".panel__switcher",
                        buttons: [
                          {
                            id: "show-layers",
                            className: "fa fa-bars",
                            command: "show-layers",
                            attributes: { title: "Layers" },
                          },
                          {
                            id: "show-style",
                            className: "fa fa-paint-brush",
                            command: "show-styles",
                            attributes: { title: "Styles" },
                          },
                          {
                            id: "show-traits",
                            className: "fa fa-cog",
                            command: "show-traits",
                            attributes: { title: "Settings" },
                          },
                        ],
                      },
                    ],
                  },
                  templates: {
                    onLoad: async () => [
                      carpenterTemplate,
                      hvacTemplate,
                      plumberTemplate,
                      electricianTemplate,
                      landscaperTemplate,
                      painterTemplate,
                    ],
                  },
                },
              }}
            />
            <FileUploadManager editor={editorRef.current} />

            {/* AI Floating Action Buttons */}
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                zIndex: 1000,
              }}
            >
              <Tooltip title="Generate Content with AI" placement="left">
                <Fab
                  color="primary"
                  onClick={() => setShowContentGenerator(true)}
                  data-tutorial="ai-generator"
                  sx={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                    },
                  }}
                >
                  <Wand2 size={24} />
                </Fab>
              </Tooltip>
            </Box>
          </Box>
        </div>
      )}

      <Dialog
        open={showContentGenerator}
        onClose={() => setShowContentGenerator(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <ContentGenerator
            onInsertContent={handleInsertContent}
            onClose={() => setShowContentGenerator(false)}
            userTrade={userTrade}
            businessName={businessName}
          />
        </DialogContent>
      </Dialog>

      {tutorialActive && (
        <TutorialOverlay
          steps={tutorialSteps}
          currentStep={currentStep}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onClose={() => setTutorialActive(false)}
        />
      )}

      {/* AI Image Generator Dialog */}

      <ConfirmationModal
        open={saveConfirmationOpen}
        onClose={handleModalClose}
        title="Save Portfolio"
        message="Do you want to save your changes?"
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSaveConfirm}
        severity="info"
        draftId={
          localStorage.getItem("selectedTemplate")
            ? JSON.parse(localStorage.getItem("selectedTemplate")).id
            : ""
        }
      />

      <ConfirmationModal
        open={publishConfirmationOpen}
        onClose={handleModalClose}
        title="Publish Portfolio"
        message="Do you want to publish your portfolio and make it live?"
        confirmText="Publish"
        cancelText="Cancel"
        onConfirm={handlePublishConfirm}
        severity="warning"
      />

      <DeploySuccessModal
        open={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        deployUrl={deployUrl}
      />

      <style jsx global>
        {grapesJsStyles}
      </style>
    </>
  );
}
