/**
 * GrapesJS Editor Configuration
 * Contains all editor settings, plugins, and configuration options
 */

/**
 * Rich Text Editor configuration
 */
export const richTextEditorConfig = {
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
};

/**
 * Asset Manager configuration
 */
export const createAssetManagerConfig = (uploadToCloudinary, editorRef) => ({
  storageType: "self" as const,
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
});

/**
 * Device Manager configuration
 */
export const deviceManagerConfig = {
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
};

/**
 * Panel Manager configuration
 */
export const panelsConfig = {
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
};

/**
 * Layer Manager configuration
 */
export const layerManagerConfig = {
  appendTo: ".layers-container",
};

/**
 * Selector Manager configuration
 */
export const selectorManagerConfig = {
  appendTo: ".styles-container",
};
