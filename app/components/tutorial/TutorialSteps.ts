// // PortfolioBuilder.tsx
// export const tutorialSteps: TutorialStep[] = [
//   {
//     selector: ".dummy-text",
//     message:
//       "👋 Welcome! Let us guide you through the editor so you can start building your website with ease.",
//   },
//   {
//     selector: ".gs-cmp-button:nth-of-type(1)",
//     message:
//       "Click this button to open the Blocks panel, where you can explore and drag components onto your page to start building your layout.",
//   },
//   {
//     selector: ".gs-cmp-editor-topbar__wrp-center .gs-select-field > button",
//     message: "Select different screen views from this button.",
//   },
//   {
//     selector: "button.gs-cmp-button:has(path[d^='M3 16C3 18.8'])",
//     message: "Use this button to outline all the components on the page.",
//   },
//   {
//     selector: "button.gs-cmp-button:has(path[d^='M12,9A3,3'])",
//     message:
//       "This is the Preview button. Click here to preview your design in a live view.",
//   },
//   {
//     selector:
//       "button.gs-cmp-button:has(path[d^='M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5'])",
//     message:
//       "Click here to toggle Full Screen mode and get a distraction-free view of your workspace.",
//   },
//   {
//     selector:
//       "button.gs-cmp-button:has(path[d^='M12.89,3L14.85,3.4L11.11,21L9.15'])",
//     message: "Click here to view and export your project's HTML/CSS code.",
//   },
//   {
//     selector:
//       "button.gs-cmp-button:has(path[d^='M2 12H4V17H20V12H22V17C22 18.11'])",
//     message: "Click here to import your HTML code into the editor.",
//   },
//   {
//     selector:
//       "button.gs-cmp-button:has(path[d^='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19'])",
//     message: "Click here to clear all the components from your page.",
//   },
//   {
//     selector: "div.gs-cmp-popover > button#headlessui-popover-button-\\:r9\\:",
//     message: "Click here to change the editor theme.",
//   },
//   //   {
//   //     selector: ".gs-block-item:has(div[title='1 Column'])",
//   //     message:
//   //       "Drag this block to insert a single-column layout into your page. Great for adding full-width sections like headers, banners, or paragraphs.",
//   //     triggerBefore: () => {
//   //       (
//   //         document.querySelector(".gs-cmp-button:nth-of-type(1)") as HTMLElement
//   //       )?.click();
//   //     },
//   //   },
// ];

export interface TutorialStep {
  selector: string;
  message: string;
  title?: string;
  triggerBefore?: () => void;
}

export const tutorialSteps: TutorialStep[] = [
  {
    selector: ".dummy-text",
    title: "Welcome to Your Website Builder! 🚀",
    message:
      "We'll guide you through the key features so you can create stunning websites with confidence. This interactive tutorial will show you everything you need to know!",
  },
  {
    selector: ".gs-cmp-button:nth-of-type(1)",
    title: "Explore Building Blocks 🧱",
    message:
      "Click this button to open the Blocks panel. Here you'll find pre-designed components like headers, buttons, and forms that you can drag directly onto your page.",
  },
  {
    selector: ".gs-cmp-editor-topbar__wrp-center .gs-select-field > button",
    title: "Preview Different Devices 📱",
    message:
      "Switch between desktop, tablet, and mobile views to ensure your website looks perfect on all devices. Responsive design made easy!",
  },
  {
    selector: "button.gs-cmp-button:has(path[d^='M3 16C3 18.8'])",
    title: "Component Outline Mode 🎯",
    message:
      "Toggle this to see the outline of all components on your page. Perfect for understanding your layout structure and selecting elements precisely.",
  },
  {
    selector: "button.gs-cmp-button:has(path[d^='M12,9A3,3'])",
    title: "Live Preview Mode 👁️",
    message:
      "Click here to see exactly how your website will look to visitors. Test your buttons, forms, and interactive elements in real-time!",
  },
  {
    selector:
      "button.gs-cmp-button:has(path[d^='M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5'])",
    title: "Distraction-Free Editing 🎨",
    message:
      "Enter full-screen mode to focus entirely on your design. Hide all panels and toolbars for a clean, immersive editing experience.",
  },
  {
    selector:
      "button.gs-cmp-button:has(path[d^='M12.89,3L14.85,3.4L11.11,21L9.15'])",
    title: "Export Your Code 💻",
    message:
      "View and export your website's HTML and CSS code. Perfect for developers who want to further customize or deploy their sites.",
  },
  {
    selector:
      "button.gs-cmp-button:has(path[d^='M2 12H4V17H20V12H22V17C22 18.11'])",
    title: "Import Existing Code 📥",
    message:
      "Have existing HTML code? Import it directly into the editor and continue building from where you left off.",
  },
  {
    selector:
      "button.gs-cmp-button:has(path[d^='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19'])",
    title: "Fresh Start 🗑️",
    message:
      "Clear your canvas completely to start over. Don't worry - we'll always ask for confirmation before removing your work!",
  },
  {
    selector: "div.gs-cmp-popover > button#headlessui-popover-button-\\:r9\\:",
    title: "Customize Your Workspace 🎨",
    message:
      "Choose from different editor themes to match your preference. Dark mode, light mode, or something in between - make it yours!",
  },
];
