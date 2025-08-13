/**
 * Link utility functions for the portfolio builder
 * Contains functions for creating link editors and processing links
 */

/**
 * Creates a UI for editing links in the editor
 * @param e - The event that triggered the editor
 * @param el - The DOM element of the link
 * @param model - The component model (if available)
 * @param editorRef - Reference to the GrapesJS editor instance
 */
export const createLinkEditor = (e, el, model, editorRef) => {
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
    // Otherwise, use the value exactly as entered (no automatic prefixes)
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

/**
 * Fixes all links in the document to ensure they have proper href values
 * @param editor - The GrapesJS editor instance
 */
export const fixAllLinks = (editor) => {
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
      
      console.log('Processing link:', { href, content });                
      
      // Ensure href is set on both the model and DOM
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

/**
 * Process links in a template to ensure they are editable
 * @param editor - The GrapesJS editor instance
 * @param createLinkEditor - The function to create link editors
 */
export const processTemplateLinks = (editor, createLinkEditor) => {
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
          createLinkEditor(e, domLink, linkComp, editor);
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
