/**
 * Custom link component definition for GrapesJS
 */

/**
 * Defines a custom link component for the GrapesJS editor
 * @param editor - The GrapesJS editor instance 
 * @param createLinkEditor - The function to create a link editor UI
 */
export const defineLinkComponent = (editor, createLinkEditor) => {
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
        // Don't set default content - preserve existing text
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
          
          // Only set default content if there's absolutely no content or text
          // This preserves existing link text when page loads/refreshes
          if (!this.components().length && (!this.view || !this.view.el || !this.view.el.textContent?.trim())) {
            // Only add default content if the element has no text content at all
            const elementText = this.view?.el?.textContent?.trim() || '';
            if (!elementText) {
              this.append({
                type: 'text',
                content: 'Link'
              });
            }
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
        
          // Create sophisticated inline link editor
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
            
            // If it's an anchor link (starts with #), use as-is
            // If it contains a protocol (like https://), use as-is
            // Otherwise, use the value exactly as entered (no automatic prefixes)
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
            createLinkEditor(e, this.el, this.model, editor);
          } catch (fallbackError) {
            console.error('Fallback link editor also failed:', fallbackError);
          }
        }
      }
    }
  });
};

/**
 * Sets up event listeners for link-related events in the editor
 * @param editor - The GrapesJS editor instance 
 * @param createLinkEditor - The function to create a link editor UI
 */
export const setupLinkEventHandlers = (editor, createLinkEditor) => {
  // Wait for the canvas to be ready before setting up event handlers
  const setupHandlers = () => {
    const canvasBody = editor.Canvas.getBody();
    
    if (!canvasBody) {
      console.warn('Canvas body not ready, retrying in 100ms...');
      setTimeout(setupHandlers, 100);
      return;
    }

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
        createLinkEditor(event, linkEl, linkComp, editor);
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
            createLinkEditor(e, linkEl, currentMatch || null, editor);
          });
        }
      }
    });
    
    // Set up a component:add event listener to ensure all links are handled correctly
    editor.on('component:add', (model) => {
      if (model.get('tagName') === 'a' && !model.getAttributes()['data-file-link']) {
       
        
        // Ensure the component is recognized as a link type
        if (model.get('type') !== 'link') {
         
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
          }, 100);
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
    };
    
    // Make sure the default component doesn't process links
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
  };
  
  // Call setupHandlers to initialize when canvas is ready
  setupHandlers();
};
