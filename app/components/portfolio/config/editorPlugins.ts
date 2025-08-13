/**
 * GrapesJS Editor Plugins
 * Contains all custom plugins and component definitions for the editor
 */

// Import template components - adjust path as needed
// import { tableComponent, iconifyComponent, accordionComponent } from '../../../templates/components';

/**
 * File Link Component Plugin
 */
export const fileLinkPlugin = (editor) => {
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
};

/**
 * Video Component Plugin
 */
export const videoComponentPlugin = (editor) => {
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
};

/**
 * Template Selector Plugin
 */
export const templateSelectorPlugin = (selectedTemplate, loadSelectedTemplate) => (editor) => {
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
  });
};

/**
 * All editor plugins array
 */
export const createEditorPlugins = (
  selectedTemplate, 
  loadSelectedTemplate, 
  setShowContentGenerator,
  tutorialActive,
  tutorialSteps,
  currentStep,
  addTooltips,
  tableComponent,
  iconifyComponent,
  accordionComponent
) => [
  fileLinkPlugin,
  videoComponentPlugin,
  tableComponent?.init({
    block: { category: "Extra", label: "Table" },
  }),
  iconifyComponent?.init({
    block: { category: "Icons", label: "Icon" },
  }),
  accordionComponent?.init({
    block: { category: "Components", label: "Accordion" },
    blockGroup: { category: "Components" },
  }),
  templateSelectorPlugin(selectedTemplate, loadSelectedTemplate),
  // Main editor setup plugin
  (editor) => {
    editor.onReady(() => {
      editor.on("component:selected", () => {
        if (tutorialActive) {
          const current = tutorialSteps[currentStep];
          const element = document.querySelector(current.selector);
          if (element) {
            element.classList.add("tutorial-highlight");
          }
        }
      });

      // Add custom blocks
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
  }
];
