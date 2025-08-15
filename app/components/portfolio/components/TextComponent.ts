/**
 * Text Component Handler
 * Contains functions for creating text editors and processing text elements
 */

/**
 * Creates a UI for editing text content in the editor
 * @param e - The event that triggered the editor
 * @param el - The DOM element of the text
 * @param model - The component model (if available)
 * @param editorRef - Reference to the GrapesJS editor instance
 */
export const createTextEditor = (e, el, model, editorRef) => {
  console.log('🔍 createTextEditor called with:', {
    elementTag: el.tagName,
    elementId: el.id,
    elementClass: el.className,
    elementText: el.textContent,
    elementHTML: el.outerHTML.substring(0, 200) + '...',
    modelType: model?.get('type'),
    modelTagName: model?.get('tagName')
  });
  
  // If we got a container with buttons, try to find the specific button that was clicked
  if (el.tagName === 'DIV' && el.querySelector('button') && e && e.target) {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
      console.log('🔄 Redirecting to clicked button instead of container');
      // Find the button's model in GrapesJS
      const buttonComponent = editorRef.current?.DomComponents.getWrapper().find('[data-gjs-type="button"]').filter(comp => comp.getEl() === clickedButton)[0];
      if (buttonComponent) {
        return createTextEditor(e, clickedButton, buttonComponent, editorRef);
      }
    }
  }
  
  console.log('Creating text editor for element:', el);
  
  // Ensure we don't proceed with an invalid element
  if (!el) {
    console.error('Invalid element provided to createTextEditor');
    return;
  }
  
  // Get document from the element
  const doc = el.ownerDocument;
  const editorId = "text-editor-box";
  
  // Remove any existing editor boxes
  let box = doc.querySelector(`#${editorId}`);
  if (box) box.remove();

  box = doc.createElement("div");
  box.id = editorId;
  
  // Apply modern styling to the box
  Object.assign(box.style, {
    position: "absolute",
    padding: "20px",
    background: "white",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 2px rgba(59, 130, 246, 0.3)",
    zIndex: "9999",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: "14px",
    width: "400px",
    minHeight: "300px",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: "0",
    transform: "translateY(10px)"
  });
  
  // Create a title for the editor
  const title = doc.createElement("h3");
  title.textContent = "Edit Text";
  Object.assign(title.style, {
    margin: "0 0 12px 0",
    padding: "0 0 8px 0",
    borderBottom: "1px solid #eaeaea",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333"
  });
  
  // Label for text content
  const textLabel = doc.createElement("label");
  textLabel.textContent = "Text Content:";
  textLabel.htmlFor = "text-content-input";
  Object.assign(textLabel.style, {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: "#555",
    fontSize: "13px"
  });
  
  // Textarea for text content
  const textArea = doc.createElement("textarea");
  textArea.id = "text-content-input";
  textArea.placeholder = "Enter your text content...";
  Object.assign(textArea.style, {
    width: "100%",
    height: "80px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "16px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: "1.5"
  });
  
  // Focus effect for textarea
  textArea.onfocus = () => {
    textArea.style.borderColor = "#3b82f6";
    textArea.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.15)";
  };
  
  textArea.onblur = () => {
    textArea.style.borderColor = "#ddd";
    textArea.style.boxShadow = "none";
  };
  
  // Get current text content - extract only direct text, not from child elements
  let currentText = "";
  if (model && model.get('content')) {
    currentText = model.get('content');
  } else {
    // For buttons and elements with complex structure, get only the direct text
    // This prevents concatenating text from multiple elements
    const childNodes = Array.from(el.childNodes) as ChildNode[];
    const textNodes = childNodes.filter(node => node.nodeType === Node.TEXT_NODE);
    if (textNodes.length > 0) {
      currentText = textNodes.map(node => node.textContent || '').join('').trim();
    } else if (el.textContent && el.children.length === 0) {
      // Only use textContent if there are no child elements
      currentText = el.textContent.trim();
    } else if (el.tagName === 'BUTTON' && el.textContent) {
      // For buttons, always try to get textContent as fallback
      currentText = el.textContent.trim();
    }
  }
  
  // Log for debugging
  console.log('📝 Extracted text for editing:', {
    elementTag: el.tagName,
    modelContent: model?.get('content'),
    extractedText: currentText,
    elementTextContent: el.textContent
  });
  
  textArea.value = currentText;

  // Check if we're editing a button
  const isButton = el.tagName === 'BUTTON';

  // Formatting buttons container - only show for non-button elements
  const formatContainer = doc.createElement("div");
  Object.assign(formatContainer.style, {
    marginBottom: "16px",
    padding: "8px",
    background: "#f8f9fa",
    borderRadius: "6px",
    display: isButton ? "none" : "flex", // Hide for buttons
    gap: "8px",
    flexWrap: "wrap"
  });

  // Helper function to create format buttons
  const createFormatButton = (text, action) => {
    const btn = doc.createElement("button");
    btn.textContent = text;
    btn.type = "button";
    Object.assign(btn.style, {
      padding: "4px 8px",
      background: "#e9ecef",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "500"
    });
    
    btn.onmouseover = () => {
      btn.style.background = "#dee2e6";
    };
    
    btn.onmouseout = () => {
      btn.style.background = "#e9ecef";
    };
    
    btn.onclick = action;
    return btn;
  };

  // Add formatting buttons
  const boldBtn = createFormatButton("Bold", () => {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    if (selectedText) {
      const newText = textArea.value.substring(0, start) + `<strong>${selectedText}</strong>` + textArea.value.substring(end);
      textArea.value = newText;
      textArea.focus();
    }
  });

  const italicBtn = createFormatButton("Italic", () => {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    if (selectedText) {
      const newText = textArea.value.substring(0, start) + `<em>${selectedText}</em>` + textArea.value.substring(end);
      textArea.value = newText;
      textArea.focus();
    }
  });

  const linkBtn = createFormatButton("Link", () => {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    
    if (!selectedText) {
      alert("Please select text first to create a link");
      return;
    }
    
    // Check if link input already exists
    const existingLinkInput = formatContainer.querySelector('.link-input-container');
    if (existingLinkInput) {
      existingLinkInput.remove();
      return;
    }
    
    // Create inline link input container
    const linkInputContainer = doc.createElement("div");
    linkInputContainer.className = "link-input-container";
    Object.assign(linkInputContainer.style, {
      width: "100%",
      marginTop: "8px",
      padding: "12px",
      background: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    });
    
    // URL input
    const urlInput = doc.createElement("input");
    urlInput.type = "text";
    urlInput.value = "https://";
    urlInput.placeholder = "Enter URL (e.g., https://example.com)";
    Object.assign(urlInput.style, {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginBottom: "8px",
      fontSize: "13px",
      boxSizing: "border-box"
    });
    
    // Button container
    const linkButtonContainer = doc.createElement("div");
    Object.assign(linkButtonContainer.style, {
      display: "flex",
      gap: "8px",
      justifyContent: "flex-end"
    });
    
    // Add button
    const addLinkBtn = doc.createElement("button");
    addLinkBtn.textContent = "Add";
    addLinkBtn.type = "button";
    Object.assign(addLinkBtn.style, {
      padding: "6px 12px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px"
    });
    
    // Cancel button
    const cancelLinkBtn = doc.createElement("button");
    cancelLinkBtn.textContent = "Cancel";
    cancelLinkBtn.type = "button";
    Object.assign(cancelLinkBtn.style, {
      padding: "6px 12px",
      background: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px"
    });
    
    // Event handlers
    const removeLinkInput = () => {
      linkInputContainer.remove();
    };
    
    addLinkBtn.onclick = () => {
      const url = urlInput.value.trim();
      if (url && selectedText) {
        const newText = textArea.value.substring(0, start) + `<a href="${url}">${selectedText}</a>` + textArea.value.substring(end);
        textArea.value = newText;
        textArea.focus();
        removeLinkInput();
      }
    };
    
    cancelLinkBtn.onclick = removeLinkInput;
    
    // Handle Enter and Escape keys
    urlInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        addLinkBtn.click();
      }
      if (e.key === 'Escape') {
        removeLinkInput();
      }
    };
    
    // Assemble link input
    linkButtonContainer.appendChild(cancelLinkBtn);
    linkButtonContainer.appendChild(addLinkBtn);
    linkInputContainer.appendChild(urlInput);
    linkInputContainer.appendChild(linkButtonContainer);
    
    // Add to format container
    formatContainer.appendChild(linkInputContainer);
    
    // Focus on input
    urlInput.focus();
    urlInput.select();
  });

  formatContainer.appendChild(boldBtn);
  formatContainer.appendChild(italicBtn);
  formatContainer.appendChild(linkBtn);

  // Helper text
  const helperText = doc.createElement("div");
  helperText.textContent = "";
  Object.assign(helperText.style, {
    fontSize: "11px",
    color: "#666",
    marginBottom: "16px",
    fontStyle: "italic"
  });

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
    padding: "10px 20px",
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
    padding: "10px 20px",
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
    const newText = textArea.value.trim();
    
    console.log('Saving text content:', newText);
    
    try {
      // Update the model if we have one
      if (model) {
        try {
          // Get the current tagName to preserve element type
          const tagName = model.get('tagName') || el.tagName.toLowerCase();
          
          console.log('Updating model for element:', tagName, 'with content:', newText);
          
          // 1. Update the content property directly
          model.set('content', newText);
          
          // 2. Handle all text elements the same way - clear components and just set content
          // This approach works for headings, let's try it for buttons too
          model.components().reset();
          
          console.log('Updated content for', tagName, ':', newText);
          
          // 3. Ensure the tagName and type are preserved
          model.set('tagName', tagName);
          
          // For buttons, also ensure the type is preserved
          if (tagName === 'button') {
            model.set('type', 'button');
            // Preserve any button-specific attributes
            const buttonAttrs = model.get('attributes') || {};
            if (el.getAttribute('type')) {
              buttonAttrs.type = el.getAttribute('type');
            }
            if (el.getAttribute('class')) {
              buttonAttrs.class = el.getAttribute('class');
            }
            model.set('attributes', buttonAttrs);
          }
          
          // 4. Force model update to ensure it's saved in the editor's state
          model.trigger('change:content');
          
          // 5. Store changes in the editor (crucial for template saving)
          if (editorRef.current) {
            editorRef.current.store();
          }
          
          console.log('Updated model successfully:', {
            content: model.get('content'),
            components: model.components().length,
            tagName: model.get('tagName'),
            modelToHTML: model.toHTML ? model.toHTML() : 'N/A',
            editorHTML: editorRef.current ? editorRef.current.getHtml() : 'N/A'
          });
        } catch (err) {
          console.log('Error updating model:', err);
        }
      }
      
      // Always update DOM directly for immediate visual feedback
      if (newText) {
        // For buttons, check if content contains HTML tags
        if (el.tagName === 'BUTTON') {
          // Check if the content contains HTML tags
          const hasHTMLTags = /<[^>]+>/.test(newText);
          
          if (hasHTMLTags) {
            // If it contains HTML, render it as HTML (like other elements)
            el.innerHTML = newText;
          } else {
            // If it's plain text, use text node to prevent HTML injection
            el.innerHTML = '';
            el.appendChild(el.ownerDocument.createTextNode(newText));
          }
        } else {
          // For other elements, replace innerHTML as before
          el.innerHTML = newText;
        }
      }
      
      // Fade out and remove the editor
      box.style.opacity = "0";
      box.style.transform = "translateY(10px)";
      setTimeout(() => box.remove(), 300);
    } catch (err) {
      console.error("Error updating text:", err);
      box.remove();
    }
  };

  // Keyboard shortcuts info
  const tooltip = doc.createElement("div");
  tooltip.textContent = "Tip: Press Ctrl+Enter to save, Esc to cancel";
  Object.assign(tooltip.style, {
    fontSize: "11px",
    color: "#777",
    marginTop: "4px",
    textAlign: "center",
    fontStyle: "italic"
  });
  
  // Keyboard shortcuts handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      saveBtn.click();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelBtn.click();
    }
  };
  
  textArea.addEventListener("keydown", handleKeyDown);
  
  // Build the editor UI
  box.appendChild(title);
  box.appendChild(textLabel);
  box.appendChild(textArea);
  box.appendChild(formatContainer);
  box.appendChild(helperText);
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
  const boxHeight = 400; // Estimated height
  
  let topPosition;
  if (rect.top > boxHeight) {
    // Position above the element
    topPosition = rect.top + scrollY - boxHeight - 10;
  } else {
    // Position below the element
    topPosition = rect.bottom + scrollY + 10;
  }
  
  // Center the box horizontally
  const leftPosition = rect.left + scrollX + (rect.width / 2) - 200;
  
  // Keep the box within the viewport
  const rightEdge = leftPosition + 400;
  const viewportWidth = window.innerWidth;
  
  if (rightEdge > viewportWidth) {
    box.style.left = `${viewportWidth - 410}px`;
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
  
  // Focus on textarea
  textArea.focus();
  textArea.select();
};

/**
 * Define custom text component type
 * @param editor - The GrapesJS editor instance
 * @param createTextEditor - The function to create text editors
 */
export const defineTextComponent = (editor, createTextEditor) => {
  console.log('Defining custom text component...');
  
  // Register custom text component types for all text elements
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].forEach(tagName => {
    editor.DomComponents.addType(`custom-${tagName}`, {
      isComponent: (el) => {
        const isMatch = el.tagName === tagName.toUpperCase();
        return isMatch;
      },
      model: {
        defaults: {
          tagName: tagName,
          editable: false, // Disable built-in editing
          droppable: tagName === 'div',
          traits: ['id', 'title']
        }
      },
      view: {
        events: {
          'dblclick': 'onDoubleClick',
          'click': 'onClick'
        } as any,
        
        onClick(e) {
          console.log(`🎯 Single click on ${tagName}:`, this.el);
          // Select the component
          editor.select(this.model);
        },
        
        onDoubleClick(e) {
          console.log(`🎯 Double click on ${tagName}, opening text editor:`, this.el);
          e.preventDefault();
          e.stopPropagation();
          
          // Open our custom text editor
          createTextEditor(e, this.el, this.model, editor);
        }
      }
    });
  });
};

/**
 * Set up event handlers for text interaction
 * @param editor - The GrapesJS editor instance
 * @param createTextEditor - The function to create text editors
 */
export const setupTextEventHandlers = (editor, createTextEditor) => {
  console.log('Setting up text event handlers...');
  
  editor.on('component:selected', (component) => {
    const tagName = component?.get?.('tagName')?.toLowerCase();
    const isTextElement = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].includes(tagName);
    
    if (isTextElement) {
      console.log('📝 Text component selected:', {
        component,
        tagName: component.get('tagName'),
        type: component.get('type'),
        editable: component.get('editable'),
        content: component.get('content')
      });
    }
  });
};
