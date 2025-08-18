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

      // Add custom blocks with improved designs
      editor.BlockManager.add("service-card", {
        label: "🛠️ Service Card",
        content: `<div class="service-card" style="
          padding: 30px; 
          border-radius: 12px; 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); 
          box-shadow: 0 4px 20px rgba(0,0,0,0.08); 
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            width: 60px; 
            height: 60px; 
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
            border-radius: 50%; 
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
          ">🔧</div>
          <h3 style="
            margin: 0 0 15px 0; 
            color: #1e293b; 
            font-size: 1.5rem; 
            font-weight: 600;
            line-height: 1.3;
          ">Premium Service</h3>
          <p style="
            color: #64748b; 
            line-height: 1.6; 
            margin-bottom: 25px;
            font-size: 1rem;
          ">Professional service with quality guarantee. Fast, reliable, and affordable solutions for your needs.</p>
          <div style="
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 25px;
            padding: 15px;
            background: #f1f5f9;
            border-radius: 8px;
          ">
            <span style="color: #475569; font-weight: 500;">Starting at:</span>
            <span style="color: #059669; font-weight: 700; font-size: 1.25rem;">$99</span>
          </div>
          <button style="
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
            color: white; 
            border: none; 
            padding: 12px 30px; 
            border-radius: 8px; 
            cursor: pointer; 
            font-weight: 600;
            font-size: 1rem;
            width: 100%;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 15px rgba(59, 130, 246, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 10px rgba(59, 130, 246, 0.3)'">Get Quote</button>
        </div>`,
        category: "Trade Components",
      });

      editor.BlockManager.add("testimonial", {
        label: "⭐ Testimonial",
        content: `<div class="testimonial" style="
          padding: 30px; 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); 
          border-radius: 12px; 
          border-left: 5px solid #3b82f6;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 20px;
            right: 20px;
            color: #3b82f6;
            font-size: 24px;
            opacity: 0.3;
          ">"</div>
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="
              width: 50px; 
              height: 50px; 
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
              border-radius: 50%; 
              margin-right: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 18px;
            ">JD</div>
            <div>
              <div style="
                font-weight: 600; 
                color: #1e293b;
                font-size: 1.1rem;
                margin-bottom: 4px;
              ">John Doe</div>
              <div style="
                color: #64748b;
                font-size: 0.9rem;
              ">Homeowner</div>
            </div>
          </div>
          <p style="
            font-style: italic; 
            color: #374151; 
            line-height: 1.6;
            margin-bottom: 15px;
            font-size: 1.1rem;
            position: relative;
          ">"Outstanding work! Professional, reliable, and exceeded my expectations. I would definitely hire them again and recommend to others."</p>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="
              display: flex;
              color: #fbbf24;
              font-size: 18px;
            ">★★★★★</div>
            <div style="
              color: #64748b;
              font-size: 0.9rem;
              font-style: italic;
            ">2 weeks ago</div>
          </div>
        </div>`,
        category: "Trade Components",
      });

      // Add Sample Service Pricing Table to trade components
      editor.BlockManager.add("pricing-table", {
        label: "💰 Pricing Table",
        content: `<div style="margin: 30px auto; max-width: 900px; padding: 20px;">
          <h2 style="text-align: center; margin-bottom: 30px; color: #1e293b; font-size: 2.2rem; font-weight: 700;">Service Pricing</h2>
          <table style="
            width: 100%; 
            border-collapse: collapse; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
            background: white;
            border-radius: 12px;
            overflow: hidden;
          ">
            <thead>
              <tr style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white;">
                <th style="padding: 20px 15px; text-align: left; font-weight: 600; font-size: 1.1rem;">Service</th>
                <th style="padding: 20px 15px; text-align: center; font-weight: 600; font-size: 1.1rem;">Duration</th>
                <th style="padding: 20px 15px; text-align: center; font-weight: 600; font-size: 1.1rem;">Price Range</th>
                <th style="padding: 20px 15px; text-align: center; font-weight: 600; font-size: 1.1rem;">Warranty</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e2e8f0; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='white'">
                <td style="padding: 18px 15px; font-weight: 500; color: #1e293b;">Basic Consultation</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">1-2 hours</td>
                <td style="padding: 18px 15px; text-align: center; color: #059669; font-weight: 600; font-size: 1.1rem;">$100-150</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">30 days</td>
              </tr>
              <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='#f8fafc'">
                <td style="padding: 18px 15px; font-weight: 500; color: #1e293b;">Standard Installation</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">Half day</td>
                <td style="padding: 18px 15px; text-align: center; color: #059669; font-weight: 600; font-size: 1.1rem;">$300-500</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">1 year</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='white'">
                <td style="padding: 18px 15px; font-weight: 500; color: #1e293b;">Complete Project</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">3-5 days</td>
                <td style="padding: 18px 15px; text-align: center; color: #059669; font-weight: 600; font-size: 1.1rem;">$1,000+</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">2 years</td>
              </tr>
              <tr style="background-color: #f8fafc; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='#f8fafc'">
                <td style="padding: 18px 15px; font-weight: 500; color: #1e293b;">Emergency Service</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">Same day</td>
                <td style="padding: 18px 15px; text-align: center; color: #dc2626; font-weight: 600; font-size: 1.1rem;">$150-250/hr</td>
                <td style="padding: 18px 15px; text-align: center; color: #64748b;">90 days</td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center; margin-top: 25px; font-size: 14px; color: #64748b; font-style: italic;">
            * Prices may vary based on project complexity and location. Contact us for detailed quotes.
          </p>
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
