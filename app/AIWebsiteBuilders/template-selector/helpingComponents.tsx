import { Box, Button, styled } from "@mui/material";

export const AppHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  // backgroundColor: theme.palette.appleGray.dark,
  backgroundColor: "black",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  position: "relative",
  color: "white",
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  textTransform: "none",
  fontWeight: 500,
  borderRadius: "8px",
  padding: theme.spacing(1, 2),
}));

export const LoadingScreen = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
}));

export const grapesJsStyles = `
  .tutorial-highlight {
    z-index: 3000 !important;
    position: relative !important;
    box-shadow: 0 0 0 4px #3b82f6, 0 0 20px 10px rgba(59, 130, 246, 0.5) !important;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
  }

  .modal {
    display: block;
    position: relative;
    background: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .modal-content {
    display: block;
  }

  /* Professional Editor Theme */
  .gjs-editor {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  /* Main Background */
  .gjs-one-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  }

  .gjs-two-color {
    color: #ffffff !important;
  }

  /* Panel Styling */
  .gjs-pn-panel {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
    margin: 8px !important;
  }

  /* Top Toolbar */
  .gjs-pn-panels .gjs-pn-panel:first-child {
    background: rgba(26, 32, 44, 0.95) !important;
    backdrop-filter: blur(15px) !important;
    border-radius: 16px !important;
    padding: 8px 16px !important;
    margin: 12px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  }

  /* Panel Buttons */
  .gjs-pn-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    border: none !important;
    border-radius: 8px !important;
    color: white !important;
    margin: 2px !important;
    padding: 8px 12px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    font-weight: 500 !important;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3) !important;
  }

  .gjs-pn-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4) !important;
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%) !important;
  }

  .gjs-pn-btn.gjs-pn-active {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5) !important;
  }

  /* Blocks Panel */
  .gjs-blocks-cs {
    background: rgba(255, 255, 255, 0.98) !important;
    border-radius: 12px !important;
    padding: 16px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08) !important;
  }

  .gjs-block {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
    border: 1px solid rgba(148, 163, 184, 0.3) !important;
    border-radius: 12px !important;
    margin: 8px 0 !important;
    padding: 12px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
  }

  .gjs-block::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .gjs-block:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.2) !important;
    border-color: rgba(102, 126, 234, 0.4) !important;
  }

  .gjs-block:hover::before {
    opacity: 1;
  }

  .gjs-block-label {
    font-weight: 600 !important;
    color: #1e293b !important;
    font-size: 13px !important;
    z-index: 1 !important;
    position: relative !important;
  }

  /* Block Categories */
  .gjs-block-category {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
    color: white !important;
    font-weight: 600 !important;
    padding: 16px 20px !important;
    border-radius: 10px !important;
    margin: 8px 0 16px 0 !important;
    border: none !important;
    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.3) !important;
  }

  .gjs-title {
    color: #1e293b !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    margin-bottom: 12px !important;
  }

  /* Canvas Area */
  .gjs-cv-canvas {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
    border-radius: 12px !important;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.06) !important;
  }

  /* Frames */
  .gjs-frame {
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
  }

  /* Layers Panel */
  .gjs-layer {
    background: rgba(255, 255, 255, 0.9) !important;
    border: 1px solid rgba(148, 163, 184, 0.2) !important;
    border-radius: 8px !important;
    margin: 4px 0 !important;
    padding: 8px 12px !important;
    transition: all 0.2s ease !important;
  }

  .gjs-layer:hover {
    background: rgba(102, 126, 234, 0.08) !important;
    border-color: rgba(102, 126, 234, 0.3) !important;
  }

  .gjs-layer.gjs-hovered {
    background: rgba(102, 126, 234, 0.12) !important;
  }

  .gjs-layer.gjs-selected {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%) !important;
    border-color: #4f46e5 !important;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2) !important;
  }

  /* Traits/Properties Panel */
  .gjs-trt-trait {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(148, 163, 184, 0.2) !important;
    border-radius: 8px !important;
    margin: 8px 0 !important;
    padding: 12px !important;
  }

  .gjs-trt-trait__label {
    color: #374151 !important;
    font-weight: 600 !important;
    font-size: 13px !important;
  }

  .gjs-field input,
  .gjs-field select,
  .gjs-field textarea {
    background: rgba(255, 255, 255, 0.9) !important;
    border: 2px solid rgba(148, 163, 184, 0.3) !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    font-size: 14px !important;
    transition: all 0.2s ease !important;
  }

  .gjs-field input:focus,
  .gjs-field select:focus,
  .gjs-field textarea:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    outline: none !important;
  }

  /* Rich Text Editor */
  .gjs-rte-toolbar {
    background: rgba(26, 32, 44, 0.95) !important;
    backdrop-filter: blur(15px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
    padding: 8px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
    z-index: 10000 !important;
  }

  .gjs-rte-action {
    background: transparent !important;
    border: none !important;
    border-radius: 6px !important;
    color: #e2e8f0 !important;
    padding: 6px 8px !important;
    margin: 0 2px !important;
    transition: all 0.2s ease !important;
  }

  .gjs-rte-action:hover {
    background: rgba(102, 126, 234, 0.3) !important;
    color: white !important;
  }

  .gjs-rte-action.gjs-rte-active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
  }

  /* Device Manager */
  .gjs-device {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
    border: 2px solid rgba(148, 163, 184, 0.3) !important;
    border-radius: 8px !important;
    margin: 0 4px !important;
    padding: 6px 12px !important;
    transition: all 0.2s ease !important;
  }

  .gjs-device:hover {
    border-color: #667eea !important;
    background: rgba(102, 126, 234, 0.05) !important;
  }

  .gjs-device.gjs-selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
    border-color: #667eea !important;
  }

  /* Component Selection */
  .gjs-selected {
    outline: 2px solid #667eea !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2) !important;
  }

  .gjs-hovered {
    outline: 2px dashed #94a3b8 !important;
    outline-offset: 1px !important;
  }

  /* Dropzone */
  .gjs-assets-dropzone {
    border: 3px dashed #667eea !important;
    border-radius: 12px !important;
    padding: 24px !important;
    text-align: center !important;
    margin: 16px !important;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%) !important;
    color: #667eea !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
  }

  .gjs-assets-dropzone.active {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%) !important;
    border-color: #4f46e5 !important;
    transform: scale(1.02) !important;
  }

  /* Custom Scrollbars */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.8);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
    border-radius: 6px;
    border: 2px solid rgba(241, 245, 249, 0.8);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  }

  /* Modal Improvements */
  .gjs-mdl-container {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(8px) !important;
  }

  .gjs-mdl-content {
    background: white !important;
    border-radius: 16px !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
    border: none !important;
  }

  /* Asset Manager */
  .gjs-am-file {
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
    transition: all 0.3s ease !important;
  }

  .gjs-am-file:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  }

  /* Style Manager */
  .gjs-sm-sector {
    background: rgba(255, 255, 255, 0.9) !important;
    border: 1px solid rgba(148, 163, 184, 0.2) !important;
    border-radius: 12px !important;
    margin: 8px 0 !important;
    overflow: hidden !important;
  }

  .gjs-sm-title {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
    color: #1e293b !important;
    font-weight: 700 !important;
    padding: 12px 16px !important;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2) !important;
  }

  .gjs-sm-property {
    background: rgba(255, 255, 255, 0.95) !important;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1) !important;
    padding: 8px 16px !important;
  }

  .gjs-sm-property:last-child {
    border-bottom: none !important;
  }

  /* Animation for loading */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .gjs-block,
  .gjs-layer,
  .gjs-trt-trait {
    animation: fadeIn 0.3s ease-out;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .gjs-pn-panel {
      margin: 4px !important;
      border-radius: 8px !important;
    }
    
    .gjs-block {
      margin: 4px 0 !important;
      padding: 8px !important;
    }
  }
`;

export const addTooltips = (components) => {
  components.forEach((comp) => {
    const type = comp.get("type");

    if (type === "image") {
      comp.addAttributes({
        title: "💡 Double-click to upload a new image",
      });
    }

    if (
      type === "text" ||
      type === "textnode" ||
      comp.is("text") ||
      type === "link" ||
      type === "button" ||
      type === "heading"
    ) {
      comp.addAttributes({
        title:
          "🖋️ Select the element and use the right panel to edit typography",
      });
    }

    if (comp.components().length > 0) {
      addTooltips(comp.components());
    }
  });
};

export const waitForElement = (
  selector: string,
  timeout = 5000
): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) {
        clearInterval(interval);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error(`Timeout: Element ${selector} not found`));
      }
    }, 100);
  });
};
