/**
 * Editor helper utilities for asset management and component operations
 * Contains reusable functions for common editor operations
 */

/**
 * Editor helper functions for component and asset management
 */
export const editorHelpers = {
  /**
   * Clear the currently selected component
   * @param editor - The GrapesJS editor instance
   */
  clearSelection: (editor) => {
    const selected = editor.getSelected();
    if (selected) {
      selected.remove();
    }
  },

  /**
   * Add an image component to the editor
   * @param editor - The GrapesJS editor instance
   * @param asset - Asset object with src and name properties
   */
  addImageComponent: (editor, asset) => {
    editor.addComponents(
      `<img src="${asset.src}" alt="${asset.name}" style="max-width:100%;height:auto;"/>`
    );
  },

  /**
   * Add a video component to the editor
   * @param editor - The GrapesJS editor instance
   * @param asset - Asset object with src and name properties
   */
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

  /**
   * Add a file download link component to the editor
   * @param editor - The GrapesJS editor instance
   * @param asset - Asset object with src and name properties
   */
  addFileLinkComponent: (editor, asset) => {
    editor.addComponents(`
      <a href="${asset.src}" 
         download="${asset.name}" 
         data-file-link="true"
         style="display: block; padding: 12px 16px; margin: 10px 0;">
        ${asset.name}
      </a>
    `);
  },

  /**
   * Get all components of a specific type
   * @param editor - The GrapesJS editor instance
   * @param componentType - Type of component to find
   * @returns Array of components
   */
  getComponentsByType: (editor, componentType) => {
    const wrapper = editor.DomComponents.getWrapper();
    return wrapper.find(componentType);
  },

  /**
   * Count components by type
   * @param editor - The GrapesJS editor instance
   * @param componentType - Type of component to count
   * @returns Number of components
   */
  countComponentsByType: (editor, componentType) => {
    return editorHelpers.getComponentsByType(editor, componentType).length;
  },

  /**
   * Insert content at current selection or append to canvas
   * @param editor - The GrapesJS editor instance
   * @param content - HTML content to insert
   * @param type - Type of content for formatting
   */
  insertContent: (editor, content, type = 'div') => {
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
  },

  /**
   * Generate component statistics
   * @param editor - The GrapesJS editor instance
   * @returns Object with component statistics
   */
  getComponentStats: (editor) => {
    const wrapper = editor.DomComponents.getWrapper();
    const allComponents = wrapper.find('*');
    
    const stats = {
      total: allComponents.length,
      images: editorHelpers.countComponentsByType(editor, 'img'),
      links: editorHelpers.countComponentsByType(editor, 'a'),
      videos: editorHelpers.countComponentsByType(editor, 'video'),
      buttons: editorHelpers.countComponentsByType(editor, 'button'),
      headings: editorHelpers.countComponentsByType(editor, 'h1,h2,h3,h4,h5,h6'),
      paragraphs: editorHelpers.countComponentsByType(editor, 'p'),
    };

    return stats;
  }
};
