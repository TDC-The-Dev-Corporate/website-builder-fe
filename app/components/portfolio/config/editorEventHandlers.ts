/**
 * Editor Event Handlers
 * Contains all event handling logic for the GrapesJS editor
 */

import { editorHelpers } from '../utils/editorHelpers';

/**
 * Set up canvas drag and drop event handlers
 */
export const setupCanvasDragHandlers = (editor, uploadToCloudinary) => {
  const canvasBody = editor.Canvas.getBody();

  canvasBody.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  canvasBody.addEventListener("drop", (event) => {
    event.preventDefault();
  });
};

/**
 * Set up canvas drag data event handler
 */
export const setupCanvasDragDataHandler = (editor, uploadToCloudinary) => {
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
};

/**
 * Set up component type definitions for text editing
 */
export const setupComponentTypes = (editor) => {
  // Configure component types for text editing
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
};

/**
 * Set up modal component type
 */
export const setupModalComponent = (editor) => {
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
};

/**
 * Set up panel manager on editor load
 */
export const setupPanelManager = (editor) => {
  const panelManager = editor.Panels;

  const devicesElement = document.createElement("div");
  devicesElement.className = "panel__devices";

  panelManager
    .getPanel("views-container")
    ?.set("appendContent", devicesElement);
};
